import { Role } from "../../../domain";
import { CustomError } from "../../../infrastructure";

export class CreateUserDto {
    private constructor(
        public readonly firstname: string,
        public readonly fatherlastname: string,
        public readonly matherlastname: string,
        public readonly username: string,
        public readonly password: string,
        public readonly role: Role,
        public readonly middlename?: string,
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date,
        public readonly deletedAt?: Date,
        public readonly createdBy?: string,
        public readonly updatedBy?: string,
        public readonly deletedBy?: string,
    ) { }

    static create(object: { [key: string]: any }): CreateUserDto {
        const { firstname, middlename, fatherlastname, matherlastname, username, password, role, createdAt, updatedAt, deletedAt, createdBy, updatedBy, deletedBy } = object;

        if (!firstname?.trim()) {
            throw CustomError.badRequest('Firstname is required.');
        }
        if (!fatherlastname?.trim()) {
            throw CustomError.badRequest('Father lastname is required.');
        }
        if (!matherlastname?.trim()) {
            throw CustomError.badRequest('Mother lastname is required.');
        }
        if (!username?.trim()) {
            throw CustomError.badRequest('Username is required.');
        }
        if (!password?.trim()) {
            throw CustomError.badRequest('Password is required.');
        }
        if (password.length < 6) {
            throw CustomError.badRequest('Password must be at least 6 characters long.');
        }
        if (!role) {
            throw CustomError.badRequest('Role is required.');
        }

        return new CreateUserDto(
            firstname.trim(), 
            middlename?.trim(), 
            fatherlastname.trim(), 
            matherlastname.trim(), 
            username.trim(), 
            password, 
            role, 
            createdAt, 
            updatedAt, 
            deletedAt, 
            createdBy, 
            updatedBy, 
            deletedBy
        );
    }
}

