import { RequiredFieldError  } from "../errors";
import { DomainResult, domainSuccess, domainFailure } from "../shared";

export class FullName {
    private constructor(
        public readonly firstname: string,
        public readonly fatherlastname: string,
        public readonly motherlastname: string,
        public readonly middlename?: string
    ) {}

    public static create(firstname: string, fatherlastname: string, motherlastname: string, middlename?: string): DomainResult<FullName> {
        if (!firstname?.trim()) {
            return domainFailure(new RequiredFieldError("First Name"));
        }

        if (!fatherlastname?.trim()) {
            return domainFailure(new RequiredFieldError("Father's Last Name"));
        }

        if (!motherlastname?.trim()) {
            return domainFailure(new RequiredFieldError("Mother's Last Name"));
        }

        return domainSuccess(
            new FullName(
                firstname.trim(),
                fatherlastname.trim(),
                motherlastname.trim(),
                middlename?.trim()
            )
        );
    }

    public getFullName(): string {
        return [this.firstname, this.middlename, this.fatherlastname, this.motherlastname]
            .filter(Boolean)
            .join(" ");
    }
}
