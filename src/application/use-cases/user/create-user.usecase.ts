import { CustomError, UserEntity, UserRepository } from "../../../domain";
import { CreateUserDto } from "../../dto";

export class CreateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ) {}

    public async execute(dto: CreateUserDto): Promise<UserEntity> {
        try {
            const user = new UserEntity({
                ...dto
            });
            return this.userRepository.create(user);
        } catch (error) {
            throw CustomError.badRequest(`${error}`); 
        }
    }
}