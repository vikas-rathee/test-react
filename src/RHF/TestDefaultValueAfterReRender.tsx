import { useForm } from "react-hook-form";
import RenderCount from "../RenderCount/RenderCount";
import { useState } from "react";

type FormDataType = {
  name: string;
};

const TestDefaultValueAfterReRender = () => {
  const { register } = useForm<FormDataType>();
  const [count, setCount] = useState<number>(0);

  return (
    <>
      <RenderCount />
      <form>
        <div className="form-floating mb-3">
          <input
            {...register("name", {
              required: true,
              value: "Vikas Rathee", // Default value
            })}
            type="text"
            className="form-control"
            placeholder="Enter name"
          />
          <label>Name</label>
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
      {/* To re-render the component */}
      <div className="mt-3">
        <button className="btn btn-success" onClick={() => setCount(count + 1)}>
          Count++
        </button>
        {count}
      </div>
    </>
  );
};

export default TestDefaultValueAfterReRender;
