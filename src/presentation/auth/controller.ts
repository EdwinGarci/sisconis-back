import { CustomError } from "../../infrastructure";

export class LoginController {
    constructor(
        // private readonly loginUseCase: LoginUseCase,
        // private readonly logoutUseCase: LogoutUseCase
    ) {}

    public login = async(req: any, res:any): Promise<void> => {
        try {
            console.log(`Hola Mundo`)
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