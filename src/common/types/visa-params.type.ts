import { LogLevel } from "../logging";

export type VisaParams = {
  intp: {
    id: string;
    privateKey: string;
  };
  env: "production" | "dev";
  logLevel: LogLevel;
};
