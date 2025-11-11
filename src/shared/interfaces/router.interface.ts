import { Middleware, RouteHandler } from '@shared/types/http.types';

export interface RouterInterface {
    get(path: string, handler: RouteHandler): void;
    post(path: string, handler: RouteHandler): void;
    put(path: string, handler: RouteHandler): void;
    patch(path: string, handler: RouteHandler): void;
    delete(path: string, handler: RouteHandler): void;
    use(middleware: Middleware): void;
    use(path: string, router: RouterInterface): void;
}
