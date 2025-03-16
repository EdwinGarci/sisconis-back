import { PrismaClient } from "@prisma/client";
import { Role, UserDatasource, UserEntity } from "../../../domain";
import { CustomError } from "../../errors";
import { BcryptAdapter } from "../../config";

export class PostgresUserDatasource implements UserDatasource {
    constructor(
        private readonly prismaClient: PrismaClient,
        private readonly bcryptAdapter: BcryptAdapter
    ) {}

    async createUser(user: UserEntity): Promise<UserEntity> {
        try {
            const hashedPassword = this.bcryptAdapter.hash(user.getPassword());
            const newUser = await this.prismaClient.user.create({
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

    async getUsers(filters?: { limit?: number; cursor?: string; offset?: number; query?: string; }): Promise<{ users: UserEntity[]; nextCursor?: string; total?: number; }> {
        try {
            const { limit = 5, cursor, offset, query } = filters || {};
    
            const total = offset !== undefined ? await this.prismaClient.user.count() : undefined;
    
            const users = await this.prismaClient.user.findMany({
                take: limit,
                skip: cursor ? 1 : offset ?? 0,
                cursor: cursor ? { id: cursor } : undefined,
                orderBy: { createdAt: "asc" },
                // where: query ? { username: { contains: query, mode: "insensitive" } } : undefined,
                where: {
                    deletedAt: null,
                    username: query ? { contains: query, mode: "insensitive" } : undefined,
                },
            });
    
            // const nextCursor = users.length === limit 
            const nextCursor = offset === undefined && users.length === limit 
                ? users[users.length - 1].id 
                : undefined;
    
            return {
                users: users.map(user => 
                    UserEntity.fromObject({
                        ...user,
                        role: user.role as Role,
                        middlename: user.middlename ?? undefined,
                        updatedAt: user.updatedAt ?? undefined,
                        deletedAt: user.deletedAt ?? undefined,
                        createdBy: user.createdBy ?? undefined,
                        updatedBy: user.updatedBy ?? undefined,
                        deletedBy: user.deletedBy ?? undefined,
                    }).value!
                ),
                nextCursor,
                total,
            };
        } catch (error) {
            throw CustomError.badRequest(`Failed to fetch users: ${(error as any).message}`);
        }
    }    

    async getUserById(userId: string): Promise<UserEntity | null> {
        const user = await this.prismaClient.user.findUnique({
            where: {
                id: userId,
            }
        });
        
        if (!user) {
            throw CustomError.notFound(`User with id '${userId}' not found.`);
        }

        const userResult = UserEntity.fromObject({
            ...user,
            middlename: user.middlename || undefined,
            role: user.role as Role,
            updatedAt: user.updatedAt || undefined,
            deletedAt: user.deletedAt || undefined,
            createdBy: user.createdBy || undefined,
            updatedBy: user.updatedBy || undefined,
            deletedBy: user.deletedBy || undefined,
        });

        if (!userResult.isSuccess) {
            throw CustomError.badRequest(userResult.error?.message || "Error creating user entity");
        }

        return userResult.value!;
    }

    findUserByRole(role: Role): Promise<UserEntity | null> {
        throw new Error("Method not implemented.");
    }

    async findUserByUsername(username: string): Promise<UserEntity | null> {
        try {
            const user = await this.prismaClient.user.findUnique({
                where: { username },
            });

            if (!user) {
                throw CustomError.notFound(`User with username '${username}' not found.`);
            }

            const userResult = UserEntity.fromObject({
                ...user,
                middlename: user.middlename || undefined,
                role: user.role as Role,
                updatedAt: user.updatedAt || undefined,
                deletedAt: user.deletedAt || undefined,
                createdBy: user.createdBy || undefined,
                updatedBy: user.updatedBy || undefined,
                deletedBy: user.deletedBy || undefined,
            });
    
            if (!userResult.isSuccess) {
                throw CustomError.badRequest(userResult.error?.message || "Error creating user entity");
            }
    
            return userResult.value!;
        } catch (error) {
            throw CustomError.badRequest(`Failed to fetch users: ${(error as any).message}`);
        }
    }

    updateUser(user: UserEntity): Promise<UserEntity> {
        throw new Error("Method not implemented.");
    }

    deleteUser(userId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}