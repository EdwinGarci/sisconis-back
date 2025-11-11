export interface HttpRequest {
    params: Record<string, string>;
    query: Record<string, string | string[] | undefined>;
    body: unknown;
    headers: Record<string, string | string[] | undefined>;
    method: string;
    url: string;
    // user?: unknown;
}

export interface HttpResponse {
    status(code: number): HttpResponse;
    json(data: unknown): void;
    send(data: string): void;
    cookie(name: string, value: string, options?: CookieOptions): void;
    redirect(url: string): void;
}

export interface CookieOptions {
    maxAge?: number;
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: boolean | 'lax' | 'strict' | 'none';
    path?: string;
    domain?: string;
}

export interface NextFunction {
    (error?: unknown): void;
}

export type RouteHandler = (
    req: HttpRequest,
    res: HttpResponse,
    next: NextFunction,
) => void | Promise<void>;

export type Middleware = (
    req: HttpRequest,
    res: HttpResponse,
    next: NextFunction,
) => void | Promise<void>;
