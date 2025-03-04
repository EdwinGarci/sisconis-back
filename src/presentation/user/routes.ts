import { CreateUserUseCase, GetUsersUseCase, IRouter } from "../../application";
import { UserController } from "./controller";

export class UserRoutes {
    constructor(
        private readonly router: IRouter,
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly getUsersUseCase: GetUsersUseCase,
    ) {}
    
    public configureRoutes(): IRouter {
        const createUserController = new UserController(this.createUserUseCase, this.getUsersUseCase);

        this.router.post("/", createUserController.createUser);
        this.router.get("/", createUserController.getUsers);
        return this.router;
    }
}