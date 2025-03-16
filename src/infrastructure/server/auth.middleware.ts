import { IMiddleware } from "../../application";
import { UserRepository } from "../../domain";
import { JwtAdapter } from "../config";
import { CustomError } from "../errors";

export class AuthMiddleware implements IMiddleware {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtAdapter: JwtAdapter,
    ) { }

    async handle(req: any): Promise<{ user: any; }> {
        const authorization = req.header('Authorization');
        if (!authorization) throw CustomError.badRequest('No token provided');
        if (!authorization.startsWith('Bearer')) throw CustomError.badRequest('Invalid Bearer token');

        const token = authorization.split(' ')[1];
        const payload = await this.jwtAdapter.validateToken<{ id: string }>(token);
        if (!payload) throw CustomError.unauthorized('Invalid token');

        const user = await this.userRepository.findById(payload.id);
        if (!user) throw CustomError.unauthorized('Invalid token - user');

        if (user.deletedAt) throw CustomError.unauthorized('User is inactive');

        return { user };
    }
}