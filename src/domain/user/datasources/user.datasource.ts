import { UserEntity } from "../entities/user.entity";

/**
 * An abstract datasource interface for managing user entities.
 * Provides methods to perform CRUD operations on users.
 */
export abstract class UserDatasource {
    /**
     * Retrieves all users from the datasource.
     * @returns A promise that resolves to an array of UserEntity objects.
     */
    abstract index(): Promise<UserEntity[]>;

    /**
     * Retrieves a user by their ID.
     * @param id The ID of the user to retrieve.
     * @returns A promise that resolves to a UserEntity object.
     */
    abstract find(id: number): Promise<UserEntity | null>;

    /**
     * Creates a new user and returns the created user.
     * @param user - User data to create a new user.
     * @returns The created user.
     */
    abstract create(user: UserEntity): Promise<UserEntity>;

    /**
     * Updates an existing user and returns the updated user.
     * @param user - User data to update an existing user.
     * @returns The updated user.
     * @throws {Error} If the user is not found.
     */
    abstract update(user: UserEntity): Promise<UserEntity>;

    /**
     * Deletes a user by their ID.
     * @param id The ID of the user to delete.
     * @returns A promise that resolves when the user is deleted.
     * @throws {Error} If the user is not found.
     */
    abstract delete(id: number): Promise<void>;
}