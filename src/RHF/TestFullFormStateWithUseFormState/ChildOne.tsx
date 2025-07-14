import React from "react";
import { useFormContext, useFormState } from "react-hook-form";
import { type AllFormData, type ChildOneFormData } from "./UseFormStateParent";
import RenderCount from "../../RenderCount/RenderCount";

type ChildOnePropsType = React.InputHTMLAttributes<HTMLInputElement>;

const ChildOne = (props: ChildOnePropsType) => {
  const { register } = useFormContext<ChildOneFormData>();
  const { errors } = useFormState<AllFormData>({
    // Using type as AllFormData so we can access {errors.mobileNumber.message}
    name: "name",
  });

  // errors contain all the form errors but just subscribes to the name passed.
  // So if we print errors it will print all the current errors present in the whole form.
  // But when errors change in any other input this component won't re-render as it is not subscribed to them.
  console.log("ChildOne", errors, errors.mobileNumber?.message);

  return (
    <>
      <RenderCount />
      <div className="form-floating mb-3">
        <input
          {...register("name", {
            required: "name is mandatory!",
          })}
          type="string"
          className="form-control"
          {...props}
        />
        <label>Name</label>
        {errors.name && <p className="error-feedback">{errors.name.message}</p>}
      </div>
    </>
  );
};

export default ChildOne;
