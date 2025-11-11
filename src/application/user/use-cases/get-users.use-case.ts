import { UserEntity } from '@domain/user/entities/user.entity';
import { UserRepository } from '@domain/user/repositories/user.repository';

export class GetUsersUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(): Promise<UserEntity[]> {
        return this.userRepository.index();
    }
}
