import express, { Router, Application } from 'express';
import path from 'path';
import { Logger } from '../config';

interface ExpressServerOptions {
    routes: Router;
    port: number;
    publicPath?: string;
}

export class ExpressServer {
    private readonly app: Application;
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;
    private readonly logger: Logger;
    private serverListener?: any;

    constructor(options: ExpressServerOptions) {
        this.app = express();
        const { routes, port, publicPath = 'public' } = options;

        this.port = port;
        this.routes = routes;
        this.publicPath = publicPath;

        this.logger = new Logger();

        this.setupMiddlewares();
        this.setupRoutes();
    }
    
    private setupMiddlewares(): void {
        this.app.use(express.json()); // raw
        this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded
        this.app.use(express.static(this.publicPath)); // Carpeta pública
    }

    private setupRoutes(): void {
        this.app.use(this.routes);

        // Manejo para SPA: redirige rutas no API a `index.html`.
        this.app.get(/^\/(?!api).*/, (req, res) => {
            const indexPath = path.join(this.publicPath, 'index.html');
            res.sendFile(indexPath);
        });
    }

    public async start(): Promise<void> {
        this.serverListener = this.app.listen(this.port, () => {
            this.logger.logInfo(`Server running on port ${this.port}`, 'express-server.ts');
        });
    }

    public close(): void {
        this.logger.logInfo('Server shutting down...', 'express-server.ts');
        this.serverListener?.close();
    }
}