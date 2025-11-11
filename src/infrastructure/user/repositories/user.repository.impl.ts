import { UserDatasource } from '@domain/user/datasources/user.datasource';
import { UserEntity } from '@domain/user/entities/user.entity';
import { UserRepository } from '@domain/user/repositories/user.repository';

export class UserRepositoryImpl implements UserRepository {
    constructor(private readonly userDatasource: UserDatasource) {}

    async index(): Promise<UserEntity[]> {
        throw new Error('Method not implemented.');
    }

    async find(id: number): Promise<UserEntity | null> {
        throw new Error('Method not implemented.');
    }

    async create(user: UserEntity): Promise<UserEntity> {
        return this.userDatasource.create(user);
    }

    async update(user: UserEntity): Promise<UserEntity> {
        throw new Error('Method not implemented.');
    }

    async delete(id: number): Promise<UserEntity> {
        throw new Error('Method not implemented.');
    }
}
