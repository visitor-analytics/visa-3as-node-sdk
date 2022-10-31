import { Currency, Period } from ".";

export type CreatePackage = {
  name: string;
  touchpoints: number;
  price: number;
  currency: Currency;
  period: Period;
};
