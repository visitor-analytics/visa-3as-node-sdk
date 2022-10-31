import { Currency } from "./currency.type";
import { Period } from "./period.type";

export type Package = {
  id: string;
  name: string;
  price: number;
  currency: Currency;
  period: Period;
  intpId: string;
  touchpoints: number;
  createdAt: string;
};
