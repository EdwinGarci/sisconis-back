import winston from 'winston';

export class Logger {
    private logger: winston.Logger;

    constructor() {
        this.logger = winston.createLogger({
            levels: {
                error: 0,
                warn: 1,
                info: 2,
                http: 3,
                debug: 4,
            },
            level: 'debug',
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.timestamp(),
                winston.format.printf(({ timestamp, level, message }) => {
                    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
                })
            ),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: 'errors.log', level: 'error' }),
                new winston.transports.File({ filename: 'combined.log' }),
            ]
        })
    }

    logInfo(message: string): void {
        this.logger.info(message);
    }

    logError(message: string): void {
        this.logger.error(message);
    }

    logWarning(message: string): void {
        this.logger.warn(message);
    }

    logDebug(message: string): void {
        this.logger.debug(message);
    }

    logHttp(message: string): void {
        this.logger.log('http', message);
    }
}