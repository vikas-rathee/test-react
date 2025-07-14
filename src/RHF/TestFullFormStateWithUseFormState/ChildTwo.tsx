import React from "react";
import { useFormContext, useFormState } from "react-hook-form";
import { type ChildTwoFormData } from "./UseFormStateParent";
import RenderCount from "../../RenderCount/RenderCount";

type ChildTwoPropsType = React.InputHTMLAttributes<HTMLInputElement>;

const ChildTwo = (props: ChildTwoPropsType) => {
  const { register } = useFormContext<ChildTwoFormData>();
  const { errors } = useFormState<ChildTwoFormData>({
    name: "mobileNumber",
  });

  console.log("ChildTwo", errors);

  return (
    <>
      <RenderCount />
      <div className="form-floating mb-3">
        <input
          {...register("mobileNumber", {
            required: "Mobile number is mandatory!",
          })}
          type="string"
          className="form-control"
          {...props}
        />
        <label>Mobile number</label>
        {errors.mobileNumber && <p className="error-feedback">{errors.mobileNumber.message}</p>}
      </div>
    </>
  );
};

export default ChildTwo;
