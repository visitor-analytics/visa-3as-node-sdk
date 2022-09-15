import { LogLevel } from "../log-levels";

export type LoggerOptions = { env: "dev" | "production"; level: LogLevel };
