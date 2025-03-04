import jwt from 'jsonwebtoken';

export class JwtAdapter implements JwtAdapter {
    private secret: string;

    constructor(secret: string) {
        if (!secret) {
            throw new Error('JWT secret is required');
        }
        this.secret = secret;
    }

    async generateToken(payload: any, duration: string = '1h'): Promise<string> {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, this.secret, { expiresIn: duration }, (err, token) => {
                if (err) return reject(err);
                if (!token) return reject(new Error('Failed to generate token'));
                resolve(token);
            });
        });
    }

    async validateToken<T>(token: string): Promise<T | null> {
        return new Promise((resolve) => {
            jwt.verify(token, this.secret, (err, decoded) => {
                if (err) return resolve(null);
                resolve(decoded as T);
            });
        });
    }
}