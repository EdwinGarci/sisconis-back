import { Result } from '../../shared/core/Result';
import { Either, left, right } from '../../shared/core/Either';
import { User } from '@domain/user/entities/user.entity';
import { UserRepository } from '@domain/user/repositories/user.repository';
import { UserResponseDTO } from '../dto/user.response.dto';

export type GetUsersUseCaseResult = Either<
  Error,
  Result<UserResponseDTO[]>
>;

export class GetUsersUseCase {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async execute(): Promise<GetUsersUseCaseResult> {
    try {
      const users = await this.userRepository.findAll();
      const userResponses = users.map(user => ({
        id: user.getId(),
        name: user.getName(),
        lastname: user.getLastname(),
        username: user.getUsername(),
        role: user.getRole()
      }));
      return right(Result.ok(userResponses));
    } catch (error) {
      return left(error);
    }
  }
}