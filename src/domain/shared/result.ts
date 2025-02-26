export class Result<T, E = string> {
    private constructor(
        public readonly isSuccess: boolean,
        public readonly value?: T,
        public readonly error?: E
    ) {}

    static success<T, E = string>(value: T): Result<T, E> {
        return new Result<T, E>(true, value);
    }

    static failure<T, E>(error: E): Result<T, E> {
        return new Result<T, E>(false, undefined, error);
    }
}
