// 1
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { transports as _transports, createLogger, format as _format } from 'winston';// 2
const logDir = 'logs';
const logName = 'demo-winston.log';
const transports = [];// 3
transports.push(new _transports.Console());// 4
if ( !existsSync(logDir) ) {
  mkdirSync(logDir);
}
const logFile = join(logDir, logName);
transports.push(new _transports.File({ filename: logFile }));// 5
const logger = new createLogger({
  level: 'info',
  format: _format.combine(
    _format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
    _format.printf(info => `[${info.timestamp}] [${info.level.toUpperCase()}]: ${info.message}`)
  ),
  transports: transports
});// 6
export default logger;