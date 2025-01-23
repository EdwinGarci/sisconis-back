import { SaveLogUseCase } from '../application';
import { envs, ExpressServer, ExpressRouterAdapter } from '../infrastructure';
import { AppRoutes } from './routes';

interface Dependencies {
    saveLogUseCase: SaveLogUseCase;
}

export class Server {
    private readonly transportServer: ExpressServer;

    constructor(
        private readonly dependencies: Dependencies,
    ) {
        const expressRouterAdapter = new ExpressRouterAdapter();
        AppRoutes.configureRoutes(expressRouterAdapter);

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
