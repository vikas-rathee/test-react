import { describe, expect } from "vitest";
import { act, render, screen } from "@testing-library/react";
import EditorWithTable from "../EditorWithTable";

import fs from "node:fs";
import { findAllByRole, prettyDOM, waitFor, within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

export function dump(element) {
  fs.mkdirSync("dump", { recursive: true });
  fs.writeFileSync(
    `dump/${Date.now()}.html`,
    prettyDOM(element, 1000000, { highlight: false }) || ""
  );
}

// https://github.com/jsdom/jsdom/issues/3002
Range.prototype.getBoundingClientRect = vi.fn();
Range.prototype.getClientRects = () => ({
  item: vi.fn(),
  length: 0,
  [Symbol.iterator]: vi.fn(),
});

describe("EditorWithTable", () => {
  it("renders EditorWithTable component", async () => {
    await act(async () => {
      render(<EditorWithTable />);
    });

    const jsonEditorTitle = screen.getByText("JSON Editor");
    dump(document.body);

    expect(jsonEditorTitle).toBeInTheDocument();
  });

  it("renders History table with 5 rows", async () => {
    const user = userEvent.setup();
    render(<EditorWithTable />);
    const table = await screen.findByRole("table");
    const tableRows = within(table).getAllByRole("row");
    dump(document.body);
    expect(tableRows).toHaveLength(6); // header + body rows
  });

  it("updates CodeMirror content", async () => {
    const user = userEvent.setup();
    render(<EditorWithTable />);

    const reviewButton = screen.getByText("Review");
    expect(reviewButton).toBeDisabled();
    // Find CodeMirror's contenteditable div (acts as a textbox)
    const editor = screen.getByRole("textbox");

    await user.click(editor);
    // Select all (Ctrl/Meta + A) and delete
    await user.keyboard("{Control>}[KeyA]{/Control}");
    await user.keyboard("{Backspace}");

    // Type new JSON content
    await user.keyboard("{{");
    await user.keyboard('"key"');
    await user.keyboard(":");
    await user.keyboard('"value"');
    // await user.keyboard("}}");

    // Assert the editor shows new content
    expect(editor.textContent).toContain('"key":"value"');
    await waitFor(
      () => {
        expect(reviewButton).toBeEnabled();
      },
      { timeout: 1500 }
    ); // Slightly higher due to debounce
  });
});
