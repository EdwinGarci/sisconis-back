import { UserEntity, UserRepository } from "../../../domain";
import { PaginationDto } from "../../dto";

export interface GetUsersUseCase {
    execute(filters?: PaginationDto): Promise<{ users: UserEntity[]; nextCursor?: string; total?: number }>;
}

export class GetUsers implements GetUsersUseCase {
    constructor(
        private readonly repository: UserRepository,
    ) {}

    async execute(filters?: PaginationDto): Promise<{ users: UserEntity[]; nextCursor?: string; total?: number }> {
        return this.repository.findAll(filters);
    }

}