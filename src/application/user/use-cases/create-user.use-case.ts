import { Either, left, right } from "../../shared/core/Either";
import { User } from "@domain/user/entities/user.entity";
import { CreateUserInput } from "../dto/create-user.input";
import { UserRepository } from "@domain/user/repositories/user.repository";
import { UserAlreadyExistsError } from "@domain/user/errors/user.errors";

export type CreateUserResult = Either<UserAlreadyExistsError, User>;

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async execute(input: CreateUserInput): Promise<CreateUserResult> {
    const existingUser = await this.userRepository.findByUsername(
      input.username
    );

    if (existingUser) {
      return left(new UserAlreadyExistsError());
    }

    const userOrError = User.create(input);

    if (userOrError.isFailure) {
      return left(userOrError.error);
    }

    await this.userRepository.create(userOrError.value);

    return right(userOrError.value);
  }
}
