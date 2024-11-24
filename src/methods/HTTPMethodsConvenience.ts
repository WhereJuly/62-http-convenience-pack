'use strict';

type TCustomHTTPMethodsConstraint = { [key: string]: string; };

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

export default class HTTPMethodsConvenience<GCustomMethods extends TCustomHTTPMethodsConstraint = {}> {

    private valid: EHTTPMethods | GCustomMethods;

    /**
     * 
     * Statics methods allow working with standard HTTP methods.
     * The class instance allows to work with custom HTTP methods you define.
     * 
     * @example
     * ```typescript
     * // Work with standard HTTP methods via static class.
     * console.log(HTTPMethodsConvenience.isValid('GET')); // true;
     * 
     * // Add custom HTTP methods at instantiation and work with both standard and custom HTTP methods
     * // via the instance. 
     * const httpMethodsConvenience = new HTTPMethodsConvenience({ LINK: 'LINK', UNLINK: 'UNLINK' });
     * console.log(HTTPMethodsConvenience.isValid(['LINK', 'GET'])); // true;
     * ```
     */
    constructor(customMethods: GCustomMethods) {
        this.valid = { ...EHTTPMethods, ...customMethods };
    }

    /**
     * ---
     * IMPORTANT: Here come static methods to process standard HTTP methods.
     * --- 
     */

    /**
     * Retrieves the values of the standard HTTP methods.
     * 
     * @description Delegates to {@link HTTPMethodsConvenience._toValues}
     * 
     * @returns {EHTTPMethods[]} The array of EHTTPMethods enum values.
     */
    public static toValues(): EHTTPMethods[] {
        return HTTPMethodsConvenience._toValues(EHTTPMethods) as EHTTPMethods[];
    }

    /**
     * Check if the given standard HTTP method or array of methods is valid.
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

    /**
     * ---
     * IMPORTANT: Here come instance methods to process standard and custom HTTP methods.
     * --- 
     */

    /**
     * Retrieves the values of both standard and custom methods HTTP methods.
     * 
     * @description Delegates to {@link HTTPMethodsConvenience._toValues}
     * 
     * @returns {EHTTPMethods[] | GCustomMethods[]} An array containing the values of the HTTP methods.
     */
    public toValues(): EHTTPMethods[] | GCustomMethods[] {
        return HTTPMethodsConvenience._toValues(this.valid);
    }

    /**
     * Check if the given standard HTTP or custom method or array of methods is valid.
     * 
     * Delegates to {@link HTTPMethodsConvenience._isValid}
     */
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
     * Retrieves the values of the standard `EHTTPMethods` enum or `GCustomMethods` object.
     * 
     * @description A delegate to process either solely standard EHTTPMethods or including `GCustomMethods`.
     *
     * @template GCustomMethods - A generic type extending TCustomHTTPMethodsConstraint, representing custom HTTP methods.
     * @param {EHTTPMethods | GCustomMethods} methods - The standard HTTP methods enum or a custom methods object.
     * @returns {EHTTPMethods[] | GCustomMethods[]} An array containing the values of the provided HTTP methods.
     */
    private static _toValues<GCustomMethods extends TCustomHTTPMethodsConstraint = {}>(methods: EHTTPMethods | GCustomMethods): EHTTPMethods[] | GCustomMethods[] {
        return Object.values(methods) as EHTTPMethods[] | GCustomMethods[];
    }

    /**
     * ---
     * IMPORTANT: Here come private static methods that universally process both standard and custom HTTP methods.
     * --- 
     */

    /**
     * Check if the given method(s) are valid.
     * 
     * A delegate to process either solely standard EHTTPMethods or including `GCustomMethods`.
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
    private static _isValid<GCustomMethods extends TCustomHTTPMethodsConstraint = {}>(maybeMethod: string | string[], expected: EHTTPMethods | GCustomMethods): boolean {
        const given = HTTPMethodsConvenience._given(maybeMethod);
        return HTTPMethodsConvenience._isAllowed(given, expected);
    }

    private static _isAllowed<GCustomMethods extends TCustomHTTPMethodsConstraint = {}>(givens: string[], expected: EHTTPMethods | GCustomMethods): boolean {
        // NB: Translate standard `EHTTPMethods` enum and `GCustomMethods` object to array of values.
        const _methods = HTTPMethodsConvenience._toValues(expected);

        return givens.every((given: string) => { return _methods.includes(given.toUpperCase() as EHTTPMethods & GCustomMethods); });
    }

    /**
     * Standardize given method(s) input to array.
     */
    private static _given(maybeMethod: string | string[]): string[] {
        return Array.isArray(maybeMethod) ? maybeMethod : [maybeMethod];
    }

}



