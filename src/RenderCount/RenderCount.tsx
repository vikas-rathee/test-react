import { useRef } from "react";

const RenderCount = ({ text = "Render Count", ...restProps }) => {
  const renderCount = useRef(0);

  renderCount.current = renderCount.current + 1;

  return (
    <div {...restProps}>
      {text}: {renderCount.current}
    </div>
  );
};

export default RenderCount;
