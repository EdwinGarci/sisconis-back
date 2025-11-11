import { HttpResponse } from '@shared/types/http.types';
import { Response, CookieOptions } from 'express';

export class ExpressHttpResponseAdapter implements HttpResponse {
    constructor(private readonly response: Response) {}

    status(code: number): HttpResponse {
        this.response.status(code);
        return this;
    }

    json(data: unknown): void {
        this.response.json(data);
    }

    send(data: string): void {
        this.response.send(data);
    }

    cookie(name: string, value: string, options?: CookieOptions): void {
        this.response.cookie(name, value, options || {});
    }

    redirect(url: string): void {
        this.response.redirect(url);
    }
}
