import { CustomError } from "../../../infrastructure";

export class PaginationRequestDto {
    private constructor(
        public readonly limit: number,
        public readonly page?: number,
        public readonly cursor?: string,
        public readonly offset?: number
    ) { }

    static create(query: { [key: string]: any }): PaginationRequestDto {
        let limit = Number(query.limit) || 5;
        let page = query.page !== undefined ? Number(query.page) : undefined;
        let cursor = query.cursor || undefined;
        let offset = query.offset !== undefined ? Number(query.offset) : page !== undefined ? (page - 1) * limit : undefined;

        if (isNaN(limit) || limit <= 0) {
            throw CustomError.badRequest('Limit must be a positive number.');
        }
        if (page !== undefined && (isNaN(page) || page < 1)) {
            throw CustomError.badRequest('Page must be a positive integer.');
        }
        if (offset !== undefined && (isNaN(offset) || offset < 0)) {
            throw CustomError.badRequest('Offset must be a non-negative number.');
        }

        if (cursor !== undefined && offset !== undefined) {
            throw CustomError.badRequest('Cannot use both cursor and offset pagination.');
        }

        return new PaginationRequestDto(limit, page, cursor, offset);
    }
}
