import { Box } from "@mui/material";
import { create } from "jsondiffpatch";
import { Diff, Hunk, parseDiff } from "react-diff-view";
import { createTwoFilesPatch } from "diff";

import "react-diff-view/style/index.css";

const oldJson = {
  policyVersion: "1.2.0",
  sizeLimitation: [
    {
      key: "/ABC/test",
      minValue: "30000",
      maxValue: "max",
      dType: "common",
      minProvider: "min",
      maxProvider: "max",
    },
  ],
  restriction: [
    {
      id: "/XYZ/test",
      minValue: "min",
      maxValue: "50000",
      dType: "common",
      minProvider: "min",
      maxProvider: "max",
    },
  ],
};

const newJson = {
  policyVersion: "1.3.0",
  new: "key",
  sizeLimitation: [
    {
      key: "/ABC/test",
      minValue: "30000",
      maxValue: "max",
      dType: "common",
      minProvider: "min",
      maxProvider: "max",
    },
  ],
};

const jdp = create({
  objectHash: (obj) => obj.key || obj.id || JSON.stringify(obj),
});

const ReactDiffViewTest = () => {
  const oldStr = JSON.stringify(oldJson, null, 2);
  const newStr = JSON.stringify(newJson, null, 2);

  // Use raw line-by-line diff (we generate it from jsondiffpatch output)
  const oldLines = oldStr.split("\n");
  const newLines = newStr.split("\n");

  // Use simple diffing algorithm
  const unifiedDiff = jdp.diff(oldJson, newJson)
    ? createTwoFilesPatch("old.json", "new.json", oldStr, newStr)
    : "";

  const files = parseDiff(unifiedDiff);
  const hunks = files[0]?.hunks || [];

  return (
    <Box sx={{ p: 2, backgroundColor: "#1e1e1e", color: "#d4d4d4", borderRadius: 2 }}>
      <Diff viewType="split" diffType="modify" hunks={hunks}>
        {(hunk) => <Hunk key={`${hunk.oldStart}-${hunk.newStart}`} hunk={hunk} />}
      </Diff>
    </Box>
  );
};

export default ReactDiffViewTest;
