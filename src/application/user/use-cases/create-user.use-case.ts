import { UserEntity } from '@domain/user/entities/user.entity';
import { CreateUserInput } from '../dto/create-user.input';
import { UserRepository } from '@domain/user/repositories/user.repository';
import { UserAlreadyExistsError } from '@domain/user/errors/user.errors';
import { Result } from '@shared/core/result';

export type CreateUserResult = Result<UserEntity, UserAlreadyExistsError>;

export class CreateUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(input: CreateUserInput): Promise<CreateUserResult> {
        const user = UserEntity.create({
            ...input,
            id: Date.now(), // Generate a temporary ID
        });

        if (user.isFailure) {
            return user;
        }

        await this.userRepository.create(user.value);

        return user;
    }
}
