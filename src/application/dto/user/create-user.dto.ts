import { Role } from "../../../domain";
import { ApplicationError, RequiredFieldApplicationError } from "../../errors";
import { ApplicationResult, applicationFailure, applicationSuccess } from "../shared";

export class CreateUserDto {
    private constructor(
        public readonly firstname: string,
        public readonly fatherlastname: string,
        public readonly motherlastname: string,
        public readonly username: string,
        public readonly password: string,
        public readonly role: Role,
        public readonly middlename?: string,
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date,
        public readonly deletedAt?: Date,
        public readonly createdBy?: string,
        public readonly updatedBy?: string,
        public readonly deletedBy?: string,
    ) {}

    static create(object: { [key: string]: any }): ApplicationResult<CreateUserDto> {
        const { firstname, middlename, fatherlastname, motherlastname, username, password, role, createdAt, updatedAt, deletedAt, createdBy, updatedBy, deletedBy } = object;

        if (!firstname?.trim()) {
            return applicationFailure(new RequiredFieldApplicationError("Firstname"));
        }
        if (!fatherlastname?.trim()) {
            return applicationFailure(new RequiredFieldApplicationError("Father lastname"));
        }
        if (!motherlastname?.trim()) {
            return applicationFailure(new RequiredFieldApplicationError("Mother lastname"));
        }
        if (!username?.trim()) {
            return applicationFailure(new RequiredFieldApplicationError("Username"));
        }
        if (!password?.trim()) {
            return applicationFailure(new RequiredFieldApplicationError("Password"));
        }
        if (password.length < 6) {
            return applicationFailure(new ApplicationError("Password must be at least 6 characters long."));
        }
        if (!role) {
            return applicationFailure(new RequiredFieldApplicationError("Role"));
        }

        return applicationSuccess(
            new CreateUserDto(
                firstname.trim(),
                fatherlastname.trim(),
                motherlastname.trim(),
                username.trim(),
                password,
                role,
                middlename?.trim(),
                createdAt,
                updatedAt,
                deletedAt,
                createdBy,
                updatedBy,
                deletedBy
            )
        );
    }
}
