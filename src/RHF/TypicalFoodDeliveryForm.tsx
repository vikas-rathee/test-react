import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import RenderCount from "../RenderCount/RenderCount";

type FoodDeliveryFormType = {
  customerName: string;
  mobile: string;
};

type FoodDeliveryFormErrorType = {
  customerError: string;
  mobileError: string;
};

const TypicalFoodDeliveryForm = () => {
  const [values, setValues] = useState<FoodDeliveryFormType>({
    customerName: "",
    mobile: "",
  });

  const [errors, setErrors] = useState<FoodDeliveryFormErrorType>({
    customerError: "",
    mobileError: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues((curr) => {
      return {
        ...curr,
        [e.target.name]: e.target.value,
      };
    });
  };

  const validateFormData = () => {
    const err: FoodDeliveryFormErrorType = {
      customerError: "",
      mobileError: "",
    };

    if (values.customerName === "") {
      err.customerError = "Customer name is required!!";
    }
    if (values.mobile === "") {
      err.mobileError = "Mobile number is required!!";
    }
    setErrors(err);

    // Return true if there is any error
    return Object.values(err).every((e) => e === "");
  };

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateFormData()) {
      console.log(errors);
    } else {
      console.log(values);
    }
  };

  return (
    <>
      <RenderCount />
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            type="text"
            name="customerName"
            className="form-control"
            placeholder="Customer name"
            value={values.customerName}
            onChange={handleInputChange}
          />
          <label>Email address</label>
        </div>
        {errors.customerError && <p style={{ color: "red" }}>{errors.customerError}</p>}
        <div className="form-floating mb-3">
          <input
            type="text"
            name="mobile"
            className="form-control"
            placeholder="Mobile Number"
            value={values.mobile}
            onChange={handleInputChange}
          />
          <label>Email address</label>
        </div>
        {errors.mobileError && <p style={{ color: "red" }}>{errors.mobileError}</p>}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default TypicalFoodDeliveryForm;
