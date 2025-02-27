import { Result } from "../../../domain";

export class PaginationDto {
    private constructor(
        public readonly limit: number,
        public readonly cursor?: string,
        public readonly offset?: number,
    ) {}

    static create(limit: number = 5, cursor?: string, offset?: number): Result<PaginationDto> {
        if (!Number.isInteger(limit) || limit < 1) 
            return Result.failure('Limit must be a positive integer');
        if (offset !== undefined && (!Number.isInteger(offset) || offset < 0))
            return Result.failure('Offset must be a non-negative integer');
        return Result.success(new PaginationDto(limit, cursor, offset));
    }
}
