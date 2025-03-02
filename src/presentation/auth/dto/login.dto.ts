import { CustomError } from "../../../infrastructure";

export class LoginDto {
    private constructor(
        public readonly username: string,
        public readonly password: string,
    ) {}

    static create(object: { [key: string]: any }): LoginDto {
        const { username, password } = object;
        
        if (!username?.trim()) {
            throw CustomError.badRequest('Username is required.');
        }
        if (!password?.trim()) {
            throw CustomError.badRequest('Password is required.');
        }
        if (password.length < 6) {
            throw CustomError.badRequest('Password must be at least 6 characters long.');
        }

        return new LoginDto(
            username.trim(),
            password
        );
    }
}