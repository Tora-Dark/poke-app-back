import { createLogger, transports, format } from "winston";
import { WinstonTransport as AxiomTransport } from "@axiomhq/winston";
import util from "util";

const { combine, timestamp, printf, colorize, align, errors } = format;

const axiomTransport = new AxiomTransport({
  dataset: "my-dataset",
  token: "my-token",
});

const logger = createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: combine(
    errors({ stack: true }),
    colorize({ all: true }),
    timestamp({
      format: "YYYY-MM-DD hh:mm:ss.SSS A",
    }),
    align(),
    printf((info) => {
      const { timestamp, level, message, ...meta } = info;
      // Filtrar propiedades internas
      const filteredMeta = Object.keys(meta).reduce(
        (acc: Record<string, unknown>, key) => {
          if (typeof key !== "symbol") {
            acc[key] = meta[key];
          }
          return acc;
        },
        {} as Record<string, unknown>
      );
      const metaString = Object.keys(filteredMeta).length
        ? `\n${util.inspect(filteredMeta, { depth: null, colors: true })}`
        : "";
      return `[${timestamp}] ${level}: ${message}${metaString}`;
    })
  ),
  transports: [new transports.Console()],
  exceptionHandlers: [new transports.Console()],
  rejectionHandlers: [new transports.Console()],
});

export { logger };

//* Log levels
// log_levels = {
//   error: 0,
//   warn: 1,
//   info: 2,
//   http: 3,
//   verbose: 4,
//   debug: 5,
//   silly: 6
// }

//* Add metadata through the child method

// const childLogger = logger.child({ requestId: 'f9ed4675f1c53513c61a3b3b4e25b4c0' });

// childLogger.info('File uploaded successfully', {
//   file: 'something.png',
//   type: 'image/png',
//   userId: 'jdn33d8h2',
// });

//* Reference for the logger
// https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-winston-and-morgan-to-log-node-js-applications/
