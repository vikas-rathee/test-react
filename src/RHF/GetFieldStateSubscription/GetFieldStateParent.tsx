import { useForm } from "react-hook-form";
import GetFieldStateChild from "./GetFieldStateChild";
import RenderCount from "../../RenderCount/RenderCount";

export type AddressFormType = {
  streetAddress: string;
  landmark: string;
  city: string;
  state: string;
};

export type AddressParentFormType = {
  address: AddressFormType;
};

const GetFieldStateParent = () => {
  const {
    register,
    control,
    getFieldState,
    formState: { errors },
  } = useForm<AddressParentFormType>({
    mode: "onChange",
    defaultValues: {
      address: {
        streetAddress: "",
        landmark: "",
        city: "",
        state: "",
      },
    },
  });
  return (
    <>
      <RenderCount />
      <form>
        <GetFieldStateChild register={register} control={control} />
      </form>
    </>
  );
};

export default GetFieldStateParent;
