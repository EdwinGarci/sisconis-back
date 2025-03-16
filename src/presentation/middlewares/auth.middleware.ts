import { Request, Response, NextFunction } from 'express'; 
import { container } from '../../infrastructure';

const authMiddleware = container.resolve('authMiddleware');

export const expressAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user } = await authMiddleware.handle(req);
        req.body.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: `${error}` });
    }
};