
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
    public readonly level: LogSeverityLevel;
    public readonly message: string;
    public readonly createdAt: Date;
    public readonly origin: string;

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

        return new LogEntity({
            message, 
            level,
            createdAt: new Date(createdAt),
            origin,
        });
    }

    static fromObject = (object: {[key: string]: any}): LogEntity => {
        const {message, level, createdAt, origin} = object;
        const log = new LogEntity({
            message, level, createdAt, origin
        });
        return log;
    }

}