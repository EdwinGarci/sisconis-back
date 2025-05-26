import { OfficeEntity } from "../entities/office.entity";

export abstract class OfficeRepository {
    abstract findAll(): Promise<OfficeEntity[]>;
    abstract findById(id: number): Promise<OfficeEntity>;
    abstract create(office: OfficeEntity): Promise<OfficeEntity>;
    abstract update(office: OfficeEntity): Promise<OfficeEntity>;
    abstract delete(id: number): Promise<void>;
}