import { useFormState } from "react-hook-form";
import RenderCount from "../../../RenderCount/RenderCount";

type SubmitButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonText: string;
};

const SubmitButton = (props: SubmitButtonProps) => {
  // const { control } = useFormContext(); // Optional ✅
  const { isSubmitting } = useFormState();

  const { buttonText, ...restProps } = props;

  console.log("isSubmitting", isSubmitting);

  return (
    <>
      <RenderCount />
      <button type="submit" className="btn btn-primary" disabled={isSubmitting} {...restProps}>
        {buttonText}
      </button>
    </>
  );
};

export default SubmitButton;
