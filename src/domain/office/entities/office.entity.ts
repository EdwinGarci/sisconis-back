export interface OfficeEntityOptions {
    id: number;
    name: string;
}

export class OfficeEntity {
    public readonly id: number;
    public readonly name: string;

    private constructor(options: OfficeEntityOptions) {
        this.id = options.id;
        this.name = options.name;
    }

    public static create(options: OfficeEntityOptions): OfficeEntity {
        return new OfficeEntity(options);
    }
}
