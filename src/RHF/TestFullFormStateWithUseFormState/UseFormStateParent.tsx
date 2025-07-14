import { FormProvider, useForm } from "react-hook-form";
import ChildOne from "./ChildOne";
import ChildTwo from "./ChildTwo";
import RenderCount from "../../RenderCount/RenderCount";

export type ChildOneFormData = {
  name: string;
};

export type ChildTwoFormData = {
  mobileNumber: string;
};

export type AllFormData = {
  age: number;
} & ChildOneFormData &
  ChildTwoFormData;

const UseFormStateParent = () => {
  const methods = useForm<AllFormData>({
    mode: "onChange",
  });
  const { handleSubmit } = methods;

  const submitData = (data: AllFormData) => {
    console.log(data);
  };

  return (
    <>
      <RenderCount text="Parent Render count" />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(submitData)}>
          <ChildOne />
          <ChildTwo />
        </form>
      </FormProvider>
    </>
  );
};

export default UseFormStateParent;
