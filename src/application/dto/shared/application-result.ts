import { Result } from '../../../domain';
import { ApplicationError } from '../../errors';

export type ApplicationResult<T> = Result<T, ApplicationError>;

export const applicationSuccess = <T>(value: T): ApplicationResult<T> => {
    return Result.success<T, ApplicationError>(value);
};

export const applicationFailure = <T>(error: ApplicationError): ApplicationResult<T> => {
    return Result.failure<T, ApplicationError>(error);
};