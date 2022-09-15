import { Currency } from "./currency.enum";

export type CreatePackage = {
  name: string;
  touchpoints: number;
  price: number;
  currency: Currency;
};
