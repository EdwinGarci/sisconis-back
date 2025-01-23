import { IRouter } from "../../application";

export class AuthRoutes {
    constructor(private readonly router: IRouter) {}
    
    public configureRoutes(): void {
        this.router.get("/users", (req, res) => {
            res.send("Get all users");
        });

        this.router.post("/users", (req, res) => {
            res.send("Create a new user");
        });
    }
    // static get routes(): Router {
    //     const router = Router();

    //     const datasource = new TodoDatasourceImpl();
    //     const authRepository = new TodoRepositoryImpl(datasource);
    //     const authController = new AuthController(authRepository);

    //     router.get('/', authController.getAuth);
    //     router.get('/:id', authController.getTodoById);
    //     router.post('/', authController.createTodo);
    //     router.put('/:id', authController.updateTodo);
    //     router.delete('/:id', authController.deleteTodo);
        
    //     return router;
    // }
}