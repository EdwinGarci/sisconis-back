import { PrismaClient } from '@prisma/client';
import { UserDatasource } from '@domain/user/datasources/user.datasource';
import { UserEntity } from '@domain/user/entities/user.entity';

export class UserDatasourceImpl implements UserDatasource {
    constructor(private readonly prismaClient: PrismaClient) {}

    index(): Promise<UserEntity[]> {
        throw new Error('Method not implemented.');
    }

    find(id: number): Promise<UserEntity | null> {
        throw new Error('Method not implemented.');
    }

    create(user: UserEntity): Promise<UserEntity> {
        const newUser = this.prismaClient.user.create({
            data: user,
        });

        return newUser;
    }

    update(user: UserEntity): Promise<UserEntity> {
        throw new Error('Method not implemented.');
    }

    delete(id: number): Promise<UserEntity> {
        throw new Error('Method not implemented.');
    }
}
