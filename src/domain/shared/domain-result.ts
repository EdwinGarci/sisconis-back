import { Result } from './result';
import { DomainError } from '../errors';

export type DomainResult<T> = Result<T, DomainError>;

export const domainSuccess = <T>(value: T): DomainResult<T> => {
    return Result.success<T, DomainError>(value);
};

export const domainFailure = <T>(error: DomainError): DomainResult<T> => {
    return Result.failure<T, DomainError>(error);
};