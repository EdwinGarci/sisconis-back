import { Role } from "@domain/user/entities/user.entity";

export interface CreateUserInput {
    name: string;
    lastname: string;
    username: string;
    role: Role;
    password?: string;
}
