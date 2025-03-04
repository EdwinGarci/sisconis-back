import { CreateUserUseCase, GetUsersUseCase, IRouter, LoginUseCase } from "../application";
import { AuthRoutes } from "./auth/routes";
import { UserRoutes } from "./user/routes";

export class AppRoutes {
    public static configureRoutes(
        router: IRouter,
        createUserUseCase: CreateUserUseCase,
        getUsersUseCase: GetUsersUseCase,
        loginUseCase: LoginUseCase,
    ): void {
        // Crear instancia del adaptador de router para las rutas de usuario
        const userRoutes = new UserRoutes(router, createUserUseCase, getUsersUseCase);

        // Crear instancia del adaptador de router para las rutas de autenticación
        const authRoutes = new AuthRoutes(router, loginUseCase);
        
        // Configurar las rutas
        router.use("/api/users", userRoutes.configureRoutes());
        router.use("/api/auth", authRoutes.configureRoutes());
    }
}