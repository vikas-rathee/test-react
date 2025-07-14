import { useState } from "react";
import RenderCount from "../RenderCount/RenderCount";

const ReRenderInputWithUseState = () => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };

  return (
    <>
      <RenderCount />
      <input value={value} onChange={handleChange} />
      {value.length < 5 && <p style={{ color: "red" }}>Length should be more than 5</p>}
    </>
  );
};

export default ReRenderInputWithUseState;
