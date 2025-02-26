import { Result } from "../../../domain";

export class PaginationDto {
    private constructor(
        public readonly page: number,
        public readonly limit: number,
    ) {}

    static create(page: number = 1, limit: number = 10): Result<PaginationDto> {
        if (!Number.isInteger(page) || page < 1) 
            return Result.failure('Page must be a positive integer');
        
        if (!Number.isInteger(limit) || limit < 1) 
            return Result.failure('Limit must be a positive integer');

        return Result.success(new PaginationDto(page, limit));
    }
}