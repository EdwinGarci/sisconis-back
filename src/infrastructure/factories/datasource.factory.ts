import { envs } from "../config";
import { LogDatasource, UserDatasource } from "../../domain";
import { MySQLLogDatasource, MySQLUserDatasource, PostgresLogDatasource, PostgresUserDatasource } from "../datasources";

export type DatasourceCollection = {
    logDatasource: LogDatasource;
    userDatasource: UserDatasource;
};

export function createDatasources(): DatasourceCollection {
    const dbType = envs.DB_TYPE || "postgres"; // "postgres" por defecto

    if (dbType === "mysql") {
        return {
            logDatasource: new MySQLLogDatasource(),
            userDatasource: new MySQLUserDatasource(),
        }
    }

    // Por defecto usa PostgreSQL
    return {
        logDatasource: new PostgresLogDatasource(),
        userDatasource: new PostgresUserDatasource(),
    };
}
