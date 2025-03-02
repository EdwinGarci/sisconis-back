import { ApplicationError, RequiredFieldApplicationError } from "../../errors";
import { applicationFailure, ApplicationResult, applicationSuccess } from "../shared";

export class LoginDto {
    private constructor(
        public readonly username: string,
        public readonly password: string,
    ) {}

    static create(object: { [key: string]: any }): ApplicationResult<LoginDto> {
        const { username, password } = object;
        
        if (!username?.trim()) {
            return applicationFailure(new RequiredFieldApplicationError("Username"));
        }
        if (!password?.trim()) {
            return applicationFailure(new RequiredFieldApplicationError("Password"));
        }
        if (password.length < 6) {
            return applicationFailure(new ApplicationError("Password must be at least 6 characters long."));
        }

        return applicationSuccess(
            new LoginDto(
                username.trim(),
                password
            )
        );
    }
}