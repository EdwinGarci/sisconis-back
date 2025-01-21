import { DomainError } from "../errors";

export class FullName {
    public readonly firstname: string;
    public readonly middlename?: string;
    public readonly fatherlastname: string;
    public readonly matherlastname: string;

    constructor(firstname: string, fatherlastname: string, matherlastname: string, middlename?: string) {
        if (!firstname.trim() || !fatherlastname.trim() || !matherlastname.trim()) {
            throw new DomainError('All name fields are required.');
        }
        this.firstname = firstname.trim();
        this.middlename = middlename?.trim();
        this.fatherlastname = fatherlastname.trim();
        this.matherlastname = matherlastname.trim();
    }

    public getFullName(): string {
        const names = [this.firstname, this.middlename, this.fatherlastname, this.matherlastname].filter(Boolean);
        return names.join(' ');
    }
}
