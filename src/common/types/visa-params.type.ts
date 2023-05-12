import { LogLevel } from "../logging/types";

export type VisaParams = {
  intp: {
    id: string;
    privateKey: string;
  };
  env: "dev" | "stage" | "production";
  logLevel: LogLevel;
};
