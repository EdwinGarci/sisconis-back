import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { PasswordComparer } from "../../application";

export class BcryptAdapter implements PasswordComparer {
    hash(password: string): string {
        const salt = genSaltSync();
        return hashSync(password, salt);
    }

    compare(password: string, hashed: string): boolean {
        return compareSync(password, hashed);
    }
}
