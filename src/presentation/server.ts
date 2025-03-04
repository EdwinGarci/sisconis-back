import { envs, ExpressServer, ExpressRouterAdapter, createDependencies } from '../infrastructure';
import { AppRoutes } from './routes';

export class Server {
    private readonly transportServer: ExpressServer;

    constructor() {
        const dependencies = createDependencies();
        const expressRouterAdapter = new ExpressRouterAdapter();
        AppRoutes.configureRoutes(
            expressRouterAdapter,
            dependencies.createUserUseCase,
            dependencies.getUsersUseCase,
            dependencies.loginUseCase
        );

        this.transportServer = new ExpressServer({
            port: envs.PORT,
            routes: expressRouterAdapter,
            publicPath: envs.PUBLIC_PATH,
            saveLogUseCase: dependencies.saveLogUseCase,
        });
    }

    async start(): Promise<void> {
        await this.transportServer.start();
    }

    close(): void {
        this.transportServer.close();
    }
}
