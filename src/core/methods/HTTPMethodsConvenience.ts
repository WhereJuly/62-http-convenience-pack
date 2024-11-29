'use strict';

import { EHTTPMethods, TCustomHTTPMethodsConstraint } from '@src/core/methods/methods.types.js';
import HTTPConveniencePackException from '@src/exceptions/HTTPConveniencePack.exception.js';

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

    // REFACTOR: Remove with instance methods remove.
    protected methods: EHTTPMethods | GCustomMethods;

    private static extended: TCustomHTTPMethodsConstraint | null = null;

    constructor(customMethods: GCustomMethods) {
        this.methods = { ...EHTTPMethods, ...customMethods };
    }

    public static get methods(): TCustomHTTPMethodsConstraint {
        return this.extended ? { ...EHTTPMethods, ...this.extended } : EHTTPMethods;
    }

    public static get values(): string[] {
        return Object.values(this.methods);
    }

    public static extend(methods: TCustomHTTPMethodsConstraint): void {
        this.extended = methods;
    }

    public static reset(): void {
        this.extended = null;
    }

    public static get isExtended(): boolean {
        return !!this.extended;
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
     * WRITE: Update docblock for refactored code.
     * Check if the given standard HTTP method or array of methods is valid.
     * 
     * @static
     * @description Delegates to {@link HTTPMethodsConvenience._isValid}
     */
    public static isValid(maybeMethod: string | string[]): boolean {
        const givens = HTTPMethodsConvenience._given(maybeMethod);

        // REFACTOR: Extract this as the method to replace current `isAllowed` and `_isAllowed` methods.
        const isAllowed = (givens: string[]) => {
            return givens.every((given: string) => { return this.values.includes(given.toUpperCase()); });
        };

        return isAllowed(givens);
    }

    /**
     * WRITE: Update docblock for refactored code.
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
    public static isAmong(given: string | string[], allowed?: TCustomHTTPMethodsConstraint): boolean {
        const givens = HTTPMethodsConvenience._given(given);
        const _allowed = allowed ? Object.values(allowed) : this.values;

        return givens.every((given: string) => { return _allowed.includes(given.toUpperCase()); });
    }

    /**
     * WRITE: Update docblock for refactored code.
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
    public static normalize(maybeMethod: string): keyof TCustomHTTPMethodsConstraint {
        if (typeof maybeMethod !== 'string') {
            throw new HTTPConveniencePackException(`"maybeMethod" argument should be a string, typeof "${typeof maybeMethod}" given.`);
        }

        const method = maybeMethod.toUpperCase();

        if (!this.isValid(maybeMethod)) {
            throw new HTTPConveniencePackException(`"maybeMethod" argument when transformed to upper case should be a valid HTTP built-in or extended method, "${maybeMethod}" given.`);
        }

        return method;
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
    // public isValid(maybeMethod: string | string[]): boolean {
    //     return HTTPMethodsConvenience._isValid(maybeMethod, this.methods);
    // }

    /**
     * Check if a given HTTP method is allowed based on a list of allowed methods.
     * 
     * @description Delegates to {@link HTTPMethodsConvenience._isAllowed}
     * 
     * @param {EHTTPMethods} given - see {@link HTTPMethodsConvenience._isAllowed}.
     * @param {EHTTPMethods[]} [allowed] - see {@link HTTPMethodsConvenience.isAllowed}. 
     */
    // public isAllowed(given: string, allowed?: TCustomHTTPMethodsConstraint[]): boolean {
    //     const _allowed = allowed ?? this.toValues();

    //     return HTTPMethodsConvenience._isAllowed([given], _allowed);
    // }

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
    // public normalize(maybeMethod: string): EHTTPMethods | GCustomMethods {
    //     return HTTPMethodsConvenience._normalize(maybeMethod, this.methods) as EHTTPMethods;
    // }

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
    // private static _isValid<GCustomMethods extends TCustomHTTPMethodsConstraint = Record<string, string>>(maybeMethod: string | string[], valid: EHTTPMethods | GCustomMethods): boolean {
    //     const given = HTTPMethodsConvenience._given(maybeMethod);
    //     return HTTPMethodsConvenience._isAllowed(given, Object.values(valid) as EHTTPMethods[] | GCustomMethods[]);
    // }

    /**
     * Check if a given HTTP method is allowed based on a list of allowed methods.
     *
     * @param {EHTTPMethods} given - The HTTP method to check.
     * @param {EHTTPMethods[]} [allowed] - An array of allowed HTTP methods. 
     * 
     * @returns {boolean} `true` if the given method is in the list of allowed methods, otherwise `false`.
     */
    // private static _isAllowed<GCustomMethods extends TCustomHTTPMethodsConstraint = Record<string, string>>(givens: string[], allowed: EHTTPMethods[] | GCustomMethods[]): boolean {
    //     // NB: Translate standard `EHTTPMethods` enum and `GCustomMethods` object to array of values.
    //     return givens.every((given: string) => { return allowed.includes(given.toUpperCase() as EHTTPMethods & GCustomMethods); });
    // }

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
    // private static _normalize<GCustomMethods extends TCustomHTTPMethodsConstraint = Record<string, string>>(maybeMethod: unknown, valid: EHTTPMethods | GCustomMethods): EHTTPMethods | GCustomMethods {
    //     if (typeof maybeMethod !== 'string') {
    //         // REFACTOR: To the domain exception class.
    //         throw new HTTPConveniencePackException(`"maybeMethod" argument should be a string, typeof "${typeof maybeMethod}" given.`);
    //     }

    //     const method = maybeMethod.toUpperCase();

    //     if (!HTTPMethodsConvenience._isValid(maybeMethod, valid)) {
    //         // REFACTOR: To the domain exception class.
    //         throw new HTTPConveniencePackException(`"maybeMethod" argument when transformed to upper case should be a valid HTTP standard or custom method, "${maybeMethod}" given.`);
    //     }

    //     return method as EHTTPMethods;
    // }

    /**
     * Standardize given method(s) input into an array.
     */
    private static _given(maybeMethod: string | string[]): string[] {
        return Array.isArray(maybeMethod) ? maybeMethod : [maybeMethod];
    }

}



