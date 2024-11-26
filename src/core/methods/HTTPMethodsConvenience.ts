'use strict';

import HTTPConveniencePackException from '@src/exceptions/HTTPConveniencePack.exception.js';

export type TCustomHTTPMethodsConstraint = Record<string, string>;

/**
 * The standard HTTP methods enum.
 * 
 * Comply with [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110#methods)
 * published in June 2022.
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

/**
 * Provide convenient interface to work with  HTTP methods, standard {@link EHTTPMethods} 
 * and custom {@link GCustomMethods}.
 * 
 * Statics methods allow working with standard HTTP methods.
 * The class instance allows to work with custom HTTP methods you define.
 * 
 * 
 * @template GCustomMethods - A generic type extending TCustomHTTPMethodsConstraint, representing custom HTTP methods.
 * 
 * @example
 * 
 * Work with standard HTTP methods via static class.
 * 
 * ```typescript
 * console.log(HTTPMethodsConvenience.isValid('GET')); // true;
 * ```
 * @example
 * 
 * Add custom HTTP methods at instantiation and work with both standard and custom HTTP methods
 * via the instance. 
 * 
 * ```typescript
 * enum ECustomHTTPMethods { LINK = 'LINK', UNLINK = 'UNLINK' }
 * const ExtendedHTTPMethods = { ...EHTTPMethods, ...ECustomHTTPMethods }; 
 * 
 * // Will-provide-autocomplete for standard and custom HTTP methods -
 * console.log(ECustomHTTPMethods.LINK);
 * 
 * // Use the instance
 * const httpMethodsConvenience = new HTTPMethodsConvenience(ECustomHTTPMethods);
 * console.log(HTTPMethodsConvenience.isValid(['LINK', 'GET'])); // true;
 * ```
 */
export default class HTTPMethodsConvenience<GCustomMethods extends TCustomHTTPMethodsConstraint = Record<string, string>> {

    protected methods: EHTTPMethods | GCustomMethods;

    constructor(customMethods: GCustomMethods) {
        this.methods = { ...EHTTPMethods, ...customMethods };
    }

    /**
     * ---
     * IMPORTANT: Here come static methods to process standard HTTP methods.
     * --- 
     */

    /**
     * Retrieves the values of the standard HTTP methods.
     * 
     * @static
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
     * @static
     * @description Delegates to {@link HTTPMethodsConvenience._isValid}
     */
    public static isValid(maybeMethod: string | string[]): boolean {
        return HTTPMethodsConvenience._isValid(maybeMethod, EHTTPMethods);
    }

    /**
     * Check if a given HTTP method is allowed based on a list of allowed methods.
     * 
     * @static
     * 
     * @description Delegates to {@link HTTPMethodsConvenience._isAllowed}
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

    /**
     * Normalizes a given string to an uppercase standard or custom HTTP method.
     * 
     * @static
     * 
     * @description Delegates to {@link HTTPMethodsConvenience._normalize}
     * 
     * @param {unknown} maybeMethod - See {@link HTTPMethodsConvenience._normalize}
     * @returns {EHTTPMethods | GCustomMethods} See {@link HTTPMethodsConvenience._normalize}.
     * 
     * @throws {HTTPConveniencePackException} See {@link HTTPMethodsConvenience._normalize}
     */
    public static normalize(maybeMethod: string): EHTTPMethods {
        return HTTPMethodsConvenience._normalize(maybeMethod, EHTTPMethods) as EHTTPMethods;
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
        return HTTPMethodsConvenience._toValues(this.methods);
    }

    /**
     * Check if the given standard HTTP or custom method or array of methods is valid.
     * 
     * Delegates to {@link HTTPMethodsConvenience._isValid}
     */
    public isValid(maybeMethod: string | string[]): boolean {
        return HTTPMethodsConvenience._isValid(maybeMethod, this.methods);
    }

    /**
     * Check if a given HTTP method is allowed based on a list of allowed methods.
     * 
     * @description Delegates to {@link HTTPMethodsConvenience._isAllowed}
     * 
     * @param {EHTTPMethods} given - see {@link HTTPMethodsConvenience._isAllowed}.
     * @param {EHTTPMethods[]} [allowed] - see {@link HTTPMethodsConvenience.isAllowed}. 
     */
    public isAllowed(given: string, allowed?: EHTTPMethods[] | GCustomMethods[]): boolean {
        const _allowed = allowed ?? this.toValues();

        return HTTPMethodsConvenience._isAllowed([given], _allowed);
    }

