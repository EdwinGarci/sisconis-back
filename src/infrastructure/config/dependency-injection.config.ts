import { SaveLogUseCase } from "../../application";
import { createDatasources } from "../factories";
import { LogRepositoryImpl, UserRepositoryImpl } from "../repositories";

export function createDependencies() {
    const { logDatasource, userDatasource } = createDatasources();

    // Configurar repositorios y casos de uso
    const logRepository = new LogRepositoryImpl(logDatasource);
    const saveLogUseCase = new SaveLogUseCase(logRepository);

    const userRepository = new UserRepositoryImpl(userDatasource);

    return {
        saveLogUseCase,
        userRepository, // Puedes agregar más casos de uso relacionados a usuarios aquí
    };
}
