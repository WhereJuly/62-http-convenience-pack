'use strict';

/**
 * HTTP Convenience Pack custom exception.
 * 
 * @group Convenience
 * @category Exceptions
 */
export default class HTTPConveniencePackException extends Error {

    #originalError: Error | undefined;

    constructor(message: string, originalError?: Error) {
        const originalMessage = originalError ? ` (original message: ${originalError.message})` : '';

        super(`${message}${originalMessage}`);

        this.name = this.constructor.name;
        this.#originalError = originalError;

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, HTTPConveniencePackException);
        }
    }

    // NB: Not sure if it is used somewhere, will keep for debugging purposes.
    public get originalError(): Error | undefined {
        return this.#originalError;
    }

}