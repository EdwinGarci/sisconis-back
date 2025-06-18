import { HttpRequest } from '@shared/types/http.types';
import { Request } from 'express';

export class ExpressHttpRequestAdapter implements HttpRequest {
    constructor(private readonly request: Request) {}

    get params(): Record<string, string> {
        return this.request.params;
    }

    get query(): Record<string, string> {
        const query: Record<string, string> = {};
        for (const key in this.request.query) {
            const value = this.request.query[key];
            if (typeof value === 'string') {
                query[key] = value;
            } else if (Array.isArray(value) && typeof value[0] === 'string') {
                query[key] = value[0];
            }
        }
        return query;
    }

    get body(): unknown {
        return this.request.body;
    }

    get headers(): Record<string, string> {
        const headers: Record<string, string> = {};
        for (const key in this.request.headers) {
            const value = this.request.headers[key];
            if (typeof value === 'string') {
                headers[key] = value;
            } else if (Array.isArray(value) && typeof value[0] === 'string') {
                headers[key] = value[0];
            }
        }
        return headers;
    }

    get method(): string {
        return this.request.method;
    }

    get url(): string {
        return this.request.url;
    }
}