    /**
     * Normalizes a given string to an uppercase standard or custom HTTP method.
     * 
     * @description Delegates to {@link HTTPMethodsConvenience._normalize}
     * 
     * @param {unknown} maybeMethod - See {@link HTTPMethodsConvenience._normalize}
     * @returns {EHTTPMethods | GCustomMethods} See {@link HTTPMethodsConvenience._normalize}.
     * 
     * @throws {HTTPConveniencePackException} See {@link HTTPMethodsConvenience._normalize}
     */
    public normalize(maybeMethod: string): EHTTPMethods | GCustomMethods {
        return HTTPMethodsConvenience._normalize(maybeMethod, this.methods) as EHTTPMethods;
    }

    /**
     * ---
     * IMPORTANT: Here come private static methods that universally process both standard and custom HTTP methods.
     * --- 
     */

    /**
     * Retrieves the values of the standard `EHTTPMethods` enum or `GCustomMethods` object.
     * 
     * @description A delegate to process either solely standard EHTTPMethods or including `GCustomMethods`.
     *
     * @template GCustomMethods - A generic type extending TCustomHTTPMethodsConstraint, representing custom HTTP methods.
     * @param {EHTTPMethods | GCustomMethods} methods - The standard HTTP methods enum or a custom methods object.
     * @returns {EHTTPMethods[] | GCustomMethods[]} An array containing the values of the provided HTTP methods.
     */
    private static _toValues<GCustomMethods extends TCustomHTTPMethodsConstraint = Record<string, string>>(methods: EHTTPMethods | GCustomMethods): EHTTPMethods[] | GCustomMethods[] {
        return Object.values(methods) as EHTTPMethods[] | GCustomMethods[];
    }

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
    private static _isValid<GCustomMethods extends TCustomHTTPMethodsConstraint = Record<string, string>>(maybeMethod: string | string[], valid: EHTTPMethods | GCustomMethods): boolean {
        const given = HTTPMethodsConvenience._given(maybeMethod);
        return HTTPMethodsConvenience._isAllowed(given, Object.values(valid) as EHTTPMethods[] | GCustomMethods[]);
    }

    /**
     * Check if a given HTTP method is allowed based on a list of allowed methods.
     *
     * @param {EHTTPMethods} given - The HTTP method to check.
     * @param {EHTTPMethods[]} [allowed] - An array of allowed HTTP methods. 
     * 
     * @returns {boolean} `true` if the given method is in the list of allowed methods, otherwise `false`.
     */
    private static _isAllowed<GCustomMethods extends TCustomHTTPMethodsConstraint = Record<string, string>>(givens: string[], allowed: EHTTPMethods[] | GCustomMethods[]): boolean {
        // NB: Translate standard `EHTTPMethods` enum and `GCustomMethods` object to array of values.
        return givens.every((given: string) => { return allowed.includes(given.toUpperCase() as EHTTPMethods & GCustomMethods); });
    }

    /**
     * Normalizes a given string to an uppercase standard or custom HTTP method.
     * 
     * For this validates it against standard or custom methods at first.
     * 
     * @template GCustomMethods - A generic type extending TCustomHTTPMethodsConstraint, representing custom HTTP methods.
     * 
     * @param {unknown} maybeMethod - The HTTP method to normalize and validate. It should be a string.
     * @param {EHTTPMethods | GCustomMethods} valid - The set of valid HTTP methods, either standard or custom.
     * 
     * @returns {EHTTPMethods | GCustomMethods} The normalized HTTP method in uppercase if valid.
     * 
     * @throws {HTTPConveniencePackException} If the maybeMethod is not a string or is not a valid HTTP method.
     */
    private static _normalize<GCustomMethods extends TCustomHTTPMethodsConstraint = Record<string, string>>(maybeMethod: unknown, valid: EHTTPMethods | GCustomMethods): EHTTPMethods | GCustomMethods {
        if (typeof maybeMethod !== 'string') {
            // REFACTOR: To the domain exception class.
            throw new HTTPConveniencePackException(`"maybeMethod" argument should be a string, typeof "${typeof maybeMethod}" given.`);
        }

        const method = maybeMethod.toUpperCase();

        if (!HTTPMethodsConvenience._isValid(maybeMethod, valid)) {
            // REFACTOR: To the domain exception class.
            throw new HTTPConveniencePackException(`"maybeMethod" argument when transformed to upper case should be a valid HTTP standard or custom method, "${maybeMethod}" given.`);
        }

        return method as EHTTPMethods;
    }

    /**
     * Standardize given method(s) input into an array.
     */
    private static _given(maybeMethod: string | string[]): string[] {
        return Array.isArray(maybeMethod) ? maybeMethod : [maybeMethod];
    }

}



