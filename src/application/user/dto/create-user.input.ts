import { Role } from '@domain/user/entities/user.entity';

/**
 * The input data transfer object for creating a user.
 *
 * @interface CreateUserInput
 */
export interface CreateUserInput {
    /**
     * The name of the user.
     */
    name: string;

    /**
     * The lastname of the user.
     */
    lastname: string;

    /**
     * The username of the user.
     */
    username: string;

    /**
     * The password of the user.
     */
    password: string;

    /**
     * The document number of the user.
     */
    documentNumber: string;

    /**
     * The role of the user.
     */
    role: Role;
}
