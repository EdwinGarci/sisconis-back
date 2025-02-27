import { SaveLogUseCase } from "../../application";
import { createDatasources } from "../factories";
import { LogRepositoryImpl, UserRepositoryImpl } from "../repositories";

export function createDependencies() {
    const { logDatasource, userDatasource } = createDatasources();

    const logRepository = new LogRepositoryImpl(logDatasource);
    const saveLogUseCase = new SaveLogUseCase(logRepository);

    const userRepository = new UserRepositoryImpl(userDatasource);

    return {
        saveLogUseCase,
        userRepository,
    };
}
