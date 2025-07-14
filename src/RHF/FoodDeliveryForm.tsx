import RenderCount from "../RenderCount/RenderCount";
import { useForm } from "react-hook-form";

enum FoodDeliveryFormInputNames {
  customerName = "customerName",
  mobile = "mobile",
  orderNumber = "orderNumber",
  emailAddress = "emailAddress",
}

type FoodDeliveryFormType = {
  customerName: string;
  mobile: string;
  orderNumber: number;
  emailAddress: string;
};

type FoodDeliveryFormErrorType = {
  customerError: string;
  mobileError: string;
  orderNumber: string;
  emailAddress: string;
};

const FoodDeliveryForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FoodDeliveryFormType>({
    defaultValues: {
      customerName: "",
      mobile: "",
      orderNumber: new Date().valueOf(),
      emailAddress: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const mobileNumControl = register(FoodDeliveryFormInputNames.mobile, {
    required: "Mobile number is required",
    minLength: {
      value: 10,
      message: "Must be 10 digits.",
    },
    maxLength: {
      value: 10,
      message: "Must be 10 digits.",
    },
  });

  const handleFromSubmit = (formData: FoodDeliveryFormType) => {
    console.log(formData);
  };

  const handleFormErrors = (errors) => {
    console.log(errors);
  };

  return (
    <>
      <RenderCount />
      <form onSubmit={handleSubmit(handleFromSubmit, handleFormErrors)} noValidate>
        <div className="form-floating mb-3">
          <div className="row mb-2">
            <div className="col">
              <input
                {...register(FoodDeliveryFormInputNames.orderNumber)}
                type="number"
                className="form-control"
                placeholder="#Order No."
                disabled
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Mobile number"
                name={mobileNumControl.name}
                onChange={mobileNumControl.onChange}
                onBlur={mobileNumControl.onBlur}
                ref={mobileNumControl.ref}
              />
              {errors.mobile && <div className="error-feedback">{errors.mobile.message}</div>}
            </div>
          </div>
          <div className="row mb-2">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Customer name"
                {...register(FoodDeliveryFormInputNames.customerName, {
                  required: {
                    value: true,
                    message: "Customer name is required!!",
                  },
                  value: "[[[Vikas Rathee]]]",
                })}
              />
              {errors.customerName && (
                <div className="error-feedback">{errors.customerName.message}</div>
              )}
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Email address"
                {...register(FoodDeliveryFormInputNames.emailAddress, {
                  required: true,
                  validate: {
                    isBlacklisted: (value) => {
                      if (value.includes("@xyz.com")) {
                        return "Email is blacklisted";
                      }
                    },
                  },
                })}
              />
              {errors.emailAddress && (
                <div className="error-feedback">{errors.emailAddress.message}</div>
              )}
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default FoodDeliveryForm;
