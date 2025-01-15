import 'dotenv/config';
import { get } from 'env-var';

// export interface EnvConfig {
//     PORT: number;
//     JWT_SECRET: string;
//     PUBLIC_PATH: string;
// }

export const envs = {
// export const envs: EnvConfig = {
    PORT: get('PORT').required().asPortNumber(),
    JWT_SECRET: get('JWT_SECRET').required().asString(),
    PUBLIC_PATH: get('PUBLIC_PATH').required().asString(),
    DB_TYPE: get('DB_TYPE').required().asString(),
}