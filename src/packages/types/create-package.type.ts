import { Currency } from "./currenty.type";

export type CreatePackage = {
  name: string;
  touchpoints: number;
  price: number;
  currency: Currency;
};
