import { LogDatasource } from "../../domain";
import { envs } from "../config";
import { MySQLLogDatasource, PostgresLogDatasource } from "../datasources";


export function createLogDatasource(): LogDatasource {
    const dbType = envs.DB_TYPE || "postgres"; // "postgres" por defecto

    if (dbType === "mysql") {
        return new MySQLLogDatasource();
    }

    // Por defecto usa PostgreSQL
    return new PostgresLogDatasource();
}
