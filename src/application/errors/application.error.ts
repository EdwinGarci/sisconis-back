export class ApplicationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ApplicationError';
    }
}

export class RequiredFieldApplicationError extends ApplicationError {
    constructor(field: string) {
        super(`${field} is required.`);
        this.name = "RequiredFieldApplicationError";
    }
}

export class InvalidUsernameApplicationError extends ApplicationError {
    constructor() {
        super("Invalid username format.");
        this.name = "InvalidUsernameApplicationError";
    }
}

export class InvalidRoleApplicationError extends ApplicationError {
    constructor(role: string) {
        super(`Invalid role: ${role}`);
        this.name = "InvalidRoleApplicationError";
    }
}
