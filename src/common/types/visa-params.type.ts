import { LogLevel } from "../logging";

export type VisaParams = {
  intp: {
    id: string;
    domain: string;
    privateKey: string;
  };
  environment: "production" | "dev";
  logLevel: LogLevel;
};
