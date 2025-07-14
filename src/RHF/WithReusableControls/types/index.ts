export type SelectOptionType = { value: string; text: string } | { value: number; text: string };

export type CheckoutFormType = {
  paymentMethod: string;
  deliveryIn: number;
};

export type DeliveryAddressFormType = {
  streetAddress: string;
  landmark: string;
  city: string;
  state: string;
};

export type FoodDeliveryFormMasterType = {
  customerName: string;
  mobile: string;
  orderNumber: number;
  emailAddress: string;
};

export type FoodDeliveryFormType = {
  address: DeliveryAddressFormType;
} & CheckoutFormType &
  FoodDeliveryFormMasterType;
