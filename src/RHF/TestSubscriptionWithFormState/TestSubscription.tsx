import { useForm } from "react-hook-form";
import RenderCount from "../../RenderCount/RenderCount";

const TestSubscription = () => {
  const { register, formState } = useForm();

  // This might cause the component to re-render but it is not guaranteed.
  // Either destructure the formState with useForm() or read the state in the JSX to subscribe properly
  console.log("isDirty", formState.isDirty);

  return (
    <>
      <h3>No Destructuring</h3>
      <RenderCount />
      <form>
        <input {...register("test")} type="text" />
      </form>
    </>
  );
};

export default TestSubscription;
