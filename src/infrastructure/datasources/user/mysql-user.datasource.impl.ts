import { PrismaClient } from "@prisma/client";
import { Role, UserDatasource, UserEntity } from "../../../domain";

const prismaClient = new PrismaClient();

export class MySQLUserDatasource implements UserDatasource {
    async createUser(user: UserEntity): Promise<UserEntity> {
        throw new Error("Method not implemented.");
    }

    async getUsers(filters?: { limit?: number; offset?: number; query?: string; }): Promise<{ users: UserEntity[]; total: number; }> {
        throw new Error("Method not implemented.");
    }

    async getUserById(userId: string): Promise<UserEntity | null> {
        throw new Error("Method not implemented.");
    }

    async updateUser(user: UserEntity): Promise<UserEntity> {
        throw new Error("Method not implemented.");
    }

    async deleteUser(userId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async findUsersByRole(role: Role): Promise<UserEntity[]> {
        throw new Error("Method not implemented.");
    }
    
}