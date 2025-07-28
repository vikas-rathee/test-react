import { Container } from "@mui/material";
import { Diff, create } from "jsondiffpatch";
import { DiffView } from "jsondiffpatch-react";
import "jsondiffpatch/dist/formatters-styles/annotated.css";
import "jsondiffpatch/dist/formatters-styles/html.css";

// Original and modified JSON strings
const origValue = `{
  "policyVersion": "1.2.0",
  "sizeLimitation": [
    {
      "key": "/ABC/test",
      "minValue": "30000",
      "maxValue": "max",
      "dType": "common",
      "minProvider": "min",
      "maxProvider": "max"
    }
  ],
  "restriction": [
    {
      "id": "/XYZ/test",
      "minValue": "min",
      "maxValue": "50000",
      "dType": "common",
      "minProvider": "min",
      "maxProvider": "max"
    }
  ]
}`;

const modifiedValue = `{
  "policyVersion": "1.3.0",
  "new": "key",
  "sizeLimitation": [
    {
      "key": "/ABC/test",
      "minValue": "30000",
      "maxValue": "max",
      "dType": "common",
      "minProvider": "min",
      "maxProvider": "max"
    }
  ]
}`;

// JSON.parse both
const orig = JSON.parse(origValue);
const modified = JSON.parse(modifiedValue);

// Create diff using jsondiffpatch
const jsondiffpatch = create({
  objectHash: (obj: any) => obj.id || obj.key || JSON.stringify(obj),
  arrays: {
    detectMove: false,
  },
  textDiff: {
    minLength: 60,
  },
});

const delta: Diff<any, any> = jsondiffpatch.diff(orig, modified);

const JsonDiffPatch = () => {
  return (
    <Container sx={{ width: "1200px", overflowX: "auto", mt: 4 }}>
      <DiffView
        delta={delta}
        oldValue={orig}
        newValue={modified}
        annotated={false} // Optional: show explanation tooltips
        showUnchanged={true} // Keeps unchanged fields aligned
      />
    </Container>
  );
};

export default JsonDiffPatch;
