import { UserRepository } from "../../../domain";
import { applicationFailure, applicationSuccess, LoginDto } from "../../dto";
import { ApplicationError } from "../../errors";
import { PasswordComparer, TokenGenerator } from "../../interfaces";

export interface LoginUseCase {
    execute(dto: { [key: string]: any }): Promise<any>;
}

export class LoginUseCase implements LoginUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly passwordComparer: PasswordComparer,
        private readonly tokenGenerator: TokenGenerator,
    ) {}

    public async execute(dto: { [key: string]: any; }): Promise<any> {
        try {
            const dtoResult = LoginDto.create(dto);
            if (!dtoResult.isSuccess || !dtoResult.value) {
                return applicationFailure(dtoResult.error ?? new ApplicationError("Invalid DTO"));
            }
            const validDto = dtoResult.value;

            const user = await this.userRepository.findByUsername(validDto.username);
            if (!user) {
                return applicationFailure(new ApplicationError("User not found"));
            }

            const isValidPassword = await this.passwordComparer.compare(validDto.password, user.getPassword());
            if (!isValidPassword) {
                return applicationFailure(new ApplicationError("Invalid credentials"));
            }

            const token = await this.tokenGenerator.generateToken({ id: user.getId(), username: user.username });
            return applicationSuccess({
                user: user.toObject(false),
                token
            });
        } catch (error) {
            throw error instanceof ApplicationError ? error : new ApplicationError(`Error login: ${error}`);
        }
    }
}