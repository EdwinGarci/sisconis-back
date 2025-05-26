import { UserEntity } from "../entities/user.entity";

export abstract class UserDatasource {
    abstract getUsers(): Promise<UserEntity[]>;
    abstract getUserById(id: number): Promise<UserEntity>;
    abstract createUser(user: UserEntity): Promise<UserEntity>;
    abstract updateUser(user: UserEntity): Promise<UserEntity>;
    abstract deleteUser(id: number): Promise<void>;
}