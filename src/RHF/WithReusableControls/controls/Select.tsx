import type { FieldError } from "react-hook-form";
import type { SelectOptionType } from "../types";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: SelectOptionType[];
  label: string;
  error?: FieldError | undefined;
};

const Select = (props: SelectProps) => {
  const { options, className = "", label, error, ...restProps } = props;
  return (
    <div className="form-floating">
      <select className={`form-select ${className}`} {...restProps}>
        {options.map((op, index) => (
          <option key={index} value={op.value} disabled={op.value === "" || op.value === 0}>
            {op.text}
          </option>
        ))}
      </select>
      <label>{label}</label>
      {error && <div className="error-feedback">{error.message}</div>}
    </div>
  );
};

export default Select;
