import { UserEntity } from "../entities/user.entity";

export abstract class UserRepository {
    abstract findAll(): Promise<UserEntity[]>;
    abstract findById(id: number): Promise<UserEntity>;
    abstract create(user: UserEntity): Promise<UserEntity>;
    abstract update(user: UserEntity): Promise<UserEntity>;
    abstract delete(id: number): Promise<void>;
}