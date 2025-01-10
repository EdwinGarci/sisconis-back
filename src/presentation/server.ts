import { envs, ExpressServer } from '../infrastructure';
import { AppRoutes } from './routes';


export class Server {
    private readonly transportServer: ExpressServer;

    constructor() {
        this.transportServer = new ExpressServer({
            port: envs.PORT,
            routes: AppRoutes.routes,
            publicPath: envs.PUBLIC_PATH,
        });
    }

    async start(): Promise<void> {
        await this.transportServer.start();
    }

    close(): void {
        this.transportServer.close();
    }
}
