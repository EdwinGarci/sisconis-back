import { ExpressRouterAdapter } from '@infrastructure/http/express-router.adapter';
import { UserController } from '@presentation/user/controller';
import { UserRoutes } from '@presentation/user/routes';
import { RouteHandlerInterface } from '@shared/interfaces/route-handler.interface';
import express, { Application, NextFunction, Request, Response } from 'express';

export class ExpressServer {
    private readonly app: Application;
    private readonly port: number;
    private readonly router: ExpressRouterAdapter;
    private readonly routeHandlers: RouteHandlerInterface[];

    constructor(
        port: number,
        router: ExpressRouterAdapter,
        userController: UserController,
        routeHandlers: RouteHandlerInterface[] = [new UserRoutes(router, userController)],
    ) {
        this.app = express();
        this.port = port;
        this.router = router;
        this.routeHandlers = routeHandlers;

        this.setupMiddleware();
        this.routeHandlers.forEach(handler => handler.configureRoutes());
        this.setupRoutes();
        this.setupErrorHandling();
    }

    private setupMiddleware(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static('public'));

        this.app.use((req: Request, res: Response, next: NextFunction) => {
            console.log(`Time: ${Date.now()} ${req.method} ${req.url}`);
            next();
        });
    }

    private setupRoutes(): void {
        this.app.use('/api', this.router.getExpressRouter());

        this.app.use((req: Request, res: Response) => {
            res.status(404).send('Route not found');
        });
    }

    private setupErrorHandling(): void {
        this.app.use((err: Error, req: Request, res: Response) => {
            console.error(err.stack);
            res.status(500).send('Something broke!');
        });
    }

    public start(): void {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}
