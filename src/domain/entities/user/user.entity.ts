export enum Role {
    ADMIN_SYSTEM = 'Administrador del Sistema',
    USER = 'Usuario',
    VIGILANT = 'Vigilante',
    ADMIN = 'Administrador',
    DIRECTOR = 'Director',
    RRHH = 'Jefe de Recursos Humanos'
}

export interface UserEntityOptions {
    name: string;
    lastname: string;
    username: string;
    password: string;
    role: Role;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    createdBy?: string;
    updatedBy?: string;
    deletedBy?: string;
}

export class UserEntity {
    public readonly name: string;
    public readonly lastname: string;
    public readonly username: string;
    public readonly password: string;
    public readonly role: Role;
    public readonly createdAt: Date;
    public readonly updatedAt?: Date;
    public readonly deletedAt?: Date;
    public readonly createdBy?: string;
    public readonly updatedBy?: string;
    public readonly deletedBy?: string;

    constructor(options: UserEntityOptions) {
        const { name, lastname, username, password, role, createdAt = new Date(), updatedAt, deletedAt, createdBy, updatedBy, deletedBy } = options;
        this.name = name;
        this.lastname = lastname;
        this.username = username.toLowerCase();
        this.password = password;
        this.role = role;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.deletedBy = deletedBy;
    }

    public isActive(): boolean {
        return !this.deletedAt;
    }

    public getFullName(): string {
        return `${this.name} ${this.lastname}`;
    }

    public toJson(): string {
        return JSON.stringify(this.toObject());
    }

    public toObject(): { [key: string]: any } {
        return {
            name: this.name,
            lastname: this.lastname,
            username: this.username,
            role: this.role,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            deletedAt: this.deletedAt,
            createdBy: this.createdBy,
            updatedBy: this.updatedBy,
            deletedBy: this.deletedBy,
        };
    }

    static fromJson = (json: string): UserEntity => {
        json = (json === '') ?  '{}' : json;
        const { name, lastname, username, password, role, createdAt, updatedAt, deletedAt, createdBy, updatedBy, deletedBy} = JSON.parse(json);
        return new UserEntity({
            name,
            lastname, 
            username,
            password,
            role,
            createdAt: new Date(createdAt),
            updatedAt: updatedAt ? new Date(updatedAt) : undefined,
            deletedAt: deletedAt ? new Date(deletedAt) : undefined,
            createdBy,
            updatedBy,
            deletedBy,
        });
    }

    static fromObject = (object: {[key: string]: any}): UserEntity => {
        const { name, lastname, username, password, role, createdAt, updatedAt, deletedAt, createdBy, updatedBy, deletedBy} = object;
        const log = new UserEntity({
            name,
            lastname, 
            username,
            password,
            role,
            createdAt,
            updatedAt,
            deletedAt,
            createdBy,
            updatedBy,
            deletedBy,
        });
        return log;
    }
}

