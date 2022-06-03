import { Content } from "../../common/types";

export type TokenPayload = {
  iat: number;
  exp: number;
} & Content;
