import { UserEntity, UserRepository } from "../../../domain";
import { CreateUserDto } from "../../dto";
import { applicationFailure, applicationSuccess } from "../../dto/shared";
import { ApplicationError } from "../../errors";

export interface CreateUserUseCase {
    execute(dto: { [key: string]: any }): Promise<any>;
}

export class CreateUserUseCase implements CreateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ) {}

    public async execute(dto: { [key: string]: any }) {
        try {
            const dtoResult = CreateUserDto.create(dto);
            if (!dtoResult.isSuccess || !dtoResult.value) {
                return applicationFailure(dtoResult.error ?? new ApplicationError("Invalid DTO"));
            }
            const validDto = dtoResult.value;

            const userResult = UserEntity.create(validDto);
            if (!userResult.isSuccess || !userResult.value) {
                return applicationFailure(userResult.error ?? new ApplicationError("Invalid User Entity"));
            }
            const user = userResult.value;

            const createdUser = await this.userRepository.create(user);
            return applicationSuccess(createdUser.toObject(false)); 
        } catch (error) {
            throw error instanceof ApplicationError ? error : new ApplicationError(`Error creating user: ${error}`);
        }
    }
}
