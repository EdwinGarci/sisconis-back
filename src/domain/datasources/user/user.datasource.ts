import { Role, UserEntity } from "../../entities";

export abstract class UserDatasource {
    abstract createUser(user: UserEntity): Promise<UserEntity>;
    abstract getUsers(filters?: { limit?: number; offset?: number; query?: string }): Promise<{ users: UserEntity[]; total: number }>;
    abstract getUserById(userId: string): Promise<UserEntity | null>;
    abstract updateUser(user: UserEntity): Promise<UserEntity>;
    abstract deleteUser(userId: string): Promise<void>;
    abstract findUsersByRole(role: Role): Promise<UserEntity[]>;
}
