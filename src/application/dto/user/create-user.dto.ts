import { Role } from "../../../domain";

export class CreateUserDto {
    private constructor(
        public name: string,
        public lastname: string,
        public username: string,
        public password: string,
        public role: Role,
        public createdAt?: Date,
        public updatedAt?: Date,
        public deletedAt?: Date,
        public createdBy?: string,
        public updatedBy?: string,
        public deletedBy?: string,
    ) { }

    static create(object: { [key: string]: any }): { error?: string; data?: CreateUserDto } {
        const { name, lastname, username, password, role } = object;

        if (!name) return { error: 'Missing name' };
        if (!lastname) return { error: 'Missing lastname' };
        if (!username) return { error: 'Missing username' };
        if (!password) return { error: 'Missing password' };
        if (password.length < 6) return { error: 'Password must be at least 6 characters long' };
        if (!role) return { error: 'Missing role' };

        return { data: new CreateUserDto(name, lastname, username, password, role) };
    }
}

