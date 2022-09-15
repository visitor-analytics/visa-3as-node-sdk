import pino, { Logger as PinoLogger } from "pino";
import { LogLevel } from "./log-levels";
import { pinoPretty } from "./pino-pretty";
import { LoggerOptions } from "./types";

export class Logger {
  #pino: PinoLogger;
  #level: LogLevel;

  constructor(options: LoggerOptions) {
    this.#pino = options.env === "dev" ? pinoPretty : pino();
    this.#level = options.level;
  }

  logInfo(msg: string | object): void {
    this.#level >= LogLevel.INFO && this.#pino.info(msg);
  }

  logWarn(msg: string | object): void {
    this.#level >= LogLevel.WARN && this.#pino.warn(msg);
  }

  logError(msg: string | object): void {
    this.#level >= LogLevel.ERROR && this.#pino.error(msg);
  }

  logDebug(msg: string | object): void {
    this.#level == LogLevel.DEBUG && this.#pino.debug(msg);
  }
}
