import { linter, lintGutter, type Diagnostic } from "@codemirror/lint";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { parse, printParseErrorCode, type ParseError } from "jsonc-parser";
import { useRef, useState } from "react";
import CodeMirror, { EditorState, EditorView } from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { oneDark } from "@codemirror/theme-one-dark";
import DataTable from "./DataTable";

const EditorWithTable = () => {
  const defaultJsonString = `{"key":"value"}`;

  const parsedDefault = JSON.stringify(JSON.parse(defaultJsonString), null, 2);
  const editorRef = useRef<EditorView | null>(null);
  const hasErrorsRef = useRef<boolean>(false);

  const [isPolicyEdited, setIsPolicyEdited] = useState<boolean>(false);

  const multiErrorJsonLinter = () =>
    linter((view) => {
      const doc = view.state.doc.toString();
      const errors: ParseError[] = [];

      // Try to parse with errors collected
      parse(doc, errors, { allowTrailingComma: false });
      hasErrorsRef.current = errors.length > 0;
      checkIfValueChanged(doc);

      const diagnostics: Diagnostic[] = errors.map((err) => {
        console.log(printParseErrorCode(err.error));
        return {
          from: err.offset,
          to: err.offset + (err.length || 1), // highlight at least 1 char
          severity: "error",
          message: printParseErrorCode(err.error),
        };
      });
      console.log("Linting complete");
      return diagnostics;
    });

  const checkIfValueChanged = (currentValue: string) => {
    const original = JSON.parse(parsedDefault);
    const current = JSON.parse(currentValue);
    const stringifiedOriginal = JSON.stringify(original);
    const stringifiedCurrent = JSON.stringify(current);

    console.log(stringifiedOriginal);
    console.log(stringifiedCurrent);

    setIsPolicyEdited(stringifiedOriginal !== stringifiedCurrent);
  };

  const handleCreateEditor = (view: EditorView, state: EditorState) => {
    editorRef.current = view;
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Box height="64px" sx={{ backgroundColor: "palegoldenrod" }}>
        Navbar
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, backgroundColor: "#f2f2f2", minHeight: "calc(100vh - 64px)" }}
      >
        <Stack flexDirection="column" gap={3} sx={{ backgroundColor: "paleturquoise" }}>
          <Stack
            className="breadcrumbs-container"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography>Bread----Crumbs</Typography>
            <Button size="small" color="success" variant="contained" sx={{ textTransform: "none" }}>
              Apply
            </Button>
          </Stack>
          <Box
            className="cardd"
            sx={{ backgroundColor: "palevioletred", padding: "12px 24px", borderRadius: "8px" }}
          >
            <Box className="card-content">
              <Stack
                flexDirection="row"
                sx={{ backgroundColor: "palegreen" }}
                divider={
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ width: "2px", color: "red", backgroundColor: "blue" }}
                  />
                }
              >
                <Stack flexDirection="column" sx={{ width: "50%", paddingRight: "12px" }}>
                  <Box
                    mb={1}
                    sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
                  >
                    <Typography fontWeight={600}>JSON Editor</Typography>
                    <Button
                      size="small"
                      color="warning"
                      variant="contained"
                      sx={{ textTransform: "none" }}
                      disabled={!isPolicyEdited || hasErrorsRef.current}
                    >
                      Review
                    </Button>
                  </Box>
                  <CodeMirror
                    value={parsedDefault}
                    theme={oneDark}
                    extensions={[json(), multiErrorJsonLinter(), lintGutter()]}
                    onCreateEditor={handleCreateEditor}
                    height="calc(100vh - 240px)"
                    style={{
                      overflowY: "hidden",
                      borderRadius: "8px",
                    }}
                  />
                </Stack>
                <Box sx={{ width: "50%", paddingLeft: "12px" }}>
                  <Typography mb={1} fontWeight={600}>
                    History
                  </Typography>
                  <DataTable />
                </Box>
              </Stack>
            </Box>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default EditorWithTable;
