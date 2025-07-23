import { describe } from "vitest";
import { render, screen } from "@testing-library/react";
import CodeMirrorWithJsonCParser from "../CodeMirrorWithJsonCParser";

import fs from "node:fs";
import { prettyDOM } from "@testing-library/dom";

export function dump(element) {
  fs.mkdirSync("dump", { recursive: true });
  fs.writeFileSync(
    `dump/${Date.now()}.html`,
    prettyDOM(element, 1000000, { highlight: false }) || ""
  );
}

describe("CodeMirrorWithJsonCParser", () => {
  it("renders CodeMirrorWithJsonCParser component", () => {
    render(<CodeMirrorWithJsonCParser />);

    const diffViewerButton = screen.getByRole("button", { name: /diff view/i });
    dump(document.body);

    expect(diffViewerButton).toBeInTheDocument();
  });
});
