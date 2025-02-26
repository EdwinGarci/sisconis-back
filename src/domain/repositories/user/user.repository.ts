import { Role, UserEntity  } from "../../entities";

export abstract class UserRepository {
    abstract create(user: UserEntity): Promise<UserEntity>;
    abstract findAll(filters?: { limit?: number; offset?: number; query?: string }): Promise<{ users: UserEntity[]; total: number }>;
    abstract findById(userId: string): Promise<UserEntity | null>;
    abstract findByRole(role: Role): Promise<UserEntity[]>;
    abstract update(user: UserEntity): Promise<UserEntity>;
    abstract softDelete(userId: string): Promise<void>;
    abstract hardDelete(userId: string): Promise<void>;
}