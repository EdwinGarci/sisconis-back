import { RequiredFieldError, InvalidUsernameError, InvalidRoleError } from "../../errors";
import { DomainResult, domainFailure, domainSuccess } from "../../shared";
import { FullName } from "../../value-object";
import { BaseEntity, BaseEntityOptions } from "../shared/base.entity";

export enum Role {
    ADMIN_SYSTEM = "Administrador del Sistema",
    USER = "Usuario",
    VIGILANT = "Vigilante",
    ADMIN = "Administrador",
    DIRECTOR = "Director",
    RRHH = "Jefe de Recursos Humanos",
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
    public readonly fullName: FullName;
    public readonly username: string;
    private readonly _password: string;
    public readonly role: Role;

    private constructor(options: UserEntityOptions, fullName: FullName) {
        super(options);
        this.fullName = fullName;
        this.username = options.username.toLowerCase().trim();
        this._password = options.password;
        this.role = options.role;
    }

    public static create(options: UserEntityOptions): DomainResult<UserEntity> {
        const fullNameResult = FullName.create(
            options.firstname,
            options.fatherlastname,
            options.motherlastname,
            options.middlename
        );

        if (!fullNameResult.isSuccess) {
            return domainFailure(fullNameResult.error!);
        }

        if (!options.password.trim()) {
            return domainFailure(new RequiredFieldError("Password"));
        }

        if (!UserEntity.isValidUsername(options.username)) {
            return domainFailure(new InvalidUsernameError());
        }

        if (!(options.role in Role)) {
            return domainFailure(new InvalidRoleError(options.role));
        }

        return domainSuccess(new UserEntity(options, fullNameResult.value!));
    }

    private static isValidUsername(username: string): boolean {
        const usernameRegex = /^[a-zA-Z0-9_]{4,20}$/;
        return usernameRegex.test(username);
    }

    public getFullName(): string {
        return this.fullName.getFullName();
    }

    public getPassword(): string {
        return this._password;
    }

    public toObject(includePassword = false): { [key: string]: any } {
        const baseObject: { [key: string]: any } = {
            firstname: this.fullName.firstname,
            middlename: this.fullName.middlename,
            fatherlastname: this.fullName.fatherlastname,
            motherlastname: this.fullName.motherlastname,
            fullName: this.getFullName(),
            username: this.username,
            role: this.role,
            ...super.toBaseObject(),
        };

        if (includePassword) {
            baseObject.password = this._password;
        }

        return baseObject;
    }

    public static fromObject(object: Partial<UserEntityOptions>): DomainResult<UserEntity> {
        const requiredFields = ["firstname", "fatherlastname", "motherlastname", "username", "password"];
        for (const field of requiredFields) {
            if (!object[field as keyof UserEntityOptions]) {
                return domainFailure(new RequiredFieldError(field));
            }
        }

        return UserEntity.create({
            id: object.id!,
            firstname: object.firstname!,
            middlename: object.middlename,
            fatherlastname: object.fatherlastname!,
            motherlastname: object.motherlastname!,
            username: object.username!,
            password: object.password!,
            role: object.role || Role.USER,
            createdAt: object.createdAt,
            updatedAt: object.updatedAt,
            deletedAt: object.deletedAt,
            createdBy: object.createdBy,
            updatedBy: object.updatedBy,
            deletedBy: object.deletedBy,
        });
    }
}
