import { v4 as uuidv4 } from 'uuid';

export interface IUuidGenerator {
    generate(): string;
}

export class UuidGenerator implements IUuidGenerator {
    generate(): string {
        return uuidv4();
    }
}
