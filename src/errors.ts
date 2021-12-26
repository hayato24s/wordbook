// 共通エラークラス
class BaseError extends Error {
  constructor(e?: string) {
    super(e);
    this.name = new.target.name;
  }
}

export class NotPermittedError extends BaseError {}
