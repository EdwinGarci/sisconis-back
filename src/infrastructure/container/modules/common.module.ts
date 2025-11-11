import { ExpressServer } from '@infrastructure/server/express.server';
import { ExpressRouterAdapter } from '@infrastructure/http/express-router.adapter';
import { AwilixContainer, asClass } from 'awilix';

export function registerCommonModule(container: AwilixContainer): void {
    container.register({
        // HTTP Adapters
        expressRouterAdapter: asClass(ExpressRouterAdapter).singleton(),

        // Server
        expressServer: asClass(ExpressServer).singleton(),

        // TODO: Implement Logger Middleware
        // Middlewares
        // loggerMiddleware: asClass(LoggerMiddleware).singleton(),
    });
}
