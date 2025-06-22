import { PrismaClient } from '@prisma/client';
import { UserDatasource } from '@domain/user/datasources/user.datasource';
import { UserEntity } from '@domain/user/entities/user.entity';
import { UserMapper } from '../mappers/user.mapper';

export class UserDatasourceImpl implements UserDatasource {
    constructor(private readonly prismaClient: PrismaClient) {}

    async index(): Promise<UserEntity[]> {
        throw new Error('Method not implemented.');
    }

    async find(id: number): Promise<UserEntity | null> {
        throw new Error('Method not implemented.');
    }

    async create(user: UserEntity): Promise<UserEntity> {
        const newUserRaw = await this.prismaClient.users.create({
            data: UserMapper.toPrisma(user),
        });

        return UserMapper.toEntity(newUserRaw);
    }

    async update(user: UserEntity): Promise<UserEntity> {
        throw new Error('Method not implemented.');
    }

    async delete(id: number): Promise<UserEntity> {
        throw new Error('Method not implemented.');
    }
}
