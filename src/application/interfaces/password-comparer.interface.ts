export interface PasswordComparer {
    compare(password: string, hashed: string): boolean;
}