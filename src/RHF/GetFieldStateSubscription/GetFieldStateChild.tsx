import { useFormState } from "react-hook-form";
import RenderCount from "../../RenderCount/RenderCount";
import TextField from "../WithReusableControls/controls/TextField";
import type { AddressFormType } from "./GetFieldStateParent";

const GetFieldStateChild = ({ register, control, ...restProps }) => {
  const { errors } = useFormState<{ address: AddressFormType }>({
    name: ["address"],
    exact: false, // subscribe to all the nested properties of address object
    control: control, // Since this component is not inside a Provider
  });

  return (
    <>
      <RenderCount />
      <div className="text-start fw-bold mt-4 mb-2">Address</div>
      <div className="row mb-3">
        <div className="col">
          <TextField
            {...register("address.streetAddress", {
              required: "Street Address is needed.",
            })}
            placeholder="Street address"
            error={errors.address?.streetAddress}
          />
        </div>
        <div className="col">
          <TextField
            {...register("address.city", {
              required: "City is needed.",
            })}
            placeholder="City"
            error={errors.address?.city}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <TextField
            {...register("address.landmark")}
            placeholder="Landmark"
            error={errors.address?.landmark}
          />
        </div>
        <div className="col">
          <TextField
            {...register("address.state")}
            placeholder="State"
            error={errors.address?.state}
          />
        </div>
      </div>
    </>
  );
};

export default GetFieldStateChild;
