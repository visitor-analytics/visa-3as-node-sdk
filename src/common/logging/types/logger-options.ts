import { LogLevel } from "./log-levels";

export type LoggerOptions = {
  env: "dev" | "stage" | "production";
  level: LogLevel;
};
