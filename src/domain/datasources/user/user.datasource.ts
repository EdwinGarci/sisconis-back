import { UserEntity } from "../../entities";

export abstract class UserDatasource {
    abstract createUser(user: UserEntity): Promise<void>;
    // abstract getUsers(users: ): Promise<LogEntity[]>;
    abstract getUserById(userId: string): Promise<UserEntity | null>;
    abstract updateUser(user: UserEntity): Promise<void>;
    abstract deleteUser(userId: string): Promise<void>;
}
