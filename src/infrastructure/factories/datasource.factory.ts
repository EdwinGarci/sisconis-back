import { envs } from "../config";
import { LogDatasource, UserDatasource } from "../../domain";
import { MySQLLogDatasource, MySQLUserDatasource, PostgresLogDatasource, PostgresUserDatasource } from "../datasources";

export type DatasourceCollection = {
    logDatasource: LogDatasource;
    userDatasource: UserDatasource;
};

export function createDatasources(): DatasourceCollection {
    const dbType = envs.DB_TYPE || "postgres";

    if (dbType === "mysql") {
        return {
            logDatasource: new MySQLLogDatasource(),
            userDatasource: new MySQLUserDatasource(),
        }
    }

    return {
        logDatasource: new PostgresLogDatasource(),
        userDatasource: new PostgresUserDatasource(),
    };
}
