import { CreateUserUseCase } from "../../application";
import { CustomError } from "../../infrastructure";
import { CreateUserDto } from "./dto";

export class UserController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase
    ) {}

    public createUser = async(req: any, res:any): Promise<void> => {
        try {
            const createUserDto = CreateUserDto.create(req.body);
            
            const result = await this.createUserUseCase.execute(createUserDto);

            if (!result.isSuccess || !result.value) {
                return res.status(400).json({ error: `Failed to create user ${result.error}` });
            }

            const userResponse = result.value;
            
            res.status(201).json({message: 'User created successfully', user: userResponse});
        } catch (error) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
}