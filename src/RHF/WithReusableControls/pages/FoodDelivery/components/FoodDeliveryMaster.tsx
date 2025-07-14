import { useEffect } from "react";
import RenderCount from "../../../../../RenderCount/RenderCount";
import TextField from "../../../controls/TextField";
import type { FoodDeliveryFormMasterType } from "../../../types";
import { useFormContext, useFormState } from "react-hook-form";

const FoodDeliveryMaster = () => {
  const { register } = useFormContext<FoodDeliveryFormMasterType>();

  // Isolate re-rendering to only child
  const { errors } = useFormState<FoodDeliveryFormMasterType>({
    name: ["customerName", "mobile", "orderNumber", "emailAddress"],
    exact: true,
  });

  useEffect(() => {
    console.log("🚨 FoodDeliveryMaster re-rendered", errors);
  }, [errors]);

  return (
    <>
      <RenderCount />
      <div className="row mb-2">
        <div className="col">
          <TextField
            {...register("orderNumber")}
            type="number"
            placeholder="#Order No."
            disabled
            error={errors.orderNumber}
          />
        </div>
        <div className="col">
          <TextField
            {...register("mobile", {
              required: "Mobile number is required",
              // minLength: {
              //   value: 10,
              //   message: "Must be 10 digits.",
              // },
              // maxLength: {
              //   value: 10,
              //   message: "Must be 10 digits.",
              // },
              // validate: {
              //   simulateDelay: async (value): Promise<string | boolean> => {
              //     await new Promise((res) => setTimeout(res, 5000)); // 1 second delay
              //     return value !== "00" || "Invalid phone number";
              //   },
              // },
            })}
            placeholder="Mobile Number"
            error={errors.mobile}
          />
        </div>
      </div>
      <div className="row mb-2">
        <div className="col">
          <TextField
            {...register("customerName")}
            type="string"
            placeholder="Customer name"
            error={errors.orderNumber}
          />
        </div>
        <div className="col">
          <TextField
            {...register("emailAddress")}
            type="string"
            placeholder="Email Address"
            error={errors.emailAddress}
          />
        </div>
      </div>
    </>
  );
};

export default FoodDeliveryMaster;
