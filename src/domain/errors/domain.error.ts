export class DomainError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DomainError';
    }
}

export class RequiredFieldError extends DomainError {
    constructor(field: string) {
        super(`${field} is required.`);
        this.name = 'RequiredFieldError';
    }
}

export class InvalidUsernameError extends DomainError {
    constructor() {
        super('Invalid username format.');
        this.name = 'InvalidUsernameError';
    }
}

export class InvalidRoleError extends DomainError {
    constructor(role: string) {
        super(`Invalid role: ${role}`);
        this.name = 'InvalidRoleError';
    }
}