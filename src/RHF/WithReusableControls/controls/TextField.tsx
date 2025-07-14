import type { FieldError } from "react-hook-form";

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  placeholder: string;
  error?: FieldError | undefined;
};

const TextField = (props: TextFieldProps) => {
  const { type = "text", className = "", placeholder, error, ...restProps } = props;
  return (
    <div className="form-floating">
      <input
        type={type}
        className={`form-control ${className}`}
        placeholder={placeholder}
        {...restProps}
      />
      <label>{placeholder}</label>
      {error && <div className="error-feedback">{error.message}</div>}
    </div>
  );
};

export default TextField;
