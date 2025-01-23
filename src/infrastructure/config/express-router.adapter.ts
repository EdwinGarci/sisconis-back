import { Router, Request, Response } from "express";
import { IRouter } from "../../application";

export class ExpressRouterAdapter implements IRouter {
    private readonly expressRouter: Router;

    constructor() {
        this.expressRouter = Router();
    }

    public get(path: string, handler: (req: Request, res: Response) => void): void {
        this.expressRouter.get(path, handler);
    }

    public post(path: string, handler: (req: Request, res: Response) => void): void {
        this.expressRouter.post(path, handler);
    }

    public put(path: string, handler: (req: Request, res: Response) => void): void {
        this.expressRouter.put(path, handler);
    }

    public delete(path: string, handler: (req: Request, res: Response) => void): void {
        this.expressRouter.delete(path, handler);
    }

    public use(path: string, router: IRouter): void {
        this.expressRouter.use(path, (router as ExpressRouterAdapter).getExpressRouter());
    }

    public getExpressRouter(): Router {
        return this.expressRouter;
    }
}
