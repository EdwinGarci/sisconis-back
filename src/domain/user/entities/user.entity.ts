import { Result } from '@shared/core/result';
import {
    InvalidUsernameError,
    InvalidNameError,
    InvalidLastNameError,
    InvalidDocumentNumberError,
    InvalidPasswordError,
} from '../errors/user.errors';

/**
 * Represents the available user roles in the system
 */
export enum Role {
    SYSTEM_ADMIN = 'Administrador del Sistema',
    USER = 'Usuario',
    VIGILANT = 'Vigilante',
    ADMIN = 'Administrador',
    DIRECTOR = 'Director',
    RRHH = 'Jefe de Recursos Humanos',
}

/**
 * Properties required to instantiate a UserEntity
 */
export interface UserEntityOptions {
    id: number;
    name: string;
    lastname: string;
    username: string;
    password: string;
    documentNumber: string;
    role: Role;
}

/**
 * Public-facing structure of a user, used for serialization
 * Password is optional because it is not needed when deserializing
 * Does not include sensitive data like passwords
 */
export type UserEntitySchema = {
    id: number;
    name: string;
    lastname: string;
    username: string;
    documentNumber: string;
    role: Role;
    password?: string;
};

/**
 * Domain entity representing a system user
 * Contains internal logic and encapsulated data access
 *
 * @property {number} id       - Unique identifier for the user (readonly)
 * @property {string} name     - First name of the user (readonly)
 * @property {string} lastname - Last name of the user (readonly)
 * @property {string} username - System username (readonly)
 * @property {string} password - Hashed password (readonly)
 * @property {string} documentNumber - Document number of the user (readonly)
 * @property {Role}   role     - Role assigned to the user (readonly)
 */
export class UserEntity {
    private readonly id: number;
    private readonly name: string;
    private readonly lastname: string;
    private readonly username: string;
    private readonly password: string;
    private readonly documentNumber: string;
    private readonly role: Role;

    /**
     * Private constructor. Use static create method to instantiate
     *
     * @param options - User data
     */
    private constructor(options: UserEntityOptions) {
        this.id = options.id;
        this.name = options.name;
        this.lastname = options.lastname;
        this.username = options.username.toLowerCase().trim();
        this.password = options.password;
        this.documentNumber = options.documentNumber;
        this.role = options.role;
    }

    /**
     * Creates a new instance of UserEntity
     *
     * @param options - User data
     * @returns A new instance of UserEntity
     */
    public static create(options: UserEntityOptions): Result<UserEntity, Error> {
        // Validar nombre de usuario
        if (!options.username.match(/^[a-zA-Z0-9]{3,20}$/)) {
            return Result.fail(new InvalidUsernameError());
        }

        // Validar nombre
        if (options.name.length < 2 || options.name.length > 50) {
            return Result.fail(new InvalidNameError());
        }

        // Validar apellido
        if (options.lastname.length < 2 || options.lastname.length > 50) {
            return Result.fail(new InvalidLastNameError());
        }

        // Validar número de documento
        if (!options.documentNumber.match(/^[0-9]{8,12}$/)) {
            return Result.fail(new InvalidDocumentNumberError());
        }

        // Validar contraseña
        if (!options.password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
            return Result.fail(new InvalidPasswordError());
        }

        const user = new UserEntity(options);
        return Result.ok(user);
    }

    /**
     * Gets the user's ID
     *
     * @returns The user's ID
     */
    public getId(): number {
        return this.id;
    }

    /**
     * Gets the user's name
     *
     * @returns The user's name
     */
    public getName(): string {
        return this.name;
    }

    /**
     * Gets the user's lastname
     *
     * @returns The user's lastname
     */
    public getLastname(): string {
        return this.lastname;
    }

    /**
     * Gets the user's username
     *
     * @returns The user's username
     */
    public getUsername(): string {
        return this.username;
    }

    /**
     * Gets the user's password
     *
     * @returns The encrypted password string
     */
    public getPassword(): string {
        return this.password;
    }

    /**
     * Gets the user's document number
     *
     * @returns The user's document number
     */
    public getDocumentNumber(): string {
        return this.documentNumber;
    }

    /**
     * Gets the user's role
     *
     * @returns Role assigned to the user
     */
    public getRole(): Role {
        return this.role;
    }
}
