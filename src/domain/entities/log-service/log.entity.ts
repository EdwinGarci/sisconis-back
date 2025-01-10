
export enum LogSeverityLevel {
    error = 'error',
    warn = 'warn',
    info = 'info',
    http = 'http',
    debug = 'debug',
}

export interface LogEntityOptions {
    level: LogSeverityLevel;
    message: string;
    createdAt?: Date;
    origin: string;
}

export class LogEntity {
    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor(options: LogEntityOptions) {
        const {level, message, createdAt = new Date(), origin } = options
        this.message = message;
        this.level = level;
        this.createdAt = createdAt;
        this.origin = origin;
    }

    static fromJson = (json: string):LogEntity => {
        json = (json === '') ?  '{}' : json;
        const {message, level, createdAt, origin} = JSON.parse(json);

        const log = new LogEntity({
            message, 
            level,
            createdAt: new Date(createdAt),
            origin,
        });
        log.createdAt = new Date(createdAt);
        return log;
    }

    static fromObject = (object: {[key: string]: any}): LogEntity => {
        const {message, level, createdAt, origin} = object;
        const log = new LogEntity({
            message, level, createdAt, origin
        });
        return log;
    }

}