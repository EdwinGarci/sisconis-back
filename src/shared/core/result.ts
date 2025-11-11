/**
 * Clase base para manejar resultados de operaciones con éxito o fallo
 * @template T Tipo del valor exitoso
 * @template E Tipo del error
 */
export class Result<T, E = string> {
    private readonly _isSuccess: boolean;
    private readonly _error?: E;
    private readonly _value?: T;

    /**
     * @private
     * @param isSuccess Indica si la operación fue exitosa
     * @param error Mensaje de error si la operación falló
     * @param value Valor de éxito si la operación fue exitosa
     */
    private constructor(isSuccess: boolean, error?: E, value?: T) {
        if (isSuccess && error) {
            throw new Error('InvalidOperation: A result cannot be successful and contain an error');
        }

        if (!isSuccess && !error) {
            throw new Error(
                'InvalidOperation: A result must contain either a success value or an error',
            );
        }

        this._isSuccess = isSuccess;
        this._error = error;
        this._value = value;

        Object.freeze(this);
    }

    /**
     * Obtiene el valor exitoso
     * @throws {Error} Si el resultado es un error
     */
    public getValue(): T {
        if (!this.isSuccess) {
            throw new Error('InvalidOperation: Cannot get the value of an error result');
        }

        return this._value as T;
    }

    /**
     * Obtiene el error
     * @throws {Error} Si el resultado es exitoso
     */
    public getError(): E {
        if (this.isSuccess) {
            throw new Error('InvalidOperation: Cannot get the error of a successful result');
        }

        return this._error as E;
    }

    /**
     * Crea un resultado exitoso
     * @param value Valor exitoso
     * @returns Resultado exitoso
     */
    public static ok<U, E>(value?: U): Result<U, E> {
        return new Result<U, E>(true, undefined, value);
    }

    /**
     * Crea un resultado de error
     * @param error Mensaje de error
     * @returns Resultado de error
     */
    public static fail<U, E>(error: E): Result<U, E> {
        return new Result<U, E>(false, error);
    }

    /**
     * Combina múltiples resultados
     * @param results Array de resultados a combinar
     * @returns Resultado combinado
     */
    public static combine<U, E>(results: Result<U, E>[]): Result<void, E> {
        for (const result of results) {
            if (result.isFailure) return Result.fail<void, E>(result.getError());
        }
        return Result.ok<void, E>();
    }

    /**
     * Mapea el valor exitoso
     * @param mapper Función de mapeo
     * @returns Nuevo Result con el valor mapeado
     */
    public map<U>(mapper: (value: T) => U): Result<U, E> {
        return this.isSuccess
            ? Result.ok<U, E>(mapper(this._value as T))
            : Result.fail<U, E>(this._error as E);
    }

    /**
     * Mapea el error
     * @param mapper Función de mapeo de error
     * @returns Nuevo Result con el error mapeado
     */
    public mapError<U>(mapper: (error: E) => U): Result<T, U> {
        return this.isFailure
            ? Result.fail<T, U>(mapper(this._error as E))
            : Result.ok<T, U>(this._value as T);
    }

    /**
     * Ejecuta una función si el resultado es exitoso
     * @param callback Función a ejecutar
     * @returns Nuevo Result
     */
    public onOk(callback: (value: T) => void): Result<T, E> {
        if (this.isSuccess) {
            callback(this._value as T);
        }
        return this;
    }

    /**
     * Ejecuta una función si el resultado es un error
     * @param callback Función a ejecutar
     * @returns Nuevo Result
     */
    public onError(callback: (error: E) => void): Result<T, E> {
        if (this.isFailure) {
            callback(this._error as E);
        }
        return this;
    }

    /**
     * Obtiene el valor o un valor por defecto si es un error
     * @param defaultValue Valor por defecto
     * @returns Valor exitoso o valor por defecto
     */
    public getOrElse(defaultValue: T): T {
        return this.isSuccess ? (this._value as T) : defaultValue;
    }

    /**
     * Obtiene el error o un error por defecto si es exitoso
     * @param defaultError Error por defecto
     * @returns Error o error por defecto
     */
    public getErrorOrElse(defaultError: E): E {
        return this.isFailure ? (this._error as E) : defaultError;
    }

    /**
     * Comprueba si el resultado es exitoso
     */
    public get isSuccess(): boolean {
        return this._isSuccess;
    }

    /**
     * Comprueba si el resultado es un error
     */
    public get isFailure(): boolean {
        return !this._isSuccess;
    }
}
