import { UserEntity } from '@domain/user/entities/user.entity';
import { CreateUserInput } from '../dto/create-user.input';
import { UserRepository } from '@domain/user/repositories/user.repository';
import { UserAlreadyExistsError } from '@domain/user/errors/user.errors';
import { Either, left, right } from '@shared/core/either';

export type CreateUserResult = Either<UserAlreadyExistsError, UserEntity>;

export class CreateUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(input: CreateUserInput): Promise<CreateUserResult> {
        const user = UserEntity.create(input);

        if (user.isFailure) {
            return left(user.value);
        }

        await this.userRepository.create(user.value);

        return right(user.value);
    }
}
