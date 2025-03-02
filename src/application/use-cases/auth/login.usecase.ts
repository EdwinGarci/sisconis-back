import { UserRepository } from "../../../domain";
import { ApplicationError } from "../../errors";

export interface LoginUseCase {
    execute(dto: { [key: string]: any }): Promise<any>;
}

export class LoginUseCase implements LoginUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ) {}

    public async execute(dto: { [key: string]: any; }): Promise<any> {
        try {
            // const user = await this.userRepository.findByUsername();
        } catch (error) {
            throw error instanceof ApplicationError ? error : new ApplicationError(`Error login: ${error}`);
        }
    }
}