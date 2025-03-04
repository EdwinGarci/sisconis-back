import { Role, UserEntity  } from "../../entities";

export abstract class UserRepository {
    abstract create(user: UserEntity): Promise<UserEntity>;
    abstract findAll(filters?: { limit?: number; cursor?: string; offset?: number; query?: string }): Promise<{ users: UserEntity[]; nextCursor?: string, total?: number; }>;
    abstract findById(userId: string): Promise<UserEntity | null>;
    abstract findByRole(role: Role): Promise<UserEntity | null>;
    abstract findByUsername(username: string): Promise<UserEntity | null>;
    abstract update(user: UserEntity): Promise<UserEntity>;
    abstract softDelete(userId: string): Promise<void>;
    // abstract hardDelete(userId: string): Promise<void>;
}