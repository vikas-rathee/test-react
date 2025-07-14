import { useRef } from "react";
import RenderCount from "../RenderCount/RenderCount";

const ReRenderInputWithUseRef = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <RenderCount />
      <input ref={inputRef} />
      {inputRef.current && inputRef.current.value && inputRef.current.value.length < 5 && (
        <p style={{ color: "red" }}>Length should be more than 5</p>
      )}
    </>
  );
};

export default ReRenderInputWithUseRef;
