import express, { Application } from 'express';
import path from 'path';
import { logger } from '../config'
import { IRouter, SaveLogUseCase } from '../../application';
import { LogSeverityLevel } from '../../domain';

interface ExpressServerOptions {
    routes: IRouter;
    port: number;
    publicPath?: string;
    saveLogUseCase: SaveLogUseCase
}

export class ExpressServer {
    private readonly app: Application;
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: IRouter;
    private readonly logger: typeof logger;
    private readonly saveLogUseCase: SaveLogUseCase;
    private serverListener?: any;

    constructor(options: ExpressServerOptions) {
        this.app = express();
        const { routes, port, publicPath = 'public', saveLogUseCase } = options;

        this.port = port;
        this.routes = routes;
        this.publicPath = publicPath;
        this.saveLogUseCase = saveLogUseCase;
        this.logger = logger;

        this.setupMiddlewares();
        this.setupRoutes();
    }
    
    private setupMiddlewares(): void {
        this.app.use(express.json()); // raw
        this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded
        this.app.use(express.static(this.publicPath)); // Carpeta pública
    }

    private setupRoutes(): void {
        const expressRouter = (this.routes as any).getExpressRouter();
        this.app.use(expressRouter);

        // Manejo para SPA: redirige rutas no API a `index.html`.
        this.app.get(/^\/(?!api).*/, (req, res) => {
            const indexPath = path.join(this.publicPath, 'index.html');
            res.sendFile(indexPath);
        });
    }

    public async start(): Promise<void> {
        this.serverListener = this.app.listen(this.port, async() => {
            const logMessage = `Server running on port ${this.port}`;
            this.logger.info(logMessage);
            await this.saveLogUseCase.execute({
                message: logMessage,
                level: LogSeverityLevel.info,
                origin: 'express-server.ts'
            });
        });
    }

    public close(): void {
        const logMessage = 'Server shutting down...';
        this.logger.info(logMessage);
        this.saveLogUseCase.execute({
            message: logMessage,
            level: LogSeverityLevel.info,
            origin: 'express-server.ts'
        })
        this.serverListener?.close();
    }
}