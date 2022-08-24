/**
 * Class corresponding to a known error
 * Used to determine difference between technical errors and business errors
 */
class ShineError extends Error {
  readonly code: string;

  readonly message: string;

  readonly payload: object;

  constructor(code: string, message: string, payload = {}) {
    super();

    this.code = code;
    this.message = message;
    this.payload = { ...payload };
  }
}

export default ShineError;
