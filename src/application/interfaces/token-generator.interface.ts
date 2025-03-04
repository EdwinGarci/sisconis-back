export interface TokenGenerator {
    generateToken(payload: any, duration?: string): Promise<string>;
    validateToken<T>(token: string): Promise<T | null>;
}