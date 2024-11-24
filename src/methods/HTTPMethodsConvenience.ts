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

    /**
     * Check if a given HTTP method is allowed based on a list of allowed methods.
     * 
     * @param {EHTTPMethods} given - see {@link HTTPMethodsConvenience._isAllowed}.
     * @param {EHTTPMethods[]} [allowed] - An optional array of allowed HTTP methods. 
     * If not provided, defaults to all standard HTTP methods.
     * 
     * With `allowed` undefined it is convenient to replace additional `isValid` method call
     * as it basically resorts to checking the same result.
     * 
     * NB: Describe the use case in the documentation.
     * 
     * @returns {boolean} `true` if the given method is in the list of allowed methods, otherwise `false`.
     */
    public static isAllowed(given: EHTTPMethods, allowed?: EHTTPMethods[]): boolean {
        const _allowed = allowed ?? HTTPMethodsConvenience.toValues();
        
        return HTTPMethodsConvenience._isAllowed([given], _allowed);
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

    /**
     * Check if a given HTTP method is allowed based on a list of allowed methods.
     * 
     * @param {EHTTPMethods} given - see {@link HTTPMethodsConvenience._isAllowed}.
     * @param {EHTTPMethods[]} [allowed] - see {@link HTTPMethodsConvenience.isAllowed}. 
     * 
     * @description Delegates to {@link HTTPMethodsConvenience._isAllowed}
     */
    public isAllowed(given: EHTTPMethods, allowed?: EHTTPMethods[] | GCustomMethods[]): boolean {
        const _allowed = allowed ?? this.toValues();
        
        return HTTPMethodsConvenience._isAllowed([given], _allowed);
    }

    public normalize(maybeMethod: string): EHTTPMethods | GCustomMethods {
        // WRITE: implement this method calling the static normalize method.
        // throw if not in enum
        // normalize to UpperCase
        return '' as any;
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
     * Check if the given HTTP method(s) are valid.
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
        return HTTPMethodsConvenience._isAllowed(given, Object.values(expected) as EHTTPMethods[] | GCustomMethods[]);
    }

    /**
     * Check if a given HTTP method is allowed based on a list of allowed methods.
     *
     * @param {EHTTPMethods} given - The HTTP method to check.
     * @param {EHTTPMethods[]} [allowed] - An array of allowed HTTP methods. 
     * 
     * @returns {boolean} `true` if the given method is in the list of allowed methods, otherwise `false`.
     */    
    private static _isAllowed<GCustomMethods extends TCustomHTTPMethodsConstraint = {}>(givens: string[], allowed: EHTTPMethods[] | GCustomMethods[]): boolean {
        // NB: Translate standard `EHTTPMethods` enum and `GCustomMethods` object to array of values.
        return givens.every((given: string) => { return allowed.includes(given.toUpperCase() as EHTTPMethods & GCustomMethods); });
    }

    /**
     * Standardize given method(s) input to array.
     */
    private static _given(maybeMethod: string | string[]): string[] {
        return Array.isArray(maybeMethod) ? maybeMethod : [maybeMethod];
    }

}



