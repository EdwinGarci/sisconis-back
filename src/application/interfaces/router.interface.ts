export interface IRouter {
    get(path: string, handler: (...args: any[]) => void): void;
    post(path: string, handler: (...args: any[]) => void): void;
    put(path: string, handler: (...args: any[]) => void): void;
    delete(path: string, handler: (...args: any[]) => void): void;
    use(path: string, router: IRouter): void;
}