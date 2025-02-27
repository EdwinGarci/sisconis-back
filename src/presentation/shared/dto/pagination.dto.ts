export class PaginationRequestDto {
    static fromRequest(req: any): { page?: number, limit: number, cursor?: string, offset?: number } {
        const limit = req.query.limit ? Number(req.query.limit) : 5;
        const cursor = req.query.cursor || undefined;
        const page = req.query.page ? Number(req.query.page) : undefined;
        const offset = req.query.offset !== undefined ? Number(req.query.offset) : page !== undefined ? (page - 1) * limit : undefined;

        return { page, limit, cursor, offset };
    }
}
