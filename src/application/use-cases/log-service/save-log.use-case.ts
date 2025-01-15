import { LogEntity, LogRepository, LogSeverityLevel } from "../../../domain";

interface LogOptions {
    message: string;
    level: LogSeverityLevel
    origin?: string;
}

export class SaveLogUseCase {
    constructor(
        private readonly logRepository: LogRepository
    ) {}

    public async execute(logOptions: LogOptions): Promise<void> {
        try {
            const log = new LogEntity({
                ...logOptions,
                origin: logOptions.origin || 'Unknown'
            })
            await this.logRepository.saveLog(log);
        } catch (error) {
            throw new Error('Failed to save Log');
        }
    }
}