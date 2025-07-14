import { useEffect, useRef, useState } from "react";
import Editor, { DiffEditor, type OnMount, loader, type Monaco } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { Box, Button } from "@mui/material";
import MyDialog from "../CustomDialog/MyDialog";

// https://github.com/react-monaco-editor/react-monaco-editor/issues/1010 -> InstantiationError
// https://github.com/microsoft/monaco-editor/issues/4612
const MonacoEditorTest = () => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<Monaco | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    loader.config({ monaco });
  }, []);

  const defaultJsonString =
    '{"menu":{"id":"file","value":"File","popup":{"menuitem":[{"value":"New","onclick":"CreateNewDoc()"},{"value":"Open","onclick":"OpenDoc()"},{"value":"Close","onclick":"CloseDoc()"}]}}}';

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleEditorMount: OnMount = (
    editor: monaco.editor.IStandaloneCodeEditor,
    monacoInstance: Monaco
  ) => {
    editorRef.current = editor;
    monacoRef.current = monacoInstance;
  };

  const handleOk = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Editor
        height="70vh"
        width="70%"
        language="json"
        theme="vs-dark"
        onMount={handleEditorMount}
        defaultValue={JSON.stringify(JSON.parse(defaultJsonString), null, 2)}
      />
      <Button variant="contained" color="success" onClick={handleClick}>
        Diff view
      </Button>
      <MyDialog
        open={isOpen}
        title="Diff Viewer"
        okAction={handleOk}
        okText="Close"
        content={
          <Box sx={{ height: "70vh" }}>
            <DiffEditor
              theme="vs-dark"
              original={JSON.stringify(JSON.parse(defaultJsonString), null, 2)}
              modified={editorRef?.current?.getValue() || ""}
              options={{ readOnly: true }}
              keepCurrentModifiedModel={true}
              keepCurrentOriginalModel={true}
            />
          </Box>
        }
      />
    </>
  );
};

export default MonacoEditorTest;
