'use strict';

type CustomMethodsConstraint = { [key: string]: string; };

/**
 * Comply with [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110#methods)
 */
export enum EHTTPMethods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH',
    OPTIONS = 'OPTIONS',
    HEAD = 'HEAD',
    TRACE = 'TRACE',
}

export default class HTTPMethodsConvenience<GCustomMethods extends CustomMethodsConstraint = {}> {

    private valid: EHTTPMethods | GCustomMethods;

    /**
     * The class instance allows to work with custom HTTP methods you define.
     * 
     * NB: Use statics for standard HTTP methods. Create the instance to use custom HTTP methods.
     * 
     * @example
     * ```typescript
     * // Work with standard HTTP methods via static class.
     * console.log(HTTPMethodsConvenience.isValid('GET')); // true;
     * 
     * // Add custom HTTP methods at instantiation and work with them via the instance. 
     * const httpMethodsConvenience = new HTTPMethodsConvenience({ LINK: 'LINK', UNLINK: 'UNLINK' });
     * console.log(HTTPMethodsConvenience.isValid(['LINK', 'GET'])); // true;
     * ```
     */
    constructor(customMethods: GCustomMethods) {
        this.valid = { ...EHTTPMethods, ...customMethods };
    }

    /**
     * Checks if the given method or array of methods is valid.
     * 
     * Delegates to {@link HTTPMethodsConvenience._isValid}
     */
    public static isValid(maybeMethod: string | string[]): boolean {
        return HTTPMethodsConvenience._isValid(maybeMethod, EHTTPMethods);
    }

    public static isAllowed(given: EHTTPMethods, allowed: [EHTTPMethods], shouldThrow: boolean = false): boolean {
        // WRITE: implement this method
        // throw if !isValid && shouldThrow
        return false;
    }

    public static normalize(maybeMethod: string): EHTTPMethods {
        // WRITE: implement this method

        // throw if !isValid
        // normalize to UpperCase
        return '' as any;
    }

    // WARNING: --- Here come instance methods.

    public isValid(maybeMethod: string | string[]): boolean {
        return HTTPMethodsConvenience._isValid(maybeMethod, this.valid);
    }

    public normalize(maybeMethod: string): EHTTPMethods | GCustomMethods {
        // WRITE: implement this method calling the static normalize method.
        // throw if not in enum
        // normalize to UpperCase
        return '' as any;
    }

    // WRITE: polymorphic method to check if verb or array of methods is allowed.
    public isAllowed(methods: EHTTPMethods, allowed: [EHTTPMethods | GCustomMethods]): boolean {
        // WRITE: implement this method calling the static normalize method.
        return false;
    }

    /**
     * Decide if the given method(s) are valid.
     * 
     * A delegate to process either standard HTTP methods or custom methods.
     * 
     * @template GCustomMethods Forced to repeat same {@link GCustomMethods} generic as 
     * in {@link HTTPMethodsConvenience} due to inability to share the generic defined in
     * the class instance.
     * 
     * @param {(string | string[])} maybeMethod
     * @param {EHTTPMethods | GCustomMethods} expected The standard HTTP methods enum or optionally
     * its union with a custom methods object.
     * 
     * @return {boolean} Whether the given `maybeMethod` method(s) are valid.
     */
    private static _isValid<GCustomMethods extends CustomMethodsConstraint = {}>(maybeMethod: string | string[], expected: EHTTPMethods | GCustomMethods): boolean {
        const given = HTTPMethodsConvenience._given(maybeMethod);
        return HTTPMethodsConvenience._isAllowed(given, expected);
    }

    private static _isAllowed<GCustomMethods extends CustomMethodsConstraint = {}>(givens: string[], expected: EHTTPMethods | GCustomMethods): boolean {
        // NB: Translate standard `EHTTPMethods` enum and `GCustomMethods` object to array of values.
        const _methods = Object.values(expected);

        return givens.every((given: string) => { return _methods.includes(given.toUpperCase()); });
    }

    /**
     * Standardize given method(s) input to array.
     */
    private static _given(maybeMethod: string | string[]): string[] {
        return Array.isArray(maybeMethod) ? maybeMethod : [maybeMethod];
    }

}



