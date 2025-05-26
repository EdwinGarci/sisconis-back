export enum Role {
    SYSTEM_ADMIN = "Administrador del Sistema",
    USER = "Usuario",
    VIGILANT = "Vigilante",
    ADMIN = "Administrador",
    DIRECTOR = "Director",
    RRHH = "Jefe de Recursos Humanos",
}

export interface UserEntityOptions {
    id: number;
    name: string;
    lastname: string;
    username: string;
    password: string;
    role: Role;
}

export type UserEntitySchema = {
    id: number;
    name: string;
    lastname: string;
    username: string;
    role: Role;
    password?: string;
};

export class UserEntity {
    private readonly id: number;
    private readonly name: string;
    private readonly lastname: string;
    private readonly username: string;
    private readonly password: string;
    private readonly role: Role;

    private constructor(options: UserEntityOptions) {
        this.id = options.id;
        this.name = options.name;
        this.lastname = options.lastname;
        this.username = options.username.toLowerCase().trim();
        this.password = options.password;
        this.role = options.role;
    }

    public static create(options: UserEntityOptions): UserEntity {
        return new UserEntity(options);
    }

    public getPassword(): string {
        return this.password;
    }

    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getLastname(): string {
        return this.lastname;
    }

    public getUsername(): string {
        return this.username;
    }

    public getRole(): Role {
        return this.role;
    }
}