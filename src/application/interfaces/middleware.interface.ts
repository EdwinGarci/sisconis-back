export interface IMiddleware {
    handle(req: any): Promise<{ user: any }>;
}