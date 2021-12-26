// 共通エラークラス
class BaseError extends Error {
  constructor(e?: string) {
    super(e);
    this.name = new.target.name;
  }
}

export class UnauthorizedError extends BaseError {}

export class NotPermittedError extends BaseError {}

export class InternalServerError extends BaseError {}
