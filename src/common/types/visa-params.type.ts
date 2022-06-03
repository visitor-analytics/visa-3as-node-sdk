import { LogLevel } from "../logging";

export type VisaParams = {
  company: {
    id: string;
    domain: string;
    privateKey: string;
  };
  environment: "production" | "test";
  logLevel: LogLevel;
};
