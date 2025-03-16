import { envs } from "../config";

export type DatasourceCollection = {
    logDatasource: string;
    userDatasource: string;
};

export function getDatasourceBindings(): DatasourceCollection {
    const dbType = envs.DB_TYPE || "postgres";

    if (dbType === "mysql") {
        return {
            logDatasource: "mysqlLogDatasource",
            userDatasource: "mysqlUserDatasource",
        }
    }

    return {
        logDatasource: "postgresLogDatasource",
        userDatasource: "postgresUserDatasource",
    };
}
