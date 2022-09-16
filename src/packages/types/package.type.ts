import { Currency } from "./currenty.type";

export type Package = {
  id: string;
  name: string;
  price: number;
  currency: Currency;
  intpId: string;
  touchpoints: number;
  createdAt: string;
};
