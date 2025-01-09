import { Router } from "express";
// import { AuthController } from "./controller";
// import { TodoDatasourceImpl } from "../../infrastructure/datasource/auth.datasource.impl";
// import { TodoRepositoryImpl } from "../../infrastructure/repositories/auth.repository.impl";

export class AuthRoutes {
    static get routes(): Router {
        const router = Router();

        // const datasource = new TodoDatasourceImpl();
        // const authRepository = new TodoRepositoryImpl(datasource);
        // const authController = new AuthController(authRepository);

        // router.get('/', authController.getAuth);
        // router.get('/:id', authController.getTodoById);
        // router.post('/', authController.createTodo);
        // router.put('/:id', authController.updateTodo);
        // router.delete('/:id', authController.deleteTodo);
        
        return router;
    }
}