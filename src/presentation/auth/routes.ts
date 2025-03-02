import { IRouter } from "../../application";
import { LoginController } from "./controller";

export class AuthRoutes {
    constructor(
        private readonly router: IRouter
    ) {}
    
    public configureRoutes(): IRouter {
        const loginController = new LoginController();
        
        this.router.post("/login", loginController.login);
        this.router.get("/logout", loginController.logout);
        return this.router;
    }
}