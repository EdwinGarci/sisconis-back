import { UserEntity, UserRepository } from "../../../domain";
import { CreateUserDto } from "../../dto";
import { ApplicationError } from "../../errors";

export class CreateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ) {}

    public async execute(dto: CreateUserDto): Promise<UserEntity> {
        try {
            const user = new UserEntity({
                ...dto
            });
            return await this.userRepository.create(user);
        } catch (error) {
            throw new ApplicationError(`${error}`); 
        }
    }
}