import { Currency } from "./currency.enum";

export type Package = {
  id: string;
  name: string;
  price: number;
  currency: Currency;
  touchpoints: number;
  createdAt: string;
};
