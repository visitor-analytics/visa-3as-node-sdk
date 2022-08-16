import { LogLevel } from "../logging";

export type VisaParams = {
  partner: {
    id: string;
    domain: string;
    privateKey: string;
  };
  environment: "production" | "test";
  logLevel: LogLevel;
};
