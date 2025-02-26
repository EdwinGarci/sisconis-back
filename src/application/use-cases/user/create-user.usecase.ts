import { UserEntity, UserRepository } from "../../../domain";
import { CreateUserDto } from "../../dto";
import { applicationFailure, applicationSuccess } from "../../dto/shared";
import { ApplicationError } from "../../errors";

export class CreateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ) {}

    public async execute(dto: { [key: string]: any }) {
        try {
            // 1️⃣ Validamos el DTO antes de usarlo
            const dtoResult = CreateUserDto.create(dto);
            if (!dtoResult.isSuccess || !dtoResult.value) {
                return applicationFailure(dtoResult.error ?? new ApplicationError("Invalid DTO"));
            }
            const validDto = dtoResult.value;

            // 2️⃣ Creamos la entidad de dominio validando errores
            const userResult = UserEntity.create(validDto);
            if (!userResult.isSuccess || !userResult.value) {
                return applicationFailure(userResult.error ?? new ApplicationError("Invalid User Entity"));
            }
            const user = userResult.value;

            // 3️⃣ Guardamos el usuario en el repositorio
            const createdUser = await this.userRepository.create(user);
            return applicationSuccess(createdUser.toObject(false)); 
        } catch (error) {
            throw new ApplicationError(`${error}`);
        }
    }
}
