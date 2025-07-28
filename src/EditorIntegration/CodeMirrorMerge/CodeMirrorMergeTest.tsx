import { json } from "@codemirror/lang-json";
import { Container } from "@mui/material";
import CodeMirrorMerge from "react-codemirror-merge";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

const origValue =
  '{"policyVersion":"1.2.0","sizeLimitation":[{"key":"/ABC/test","minValue":"30000","maxValue":"max","dType":"common","minProvider":"min","maxProvider":"max"}],"restriction":[{"id":"/XYZ/test","minValue":"min","maxValue":"50000","dType":"common","minProvider":"min","maxProvider":"max"}]}';

const modifiedValue =
  '{"policyVersion":"1.3.0","sizeLimitation":[{"key":"/ABC/test","minValue":"30000","maxValue":"max","dType":"common","minProvider":"min","maxProvider":"max"}]}';

const jsonParsedOrigValue = JSON.stringify(JSON.parse(origValue), null, 2);
const jsonParsedModifiedValue = JSON.stringify(JSON.parse(modifiedValue), null, 2);

console.log("Original => ", jsonParsedOrigValue);
console.log("Modified  => ", jsonParsedModifiedValue);

const CodeMirrorMergeTest = () => {
  return (
    <Container sx={{ width: "1200px" }}>
      <CodeMirrorMerge
        style={{ width: "100%" }}
        diffConfig={{ scanLimit: 50000 }}
        theme={vscodeDark}
      >
        <CodeMirrorMerge.Original extensions={[json()]} value={jsonParsedOrigValue} />
        <CodeMirrorMerge.Modified extensions={[json()]} value={jsonParsedModifiedValue} />
      </CodeMirrorMerge>
    </Container>
  );
};

export default CodeMirrorMergeTest;
