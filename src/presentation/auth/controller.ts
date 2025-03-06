import { LoginUseCase } from "../../application";
import { CustomError } from "../../infrastructure";
import { LoginDto } from "./dto/login.dto";

export class LoginController {
    constructor(
        private readonly loginUseCase: LoginUseCase,
        // private readonly logoutUseCase: LogoutUseCase
    ) {}

    public login = async(req: any, res:any): Promise<void> => {
        try {
            const loginDto = LoginDto.create(req.body);

            const result = await this.loginUseCase.execute(loginDto);

            res.status(200).json(result);
        } catch (error) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    public logout = async(req: any, res:any): Promise<void> => {
        try {
            
        } catch (error) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
}