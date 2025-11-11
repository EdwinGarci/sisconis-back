export interface CampEntityOptions {
    id: number;
    name: string;
}

export class CampEntity {
    public readonly id: number;
    public readonly name: string;

    private constructor(options: CampEntityOptions) {
        this.id = options.id;
        this.name = options.name;
    }

    public static create(options: CampEntityOptions): CampEntity {
        return new CampEntity(options);
    }
}
