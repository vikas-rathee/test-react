import { useRef, useState } from "react";
import { Box, Button } from "@mui/material";
import CodeMirror, { EditorState, EditorView } from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { oneDark } from "@codemirror/theme-one-dark";
import CodeMirrorMerge from "react-codemirror-merge";
import MyDialog from "../CustomDialog/MyDialog";
import { type Diagnostic, linter, lintGutter } from "@codemirror/lint";
import { parse, type ParseError, printParseErrorCode } from "jsonc-parser";

const CodeMirrorWithJsonCParser = () => {
  const defaultJsonString =
    '{"menu":{"id":"file","value":"File","popup":{"menuitem":[{"value":"New","onclick":"CreateNewDoc()"},{"value":"Open","onclick":"OpenDoc()"},{"value":"Close","onclick":"CloseDoc()"}]}}}';

  const parsedDefault = JSON.stringify(JSON.parse(defaultJsonString), null, 2);
  const editorRef = useRef<string>(parsedDefault);
  const hasErrorsRef = useRef<boolean>(false);

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    console.log("errors? : " + hasErrorsRef.current);
    setIsOpen(true);
  };
  const handleOk = () => setIsOpen(false);

  const multiErrorJsonLinter = () =>
    linter((view) => {
      const doc = view.state.doc.toString();
      const errors: ParseError[] = [];

      // Try to parse with errors collected
      parse(doc, errors, { allowTrailingComma: false });
      hasErrorsRef.current = errors.length > 0;

      const diagnostics: Diagnostic[] = errors.map((err) => {
        console.log(err);
        return {
          from: err.offset,
          to: err.offset + (err.length || 1), // highlight at least 1 char
          severity: "error",
          message: printParseErrorCode(err.error),
        };
      });

      return diagnostics;
    });

  return (
    <>
      <CodeMirror
        value={parsedDefault}
        height="70vh"
        width="1200px"
        theme={oneDark}
        extensions={[json(), multiErrorJsonLinter(), lintGutter()]}
        onChange={(value) => {
          editorRef.current = value;
        }}
      />
      <Button variant="contained" color="success" onClick={handleClick}>
        Diff view
      </Button>

      {isOpen && (
        <MyDialog
          open={isOpen}
          title="Diff Viewer"
          okAction={handleOk}
          okText="Close"
          content={
            <Box sx={{ height: "70vh", display: "flex", flexDirection: "column" }}>
              {/* Labels Row */}
              <Box
                sx={{
                  display: "flex",
                  fontWeight: "bold",
                  mb: 1,
                }}
              >
                <Box sx={{ flex: 1, paddingLeft: "24px" }}>Original</Box>
                <Box sx={{ flex: 1, paddingLeft: "24px" }}>Modified</Box>
              </Box>

              {/* Editors Row */}
              <Box sx={{ flex: 1, minHeight: 0 }}>
                <CodeMirrorMerge theme={oneDark} style={{ height: "100%" }}>
                  <CodeMirrorMerge.Original
                    value={parsedDefault}
                    extensions={[
                      json(),
                      EditorView.editable.of(false),
                      EditorState.readOnly.of(true),
                    ]}
                  />
                  <CodeMirrorMerge.Modified
                    value={JSON.stringify(JSON.parse(editorRef.current), null, 2)}
                    extensions={[json()]}
                  />
                </CodeMirrorMerge>
              </Box>
            </Box>
          }
        />
      )}
    </>
  );
};

export default CodeMirrorWithJsonCParser;
