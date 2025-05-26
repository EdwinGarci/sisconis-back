export abstract class Either<L, R> {
  abstract isLeft(): this is Left<L, R>;
  abstract isRight(): this is Right<L, R>;
  abstract getLeft(): L;
  abstract getRight(): R;
}

export class Left<L, R> extends Either<L, R> {
  constructor(private readonly value: L) {
    super();
  }

  isLeft(): this is Left<L, R> {
    return true;
  }
  isRight(): this is Right<L, R> {
    return false;
  }

  getLeft(): L {
    return this.value;
  }
  getRight(): R {
    throw new Error("Tried to getRight() from a Left");
  }
}

export class Right<L, R> extends Either<L, R> {
  constructor(private readonly value: R) {
    super();
  }

  isLeft(): this is Left<L, R> {
    return false;
  }
  isRight(): this is Right<L, R> {
    return true;
  }

  getLeft(): L {
    throw new Error("Tried to getLeft() from a Right");
  }
  getRight(): R {
    return this.value;
  }
}

export function left<L, R>(l: L): Either<L, R> {
  return new Left(l);
}

export function right<L, R>(r: R): Either<L, R> {
  return new Right(r);
}
