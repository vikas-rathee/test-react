import { useRef, useState } from "react";
import { Box, Button } from "@mui/material";
import CodeMirror, { EditorState, EditorView } from "@uiw/react-codemirror";
import { json, jsonParseLinter } from "@codemirror/lang-json";
import { oneDark } from "@codemirror/theme-one-dark";
import CodeMirrorMerge from "react-codemirror-merge";
import MyDialog from "../CustomDialog/MyDialog";
import { linter } from "@codemirror/lint";

const CodeMirrorWithLinter = () => {
  const defaultJsonString =
    '{"menu":{"id":"file","value":"File","popup":{"menuitem":[{"value":"New","onclick":"CreateNewDoc()"},{"value":"Open","onclick":"OpenDoc()"},{"value":"Close","onclick":"CloseDoc()"}]}}}';

  const parsedDefault = JSON.stringify(JSON.parse(defaultJsonString), null, 2);
  const editorRef = useRef<string>(parsedDefault);

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen(true);
  const handleOk = () => setIsOpen(false);

  const enhancedJsonLinter = () =>
    linter((view) => {
      const diagnostics = jsonParseLinter()(view);

      return diagnostics.map((d) => {
        // Ensure squiggly underline (at least 1 character range)
        if (d.from === d.to) {
          return {
            ...d,
            to: d.from + 1, // extend range by 1 char
          };
        }
        return d;
      });
    });

  return (
    <>
      <CodeMirror
        value={parsedDefault}
        height="70vh"
        width="1200px"
        theme={oneDark}
        extensions={[json(), enhancedJsonLinter()]}
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
            <Box sx={{ height: "70vh" }}>
              <CodeMirrorMerge orientation="a-b">
                <CodeMirrorMerge.Original value={parsedDefault} />
                <CodeMirrorMerge.Modified
                  value={JSON.stringify(JSON.parse(editorRef.current), null, 2)}
                  extensions={[EditorView.editable.of(false), EditorState.readOnly.of(true)]}
                />
              </CodeMirrorMerge>
            </Box>
          }
        />
      )}
    </>
  );
};

export default CodeMirrorWithLinter;
