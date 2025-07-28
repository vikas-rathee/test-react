import { Container } from "@mui/material";
import { Differ, Viewer } from "json-diff-kit";
import "json-diff-kit/dist/viewer.css";

import { styled } from "@mui/material/styles";

const StyledViewer = styled(Viewer)(({ theme }) => ({
  "&.json-diff-viewer.json-diff-viewer-theme-monokai": {
    background: "#1e1e1e",
    color: "#f8f8f2",

    ".line-number": {
      color: "#999",
    },

    // "tr:hover": {
    //   background: "#3e3d32",
    // },

    ".line-add, .line-modify": {
      background: "#12261D",
    },

    ".line-add.line-number, .line-modify.line-number": {
      background: "#1C4328",
      color: "white",
    },

    ".line-remove": {
      background: "#24171B",
    },

    ".line-remove.line-number": {
      background: "#542326",
      color: "white",
    },

    "tr.expand-line button": {
      color: "#f8f8f2",
    },

    ".string": {
      color: "#ce9178",
    },

    // ".number, .boolean, .null": {
    //   color: "#ae81ff",
    // },

    ".key": {
      color: "#9cdcfe",
    },

    // ".invalid": {
    //   background: "#960050",
    //   color: "#fff",
    // },
  },
}));

const origValue =
  '{"policyVersion":"1.2.0","sizeLimitation":[{"key":"/ABC/test","minValue":"30000","maxValue":"max","dType":"common","minProvider":"min","maxProvider":"max"}],"restriction":[{"id":"/XYZ/test","minValue":"min","maxValue":"50000","dType":"common","minProvider":"min","maxProvider":"max"}]}';

const modifiedValue =
  '{"policyVersion":"1.3.0","new": "key","sizeLimitation":[{"key":"/ABC/test","minValue":"30000","maxValue":"max","dType":"common","minProvider":"min","maxProvider":"max"}]}';

const jsonParsedOrigValue = JSON.parse(origValue);
const jsonParsedModifiedValue = JSON.parse(modifiedValue);

const differ = new Differ({
  showModifications: true,
  arrayDiffMethod: "lcs",
  // preserveKeyOrder: "before",
  recursiveEqual: true,
});

const diff = differ.diff(jsonParsedOrigValue, jsonParsedModifiedValue);

const JsonDiffKit = () => {
  return (
    <Container sx={{ width: "1200px", overflowX: "auto" }}>
      <StyledViewer
        diff={diff}
        indent={2}
        lineNumbers
        highlightInlineDiff
        inlineDiffOptions={{ mode: "word", wordSeparator: " " }}
        syntaxHighlight={{
          theme: "monokai",
        }}
        hideUnchangedLines={true}
      />
    </Container>
  );
};

export default JsonDiffKit;
