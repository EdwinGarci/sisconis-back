import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource, LogEntity, LogSeverityLevel } from "../../../domain";

const prismaClient = new PrismaClient();

const severityEnum = {
    error: SeverityLevel.error,
    warn: SeverityLevel.warn,
    info: SeverityLevel.info,
    http: SeverityLevel.http,
    debug: SeverityLevel.debug,
}

export class PostgresLogDatasource implements LogDatasource {
    async saveLog(log: LogEntity): Promise<void> {
        const level = severityEnum[log.level];
        const newLog = await prismaClient.logModel.create({
            data:{
                ...log,
                level: level,
            }
        });
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const level = severityEnum[severityLevel];
        const logs = await prismaClient.logModel.findMany({
            where: {
                level
            }
        });
        return logs.map(LogEntity.fromObject);
    }
}