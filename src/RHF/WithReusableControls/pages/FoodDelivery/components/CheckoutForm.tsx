import { useFormContext, useFormState } from "react-hook-form";
import Select from "../../../controls/Select";
import { type CheckoutFormType, type SelectOptionType } from "../../../types";
import RenderCount from "../../../../../RenderCount/RenderCount";

const paymentOptions: SelectOptionType[] = [
  { text: "Select", value: "" },
  { text: "Cash on Delivery", value: "cod" },
  { text: "Paid Online", value: "online" },
];

const deliveryTimeOptions: SelectOptionType[] = [
  { text: "Select", value: 0 },
  { text: "30mins", value: 30 },
  { text: "1hour", value: 60 },
  { text: "2hour", value: 120 },
];

const CheckoutForm = () => {
  const { register } = useFormContext<CheckoutFormType>();

  const { errors } = useFormState<CheckoutFormType>({
    name: ["paymentMethod", "deliveryIn"],
    exact: true,
  });

  return (
    <>
      <RenderCount />
      <div className="text-start fw-bold mt-4 mb-2">Delivery Options</div>
      <div className="row mb-2">
        <div className="col">
          <Select
            {...register("paymentMethod", {
              required: "This field is required",
            })}
            options={paymentOptions}
            label="Payment Method"
            error={errors.paymentMethod}
          />
        </div>
        <div className="col">
          <Select
            {...register("deliveryIn", {
              required: "This field is required",
            })}
            options={deliveryTimeOptions}
            label="Delivery time"
            error={errors.deliveryIn}
          />
        </div>
      </div>
    </>
  );
};

export default CheckoutForm;
