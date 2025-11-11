import { AwilixContainer, asClass } from 'awilix';
import { CreateUserUseCase } from '@application/user/use-cases/create-user.use-case';
import { GetUsersUseCase } from '@application/user/use-cases/get-users.use-case';
import { UserRepositoryImpl } from '@infrastructure/user/repositories/user.repository.impl';
import { UserController } from '@presentation/user/controller';
import { UserRoutes } from '@presentation/user/routes';

export function registerUserModule(container: AwilixContainer): void {
    container.register({
        // Repositories
        userRepository: asClass(UserRepositoryImpl).singleton(),

        // Use Cases
        createUserUseCase: asClass(CreateUserUseCase).singleton(),
        getUsersUseCase: asClass(GetUsersUseCase).singleton(),

        // Controllers
        userController: asClass(UserController).singleton(),

        // Routes
        userRoutes: asClass(UserRoutes).singleton(),
    });
}
