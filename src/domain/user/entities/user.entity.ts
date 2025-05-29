/**
 * Represents the available user roles in the system
*/
export enum Role {
    SYSTEM_ADMIN = "Administrador del Sistema",
    USER = "Usuario",
    VIGILANT = "Vigilante",
    ADMIN = "Administrador",
    DIRECTOR = "Director",
    RRHH = "Jefe de Recursos Humanos",
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
 * @property {Role}   role     - Role assigned to the user (readonly)
*/
export class UserEntity {
    private readonly id: number;
    private readonly name: string;
    private readonly lastname: string;
    private readonly username: string;
    private readonly password: string;
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
        this.role = options.role;
    }

    /**
     * Creates a new instance of UserEntity
     * 
     * @param options - User data
     * @returns A new instance of UserEntity
     */
    public static create(options: UserEntityOptions): UserEntity {
        return new UserEntity(options);
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
     * Gets the user's role
     * 
     * @returns Role assigned to the user
     */
    public getRole(): Role {
        return this.role;
    }
}