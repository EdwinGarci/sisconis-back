import { UserEntity } from "../entities/user.entity";

/**
 * An abstract repository interface for managing user entities. 
 * Provides methods to perform CRUD operations on users.
 */
export abstract class UserRepository {
    /**
     * Retrieves all users from the repository.
     * @returns A promise that resolves to an array of UserEntity objects.
     */
    abstract findAll(): Promise<UserEntity[]>;

    /**
     * Retrieves a user by their ID.
     * @param id The ID of the user to retrieve.
     * @returns A promise that resolves to a UserEntity object.
     */
    abstract findById(id: number): Promise<UserEntity>;

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
     */
    abstract update(user: UserEntity): Promise<UserEntity>;

    /**
     * Deletes a user by their ID.
     * @param id The ID of the user to delete.
     * @returns A promise that resolves when the user is deleted.
     */
    abstract delete(id: number): Promise<void>;
}