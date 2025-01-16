import { Role, UserEntity } from "../../entities";

/**
 * Abstract class for user datasource.
 * Defines the contract for low-level data access operations.
 * Responsible for interacting directly with the underlying data storage (e.g., databases, APIs).
 */
export abstract class UserDatasource {
    /**
     * Creates a new user in the datasource.
     * @param user The user entity to be created.
     */
    abstract createUser(user: UserEntity): Promise<UserEntity>;

    /**
     * Retrieves a list of users with optional filters and pagination.
     * @param filters Optional filters for the query.
     */
    abstract getUsers(filters?: { limit?: number; offset?: number; query?: string }): Promise<{ users: UserEntity[]; total: number }>;

    /**
     * Finds a user by its unique ID.
     * @param userId The unique identifier of the user.
     */
    abstract getUserById(userId: string): Promise<UserEntity | null>;

    /**
     * Updates an existing user in the datasource.
     * @param user The updated user entity.
     */
    abstract updateUser(user: UserEntity): Promise<UserEntity>;

    /**
     * Deletes a user from the datasource by its unique ID.
     * @param userId The unique identifier of the user to be deleted.
     */
    abstract deleteUser(userId: string): Promise<void>;

    /**
     * Finds users by their role.
     * @param role The role to filter users by.
     */
    abstract findUsersByRole(role: Role): Promise<UserEntity[]>;
}
