import { useForm } from "react-hook-form";
import RenderCount from "../../RenderCount/RenderCount";

const TestSubscriptionDestructuring = () => {
  const {
    register,
    formState: { isDirty },
  } = useForm();

  console.log("isDirty", isDirty);

  return (
    <>
      <h3>Destructured...</h3>
      <RenderCount />
      <form>
        <input {...register("test")} type="text" />
      </form>
    </>
  );
};

export default TestSubscriptionDestructuring;
