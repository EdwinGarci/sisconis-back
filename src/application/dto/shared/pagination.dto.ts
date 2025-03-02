import { ApplicationError } from "../../errors";
import { applicationFailure, ApplicationResult, applicationSuccess } from "./application-result";

export class PaginationDto {
    private constructor(
        public readonly limit: number,
        public readonly cursor?: string,
        public readonly offset?: number,
    ) {}

    static create(params: { limit?: number; cursor?: string; offset?: number } = {}): ApplicationResult<PaginationDto> {
        const { limit = 5, cursor, offset } = params;

        if (!Number.isInteger(limit) || limit < 1) 
            return applicationFailure(new ApplicationError('Limit must be a positive integer.'));
        
        if (offset !== undefined && (!Number.isInteger(offset) || offset < 0)) 
            return applicationFailure(new ApplicationError('Offset must be a non-negative integer.'));
        
        if (cursor !== undefined && typeof cursor !== 'string') 
            return applicationFailure(new ApplicationError('Cursor must be a valid string.'));

        return applicationSuccess(new PaginationDto(limit, cursor, offset));
    }
}
