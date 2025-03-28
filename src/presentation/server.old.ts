// import { SaveLogUseCase } from '../application';
// import { createLogDatasource, envs, ExpressServer, LogRepositoryImpl } from '../infrastructure';
// import { AppRoutes } from './routes';

// const logDataSource = createLogDatasource();
// const logRepository = new LogRepositoryImpl(logDataSource);
// const saveLogUseCase = new SaveLogUseCase(logRepository);

// export class Server {
//     private readonly transportServer: ExpressServer;

//     constructor() {
//         this.transportServer = new ExpressServer({
//             port: envs.PORT,
//             routes: AppRoutes.routes,
//             publicPath: envs.PUBLIC_PATH,
//             saveLogUseCase,
//         });
//     }

//     async start(): Promise<void> {
//         await this.transportServer.start();
//     }

//     close(): void {
//         this.transportServer.close();
//     }
// }
