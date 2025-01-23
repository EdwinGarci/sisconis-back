import { IRouter } from "../application";
import { AuthRoutes } from "./auth/routes";
import { UserRoutes } from "./user/routes";

export class AppRoutes {
    public static configureRoutes(router: IRouter): void {
        // Crear instancia del adaptador de router para las rutas de usuario
        const userRoutes = new UserRoutes(router);

        // Crear instancia del adaptador de router para las rutas de autenticación
        const authRoutes = new AuthRoutes(router);
        
        // Configurar las rutas
        router.use("/api/users", userRoutes.configureRoutes());
        // router.use("/api/auth", authRoutes.configureRoutes());
    }
}