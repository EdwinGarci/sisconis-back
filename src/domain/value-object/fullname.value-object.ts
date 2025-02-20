import { DomainError } from "../errors";

export class FullName {
    public readonly firstname: string;
    public readonly middlename?: string;
    public readonly fatherlastname: string;
    public readonly motherlastname: string;

    constructor(firstname: string, fatherlastname: string, motherlastname: string, middlename?: string) {
        if (!firstname.trim() || !fatherlastname.trim() || !motherlastname.trim()) {
            throw new DomainError('All name fields are required.');
        }
        this.firstname = firstname.trim();
        this.middlename = middlename?.trim();
        this.fatherlastname = fatherlastname.trim();
        this.motherlastname = motherlastname.trim();
    }

    public getFullName(): string {
        const names = [this.firstname, this.middlename, this.fatherlastname, this.motherlastname].filter(Boolean);
        return names.join(' ');
    }
}
