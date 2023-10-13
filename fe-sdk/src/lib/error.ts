/**
 * Every error thrown in the SDK is an instance of 'SdkError'. The value of the 'code' property is eligible to
 * translate the error into an error message.
 *
 * @extends {Error}
 * @category SDK
 * @subcategory Errors
 * @param code {string} - An error code that refers to the error instance.
 * @param cause {Error=} - The original error
 */
abstract class SdkError extends Error {
     code: string;
     cause?: Error;

     // eslint-disable-next-line require-jsdoc
     protected constructor(message: string, code: string, cause?: Error) {
          super(message);
          /**
           * @public
           * @type {string}
           */
          this.code = code;
          /**
           * @public
           * @type {Error=}
           */
          this.cause = cause;
          Object.setPrototypeOf(this, SdkError.prototype);
     }
}

/**
 * Every error that doesn't need to be handled in a special way is a 'TechnicalError'. Whenever you catch one, there is
 * usually nothing you can do but present an error to the user, e.g. "Something went wrong".
 *
 * @category SDK
 * @subcategory Errors
 * @extends {NfdError}
 */
class TechnicalError extends SdkError {
     // eslint-disable-next-line require-jsdoc
     constructor(cause?: Error) {
          super("Technical error", "SOMETHING_WENT_WRONG", cause);
          Object.setPrototypeOf(this, TechnicalError.prototype);
     }
}

/**
 * A 'NotFoundError' occurs when the requested resource was not found.
 *
 * @category SDK
 * @subcategory Errors
 * @extends {SdkError}
 */
class NotFoundError extends SdkError {
     // eslint-disable-next-line require-jsdoc
     constructor(cause?: Error) {
          super("Not found error", "NOT_FOUND", cause);
          Object.setPrototypeOf(this, NotFoundError.prototype);
     }
}


/**
 * Attempting to create a resource that already exists results in a 'ConflictError'.
 *
 * @category SDK
 * @subcategory Errors
 * @extends {SdkError}
 */
class ConflictError extends SdkError {
     // eslint-disable-next-line require-jsdoc
     constructor(userId?: string, cause?: Error) {
          super("Conflict error", "CONFLICT", cause);
          Object.setPrototypeOf(this, ConflictError.prototype);
     }
}

/**
 * An 'UnauthorizedError' occurs when the user is not authorized to access the resource.
 *
 * @category SDK
 * @subcategory Errors
 * @extends {SdkError}
 */
class UnauthorizedError extends SdkError {
     // eslint-disable-next-line require-jsdoc
     constructor(cause?: Error) {
          super("Unauthorized error", "UNAUTHORIZED", cause);
          Object.setPrototypeOf(this, UnauthorizedError.prototype);
     }
}

/**
 * A 'ForbiddenError' occurs when the user is not allowed to perform the requested action.
 *
 * @category SDK
 * @subcategory Errors
 * @extends {SdkError}
 */
class ForbiddenError extends SdkError {
     // eslint-disable-next-line require-jsdoc
     constructor(cause?: Error) {
          super("Forbidden error", "FORBIDDEN", cause);
          Object.setPrototypeOf(this, ForbiddenError.prototype);
     }
}
export {
     SdkError,
     TechnicalError,
     ConflictError,
     NotFoundError,
     UnauthorizedError,
     ForbiddenError
}