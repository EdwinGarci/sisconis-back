// import { PrismaClient } from "@prisma/client";
// import { CreateUserUseCase, GetUsersUseCase, LoginUseCase, SaveLogUseCase } from "../../application";
// import { createDatasources } from "../factories";
// import { LogRepositoryImpl, UserRepositoryImpl } from "../repositories";
// import { AuthMiddleware } from "../server";
// import { BcryptAdapter } from "./bcrypt.config";
// import { envs } from "./env.config";
// import { JwtAdapter } from "./jwt.adapter";

// export function createDependencies() {
//     const { logDatasource, userDatasource } = createDatasources();

//     // Repositories
//     const logRepository = new LogRepositoryImpl(logDatasource);
//     const userRepository = new UserRepositoryImpl(userDatasource);

//     // Adapters
//     const jwtAdapter = new JwtAdapter(envs.JWT_SECRET);
//     const bcryptAdapter = new BcryptAdapter();
//     const prismaClient = new PrismaClient();

//     // UseCases
//     const saveLogUseCase = new SaveLogUseCase(logRepository);

//     const loginUseCase = new LoginUseCase(userRepository, bcryptAdapter, jwtAdapter);

//     const createUserUseCase = new CreateUserUseCase(userRepository);
//     const getUsersUseCase = new GetUsersUseCase(userRepository);

//     // Middleware
//     const authMiddleware = new AuthMiddleware(userRepository, jwtAdapter);

//     return {
//         saveLogUseCase,
//         userRepository,
//         loginUseCase,
//         createUserUseCase,
//         getUsersUseCase,
//         authMiddleware,
//     };
// }
