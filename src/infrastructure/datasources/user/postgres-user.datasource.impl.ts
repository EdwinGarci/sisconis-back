import { PrismaClient } from "@prisma/client";
import { Role, UserDatasource, UserEntity } from "../../../domain";

const prismaClient = new PrismaClient();

export class PostgresUserDatasource implements UserDatasource {
    async createUser(user: UserEntity): Promise<UserEntity> {
        // const user = await prismaClient.userModel.create({});
        throw new Error("Method not implemented.");
    }

    getUsers(filters?: { limit?: number; offset?: number; query?: string; }): Promise<{ users: UserEntity[]; total: number; }> {
        throw new Error("Method not implemented.");
    }

    getUserById(userId: string): Promise<UserEntity | null> {
        throw new Error("Method not implemented.");
    }

    updateUser(user: UserEntity): Promise<UserEntity> {
        throw new Error("Method not implemented.");
    }

    deleteUser(userId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    findUsersByRole(role: Role): Promise<UserEntity[]> {
        throw new Error("Method not implemented.");
    }
    
}