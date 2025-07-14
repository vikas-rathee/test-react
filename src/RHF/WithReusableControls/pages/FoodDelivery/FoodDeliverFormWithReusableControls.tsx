import RenderCount from "../../../../RenderCount/RenderCount";
import { FormProvider, useForm, type FieldErrors } from "react-hook-form";
import CheckoutForm from "./components/CheckoutForm";
import type { FoodDeliveryFormType } from "../../types";
import DeliveryAddressFrom from "./components/DeliveryAddressForm";
import FoodDeliveryMaster from "./components/FoodDeliveryMaster";
import SubmitButton from "../../controls/SubmitButton";

const FoodDeliverFormWithReusableControls = () => {
  const methods = useForm<FoodDeliveryFormType>({
    defaultValues: {
      customerName: "",
      mobile: "",
      orderNumber: new Date().valueOf(),
      emailAddress: "",
      paymentMethod: "",
      deliveryIn: 0,
      address: {
        streetAddress: "",
        landmark: "",
        city: "",
        state: "",
      },
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const { handleSubmit, getFieldState, formState } = methods;

  const handleFromSubmit = (formData: FoodDeliveryFormType) => {
    console.log(formData);
  };

  const handleFormErrors = (errors: FieldErrors) => {
    console.log(errors);
  };

  return (
    <>
      <RenderCount text="Parent Render Count" />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleFromSubmit, handleFormErrors)} noValidate>
          <FoodDeliveryMaster />
          <CheckoutForm />
          <DeliveryAddressFrom />
          <SubmitButton buttonText="Submit" />
        </form>
      </FormProvider>
    </>
  );
};

export default FoodDeliverFormWithReusableControls;
