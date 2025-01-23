import { PrismaClient } from "@prisma/client";
import { Role, UserDatasource, UserEntity } from "../../../domain";
import { CustomError } from "../../errors";

const prismaClient = new PrismaClient();

export class PostgresUserDatasource implements UserDatasource {
    async createUser(user: UserEntity): Promise<UserEntity> {
        try {
            const newUser = await prismaClient.user.create({
                data: {
                    id: user.id, // Asegúrate de que `user.id` sea generado antes de llamar a este método
                    firstname: user.firstname,
                    middlename: user.middlename || null,
                    fatherlastname: user.fatherlastname,
                    matherlastname: user.matherlastname,
                    username: user.username,
                    password: user.toObject(true)._password, // Incluye contraseña cifrada
                    role: user.role,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                }
            });
            return UserEntity.fromObject({ ...newUser, password: newUser })
        } catch (error) {
            throw CustomError.badRequest(`Failed to create user: ${error.message}`);
        }
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