import * as winston from 'winston';
import * as webwinston from 'express-winston';
import { Request, Response } from 'express';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.splat(), winston.format.simple()),
  transports: [new winston.transports.Console()],
});

const weblogger = webwinston.logger({
  level: 'info',
  format: winston.format.combine(winston.format.splat(), winston.format.simple()),
  transports: [new winston.transports.Console()],
  meta: true,
  msg: 'HTTP {{req.method}} {{req.url}}',
  expressFormat: true,
  colorize: true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ignoreRoute(_req: Request, _res: Response) {
    return false;
  },
});

export { logger, weblogger };