import { CreateUserUseCase } from '@application/user/use-cases/create-user.use-case';
import { GetUsersUseCase } from '@application/user/use-cases/get-users.use-case';
import { ExpressRouterAdapter } from '@infrastructure/http/express-router.adapter';
import { ExpressServer } from '@infrastructure/server/express.server';
import { UserRepositoryImpl } from '@infrastructure/user/repositories/user.repository.impl';
import { UserController } from '@presentation/user/controller';
import { UserRoutes } from '@presentation/user/routes';

export interface Cradle {
    // Common Services
    expressRouterAdapter: ExpressRouterAdapter;
    expressServer: ExpressServer;

    // User Module
    userRepository: UserRepositoryImpl;
    createUserUseCase: CreateUserUseCase;
    getUsersUseCase: GetUsersUseCase;
    userController: UserController;
    userRoutes: UserRoutes;
}
