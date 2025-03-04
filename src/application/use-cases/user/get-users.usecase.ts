import { UserRepository } from "../../../domain";
import { PaginationDto } from "../../dto";

export interface GetUsersUseCase {
    execute(filters?: PaginationDto): Promise<{ users: any[]; nextCursor?: string; total?: number }>;
}

export class GetUsersUseCase implements GetUsersUseCase {
    constructor(
        private readonly repository: UserRepository,
    ) {}

    async execute(filters?: PaginationDto): Promise<{ users: any[]; nextCursor?: string; total?: number }> {
        const result = await this.repository.findAll(filters);
        return {
            users: result.users.map(user => user.toObject(false)),
            nextCursor: result.nextCursor,
            total: result.total,
        }
    }

}