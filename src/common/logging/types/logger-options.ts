import { LogLevel } from "./log-levels";

export type LoggerOptions = { env: "dev" | "stage"; level: LogLevel };
