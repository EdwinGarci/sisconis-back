import { Request, Response, NextFunction } from 'express';

export class AuthMiddleware {
    authenticate(req: Request, res: Response, next: NextFunction): void {
        // TODO: Implement authentication logic
        // For now, just pass through
        next();
    }
}
