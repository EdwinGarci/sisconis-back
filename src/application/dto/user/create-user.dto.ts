import { Role } from "../../../domain";
import { ApplicationError } from "../../errors";

export class CreateUserDto {
    private constructor(
        public readonly firstname: string,
        public readonly fatherlastname: string,
        public readonly motherlastname: string,
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
        const { firstname, middlename, fatherlastname, motherlastname, username, password, role, createdAt, updatedAt, deletedAt, createdBy, updatedBy, deletedBy } = object;

        if (!firstname?.trim()) {
            throw new ApplicationError('Firstname is required.');
        }
        if (!fatherlastname?.trim()) {
            throw new ApplicationError('Father lastname is required.');
        }
        if (!motherlastname?.trim()) {
            throw new ApplicationError('Mother lastname is required.');
        }
        if (!username?.trim()) {
            throw new ApplicationError('Username is required.');
        }
        if (!password?.trim()) {
            throw new ApplicationError('Password is required.');
        }
        if (password.length < 6) {
            throw new ApplicationError('Password must be at least 6 characters long.');
        }
        if (!role) {
            throw new ApplicationError('Role is required.');
        }

        return new CreateUserDto(
            firstname.trim(), 
            middlename?.trim(), 
            fatherlastname.trim(), 
            motherlastname.trim(), 
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

