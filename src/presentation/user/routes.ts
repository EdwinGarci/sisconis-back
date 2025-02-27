import { CreateUserUseCase, GetUsers, IRouter } from "../../application";
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
        const getUsers = new GetUsers(userRepository);
        const createUserController = new UserController(createUserUseCase, getUsers);

        this.router.post("/", createUserController.createUser);
        this.router.get("/", createUserController.getUsers);
        return this.router;
    }
}