import { Role, UserEntity  } from "../../entities";

/**
 * Abstract class for user repository.
 * Encapsulates domain logic and interacts with the underlying datasource.
 */
export abstract class UserRepository {
    /**
     * Creates a new user.
     * @param user The user entity to be persisted.
     */
    abstract create(user: UserEntity): Promise<UserEntity>;

    /**
     * Retrieves all users with optional filters and pagination.
     * @param filters Optional filters for the query.
     */
    abstract findAll(filters?: { limit?: number; offset?: number; query?: string }): Promise<{ users: UserEntity[]; total: number }>;

    /**
     * Finds a user by its unique ID.
     * @param userId The unique identifier of the user.
     */
    abstract findById(userId: string): Promise<UserEntity | null>;

    /**
     * Finds users by their role.
     * @param role The role to filter users by.
     */
    abstract findByRole(role: Role): Promise<UserEntity[]>;

    /**
     * Updates an existing user.
     * @param user The updated user entity.
     */
    abstract update(user: UserEntity): Promise<UserEntity>;

    /**
     * Soft deletes a user by setting a deletion timestamp.
     * @param userId The unique identifier of the user to be deleted.
     */
    abstract softDelete(userId: string): Promise<void>;

    /**
     * Permanently deletes a user from the datasource.
     * @param userId The unique identifier of the user to be deleted.
     */
    abstract hardDelete(userId: string): Promise<void>;
}