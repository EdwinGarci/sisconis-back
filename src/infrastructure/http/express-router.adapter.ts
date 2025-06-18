import {
    Router as ExpressRouter,
    Request,
    Response,
    NextFunction as ExpressNextFunction,
} from 'express';
import { RouterInterface } from '@shared/interfaces/router.interface';
import { Middleware, RouteHandler, NextFunction } from '@shared/types/http.types';
import { ExpressHttpRequestAdapter } from './express-http-request.adapter';
import { ExpressHttpResponseAdapter } from './express-http-response.adapter';

const adaptNextFunction = (next: ExpressNextFunction): NextFunction => {
    return (error?: unknown) => {
        next(error);
    };
};

function isExpressRouterAdapter(obj: unknown): obj is { getExpressRouter(): ExpressRouter } {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        'getExpressRouter' in obj &&
        typeof (obj as { getExpressRouter(): ExpressRouter }).getExpressRouter === 'function'
    );
}

export class ExpressRouterAdapter implements RouterInterface {
    private readonly router: ExpressRouter;

    constructor() {
        this.router = ExpressRouter();
    }

    get(path: string, handler: RouteHandler): void {
        this.router.get(path, this.adaptHandler(handler));
    }

    post(path: string, handler: RouteHandler): void {
        this.router.post(path, this.adaptHandler(handler));
    }

    put(path: string, handler: RouteHandler): void {
        this.router.put(path, this.adaptHandler(handler));
    }

    patch(path: string, handler: RouteHandler): void {
        this.router.patch(path, this.adaptHandler(handler));
    }

    delete(path: string, handler: RouteHandler): void {
        this.router.delete(path, this.adaptHandler(handler));
    }

    use(param1: Middleware | string, param2?: RouterInterface): void {
        if (typeof param1 === 'string' && isExpressRouterAdapter(param2)) {
            this.router.use(param1, param2.getExpressRouter());
        } else if (typeof param1 === 'function') {
            this.router.use(this.adaptMiddleware(param1));
        } else {
            throw new Error('unsuppported use() signature for ExpressRouterAdapter');
        }
    }

    private adaptHandler(handler: RouteHandler) {
        return (req: Request, res: Response, next: ExpressNextFunction) => {
            const httpRequest = new ExpressHttpRequestAdapter(req);
            const httpResponse = new ExpressHttpResponseAdapter(res);
            const adaptedNext = adaptNextFunction(next);
            handler(httpRequest, httpResponse, adaptedNext);
        };
    }

    private adaptMiddleware(middleware: Middleware) {
        return (req: Request, res: Response, next: ExpressNextFunction) => {
            const httpRequest = new ExpressHttpRequestAdapter(req);
            const httpResponse = new ExpressHttpResponseAdapter(res);
            const adaptedNext = adaptNextFunction(next);
            middleware(httpRequest, httpResponse, adaptedNext);
        };
    }

    getExpressRouter(): ExpressRouter {
        return this.router;
    }
}
