import { PrismaClient } from "@prisma/client";
import { Role, UserDatasource, UserEntity } from "../../../domain";
import { CustomError } from "../../errors";
import { bcryptAdapter } from "../../config";

const prismaClient = new PrismaClient();

export class PostgresUserDatasource implements UserDatasource {
    async createUser(user: UserEntity): Promise<UserEntity> {
        try {
            const hashedPassword = bcryptAdapter.hash(user.getPassword());
            const newUser = await prismaClient.user.create({
                data: {
                    firstname: user.fullName.firstname,
                    middlename: user.fullName.middlename ?? null,
                    fatherlastname: user.fullName.fatherlastname,
                    motherlastname: user.fullName.motherlastname,
                    username: user.username,
                    password: hashedPassword,
                    role: user.role,
                }
            });
            const userResult = UserEntity.fromObject({ 
                ...newUser,
                middlename: newUser.middlename || undefined,
                // password: hashedPassword,
                role: newUser.role as Role,
                updatedAt: newUser.updatedAt || undefined,
                deletedAt: newUser.deletedAt || undefined,
                createdBy: newUser.createdBy || undefined,
                updatedBy: newUser.updatedBy || undefined,
                deletedBy: newUser.deletedBy || undefined,
            });

            if (!userResult.isSuccess) {
                throw CustomError.badRequest(userResult.error?.message || "Unknown error occurred");
            }            

            return userResult.value!;
        } catch (error) {
            throw CustomError.badRequest(`Failed to create user: ${(error as any).message}`);
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