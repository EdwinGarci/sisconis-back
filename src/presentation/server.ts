import { SaveLogUseCase } from '../application';
import { envs, ExpressServer } from '../infrastructure';
import { AppRoutes } from './routes';

interface Dependencies {
    saveLogUseCase: SaveLogUseCase;
}

export class Server {
    private readonly transportServer: ExpressServer;

    constructor(
        private readonly dependencies: Dependencies,
    ) {
        this.transportServer = new ExpressServer({
            port: envs.PORT,
            routes: AppRoutes.routes,
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
