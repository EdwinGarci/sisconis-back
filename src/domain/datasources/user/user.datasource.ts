import { Role, UserEntity } from "../../entities";

export abstract class UserDatasource {
    abstract createUser(user: UserEntity): Promise<UserEntity>;
    abstract getUsers(filters?: { limit?: number; cursor?: string; offset?: number; query?: string }): Promise<{ users: UserEntity[]; nextCursor?: string; total?: number; }>;
    abstract getUserById(userId: string): Promise<UserEntity | null>;
    abstract findUserByRole(role: Role): Promise<UserEntity | null>;
    abstract findUserByUsername(username: string): Promise<UserEntity | null>;
    abstract updateUser(user: UserEntity): Promise<UserEntity>;
    abstract deleteUser(userId: string): Promise<void>;
}
