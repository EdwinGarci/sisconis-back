import { IRouter, LoginUseCase } from "../../application";
import { LoginController } from "./controller";

export class AuthRoutes {
    constructor(
        private readonly router: IRouter,
        private readonly loginUseCase: LoginUseCase,
    ) {}
    
    public configureRoutes(): IRouter {
        const loginController = new LoginController(this.loginUseCase);
        
        this.router.post("/login", loginController.login);
        this.router.get("/logout", loginController.logout);
        return this.router;
    }
}