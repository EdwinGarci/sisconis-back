import { Role, UserDatasource, UserEntity, UserRepository } from "../../../domain";

export class UserRepositoryImpl implements UserRepository {
    constructor(
        private readonly userDatasource: UserDatasource,
    ) {}
    
    async create(user: UserEntity): Promise<UserEntity> {
        return this.userDatasource.createUser(user);
    }

    async findAll(filters?: { limit?: number; cursor?: string; offset?: number; query?: string; }): Promise<{ users: UserEntity[]; nextCursor?: string; total?: number; }> {
        return this.userDatasource.getUsers(filters);
    }
        
    async findById(userId: string): Promise<UserEntity | null> {
        return this.userDatasource.getUserById(userId);
    }
    
    async findByRole(role: Role): Promise<UserEntity | null> {
        throw new Error("Method not implemented.");
    }

    async findByUsername(username: string): Promise<UserEntity | null> {
        return this.userDatasource.findUserByUsername(username);
    }
    
    async update(user: UserEntity): Promise<UserEntity> {
        throw new Error("Method not implemented.");
    }
    
    async softDelete(userId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}