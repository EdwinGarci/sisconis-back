import { PrismaClient } from "@prisma/client";
import { asClass, asFunction, asValue, createContainer, InjectionMode } from "awilix";
import { CreateUserUseCase, GetUsersUseCase, LoginUseCase, SaveLogUseCase } from "../../application";
import { getDatasourceBindings } from "../factories";
import { LogRepositoryImpl, UserRepositoryImpl } from "../repositories";
import { AuthMiddleware } from "../server";
import { BcryptAdapter } from "./bcrypt.config";
import { envs } from "./env.config";
import { JwtAdapter } from "./jwt.adapter";
import { MySQLLogDatasource, MySQLUserDatasource, PostgresLogDatasource, PostgresUserDatasource } from "../datasources";

export const container = createContainer({
    injectionMode: InjectionMode.CLASSIC,
});

const prismaClient = new PrismaClient();

const { logDatasource, userDatasource } = getDatasourceBindings();

container.register({
    // Prisma
    prismaClient: asValue(prismaClient),
    
    // Datasources
    postgresUserDatasource: asClass(PostgresUserDatasource).singleton(),
    postgresLogDatasource: asClass(PostgresLogDatasource).singleton(),
    mysqlUserDatasource: asClass(MySQLUserDatasource).singleton(),
    mysqlLogDatasource: asClass(MySQLLogDatasource).singleton(),

    logDatasource: asFunction((c) => c.resolve(logDatasource)).singleton(),
    userDatasource: asFunction((c) => c.resolve(userDatasource)).singleton(),

    // Repositories
    logRepository: asClass(LogRepositoryImpl).singleton(),
    userRepository: asClass(UserRepositoryImpl).singleton(),

    // Adapters
    jwtSecret: asValue(envs.JWT_SECRET),
    jwtAdapter: asClass(JwtAdapter).singleton().inject(() => ({ secret: container.resolve("jwtSecret") })),
    // jwtAdapter: asClass(JwtAdapter).singleton().inject(() => ({ secret: envs.JWT_SECRET })),
    bcryptAdapter: asClass(BcryptAdapter).singleton(),

    // UseCases
    saveLogUseCase: asClass(SaveLogUseCase).singleton(),
    loginUseCase: asClass(LoginUseCase).singleton(),
    createUserUseCase: asClass(CreateUserUseCase).singleton(),
    getUsersUseCase: asClass(GetUsersUseCase).singleton(),

    // Middleware
    authMiddleware: asClass(AuthMiddleware).transient(),
});
