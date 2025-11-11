export class UserError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'UserError';
    }
}

export class InvalidUsernameError extends UserError {
    constructor() {
        super('El nombre de usuario debe contener entre 3 y 20 caracteres alfanuméricos');
    }
}

export class InvalidNameError extends UserError {
    constructor() {
        super('El nombre debe contener entre 2 y 50 caracteres');
    }
}

export class InvalidLastNameError extends UserError {
    constructor() {
        super('El apellido debe contener entre 2 y 50 caracteres');
    }
}

export class InvalidDocumentNumberError extends UserError {
    constructor() {
        super('El número de documento debe contener entre 8 y 12 dígitos');
    }
}

export class InvalidPasswordError extends UserError {
    constructor() {
        super('La contraseña debe contener al menos 8 caracteres, incluyendo letras y números');
    }
}

export class UserAlreadyExistsError extends UserError {
    constructor() {
        super('El usuario ya existe');
    }
}
