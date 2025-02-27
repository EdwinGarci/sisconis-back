// import { PrismaClient, SeverityLevel } from '@prisma/client';
// import winston from 'winston';
// import path from 'path';

// interface LogOptions {
//     message: string;
//     origin?: string;
//     userId?: number;
//     ipAddress?: string;
// }

// export class Logger {
//     private logger: winston.Logger;
//     private prisma: PrismaClient;

//     constructor() {
//         this.prisma = new PrismaClient();
//         const logDir = path.join(__dirname, '../../../logs');
//         this.logger = winston.createLogger({
//             levels: {
//                 error: 0,
//                 warn: 1,
//                 info: 2,
//                 http: 3,
//                 debug: 4,
//             },
//             level: 'debug',
//             format: winston.format.combine(
//                 winston.format.timestamp(),
//                 winston.format.json(),
//             ),
//             transports: [
//                 new winston.transports.Console({
//                     format: winston.format.combine(
//                         winston.format.timestamp(),
//                     ),
//                 }),
//                 new winston.transports.File({ filename: `${logDir}/errors.log`, level: 'error' }),
//                 new winston.transports.File({ filename: `${logDir}/combined.log` }),
//             ]
//         })
//     }
    
//     private async log(level: SeverityLevel, options: LogOptions): Promise<void> {
//         const origin = options.origin || 'unknown' 
//         this.logger.log(level, options.message);
//         try {
//             await this.prisma.logModel.create({
//                 data: { ...options, level, origin },
//             });
//         } catch (error) {
//             if (error instanceof Error) {
//                 this.logger.error('Failed to log to database: ' + error.message);
//             }
//         }
//     }

//     async logInfo(message: string, origin?: string): Promise<void> {
//         await this.log('info', {message, origin});
//     }

//     async logError(message: string): Promise<void> {
//         await this.log('error', {message, origin});
//     }

//     async logWarning(message: string): Promise<void> {
//         await this.log('warn', {message, origin});
//     }

//     async logDebug(message: string): Promise<void> {
//         await this.log('debug', {message, origin});
//     }

//     async logHttp(message: string): Promise<void> {
//         await this.log('http', {message, origin});
//     }

//     async close(): Promise<void> {
//         await this.prisma.$disconnect();
//     }
// }