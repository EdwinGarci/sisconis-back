import { CreateUserUseCase, IRouter } from "../../application";
import { PostgresUserDatasource, UserRepositoryImpl } from "../../infrastructure";
import { UserController } from "./controller";

export class UserRoutes {
    constructor(
        private readonly router: IRouter,
    ) {}
    
    public configureRoutes(): IRouter {
        
        const datasource = new PostgresUserDatasource();
        const userRepository = new UserRepositoryImpl(datasource);
        const createUserUseCase = new CreateUserUseCase(userRepository);
        const createUserController = new UserController(createUserUseCase);

        this.router.post("/", createUserController.createUser);
        return this.router;
    }
}