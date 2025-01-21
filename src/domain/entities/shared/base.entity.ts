export interface BaseEntityOptions {
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    createdBy?: string;
    updatedBy?: string;
    deletedBy?: string;
}

export abstract class BaseEntity {
    public readonly createdAt: Date;
    public readonly updatedAt?: Date;
    public readonly deletedAt?: Date;
    public readonly createdBy?: string;
    public readonly updatedBy?: string;
    public readonly deletedBy?: string;

    constructor(options: BaseEntityOptions) {
        const { createdAt = new Date(), updatedAt, deletedAt, createdBy, updatedBy, deletedBy } = options;

        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.deletedBy = deletedBy;
    }

    public isActive(): boolean {
        return !this.deletedAt;
    }

    public toBaseObject(): { [key: string]: any } {
        return {
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            deletedAt: this.deletedAt,
            createdBy: this.createdBy,
            updatedBy: this.updatedBy,
            deletedBy: this.deletedBy,
        };
    }
}
