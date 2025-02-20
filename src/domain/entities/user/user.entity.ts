import { DomainError } from "../../errors";
// import { FullName } from "../../value-object";
import { BaseEntity, BaseEntityOptions } from "../shared/base.entity";

export enum Role {
    ADMIN_SYSTEM = 'Administrador del Sistema',
    USER = 'Usuario',
    VIGILANT = 'Vigilante',
    ADMIN = 'Administrador',
    DIRECTOR = 'Director',
    RRHH = 'Jefe de Recursos Humanos'
}

export interface UserEntityOptions extends BaseEntityOptions {
    firstname: string;
    middlename?: string;
    fatherlastname: string;
    motherlastname: string;
    username: string;
    password: string;
    role: Role;
}

export class UserEntity extends BaseEntity {
    public readonly firstname: string;
    public readonly middlename?: string;
    public readonly motherlastname: string;
    public readonly fatherlastname: string;
    // public readonly fullName: FullName;
    public readonly username: string;
    private readonly _password: string;
    public readonly role: Role;

    constructor(options: UserEntityOptions) {
        super(options);

        // this.fullName = new FullName(options.firstname, options.fatherlastname, options.motherlastname, options.middlename);
        this.validateOptions(options);
        this.validateUsername(options.username);
        this.validateRole(options.role);
        
        const { firstname, middlename, fatherlastname, motherlastname, username, password, role } = options;
        
        this.firstname = firstname.trim();
        this.middlename = middlename ? middlename.trim() : undefined;
        this.motherlastname = motherlastname.trim();
        this.fatherlastname = fatherlastname.trim();
        this.username = username.toLowerCase().trim();
        this._password = password;
        this.role = role;
    }

    private validateOptions(options: UserEntityOptions): void {
        if (!options.firstname?.trim()) throw new DomainError('FirstName is required');
        if (!options.fatherlastname?.trim()) throw new DomainError('Father Lastname is required');
        if (!options.motherlastname?.trim()) throw new DomainError('Mather Lastname is required');
        if (!options.password?.trim()) throw new DomainError('Password is required');
    }

    private validateUsername(username: string): void {
        const usernameRegex = /^[a-zA-Z0-9_]{4,20}$/;
        if (!usernameRegex.test(username)) throw new DomainError('Invalid username format.');
    }

    private validateRole(role: Role): void {
        if (!Object.keys(Role).includes(role)) throw new DomainError(`Invalid role: ${role}`);
    }

    // public getFullName(): string {
    //     return this.fullName.getFullName();
    // }

    public getPassword(): string {
        return this._password;
    }

    public toJson(): string {
        return JSON.stringify(this.toObject());
    }

    public toObject(includePassword = false): { [key: string]: any } {
        const baseObject: { [key: string]: any } = {
            ...super.toBaseObject(),
            firstname: this.firstname,
            middlename: this.middlename,
            fatherlastname: this.fatherlastname,
            motherlastname: this.motherlastname,
            username: this.username,
            role: this.role,
        };

        if (includePassword) {
            baseObject.password = this._password;
        }
        
        return baseObject;
    }

    static fromJson(json: string): UserEntity {
        try {
            const object = JSON.parse(json || '{}');
            return UserEntity.fromObject(object);
        } catch (error) {
            throw new Error('Invalid JSON format.');
        }
    }

    static fromObject(object: Partial<UserEntityOptions>): UserEntity {
        const { firstname = '', middlename, fatherlastname = '', motherlastname = '', username = '', password = '', role = Role.USER, createdAt, updatedAt, deletedAt, createdBy, updatedBy, deletedBy} = object;
        if (!firstname || !fatherlastname || !motherlastname) {
            throw new DomainError('Missing required user details.');
        }        
        return new UserEntity({
            firstname, 
            middlename,
            fatherlastname, 
            motherlastname, 
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
    }
}

