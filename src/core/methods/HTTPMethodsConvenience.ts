'use strict';

import { EHTTPMethods, THTTPMethodsConstraint } from '@src/core/methods/methods.types.js';
import HTTPConveniencePackException from '@src/exceptions/HTTPConveniencePack.exception.js';

/**
 * Provide convenient interface to work with HTTP methods, standard {@link EHTTPMethods} 
 * and extended {@link THTTPMethodsConstraint}.
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
 * Extend custom HTTP methods at instantiation and work with both standard and custom HTTP methods
 * via the instance. 
 * 
 * ```typescript
 * enum ECustomHTTPMethods = { LINK = 'LINK', UNLINK = 'UNLINK' }
 * HTTPMethodsConvenience.extend(ECustomHTTPMethods);
 * console.log(HTTPMethodsConvenience.isValid([ECustomHTTPMethods.LINK, 'GET'])); // true; Provides autocomplete.
 * ```
 */
export default class HTTPMethodsConvenience {

    private static extended: THTTPMethodsConstraint | null = null;

    /**
     * Return the HTTP Methods Registry.
     * 
     * The Registry can contains either built-in
     * HTTP methods {@link EHTTPMethods} or both built-in and extended methods
     * if the Registry was extended with {@link HTTPMethodsConvenience.extend} method.
     * 
     * @static
     */
    public static get methods(): THTTPMethodsConstraint {
        return this.extended ? { ...EHTTPMethods, ...this.extended } : EHTTPMethods;
    }

    /**
     * Retrieve an array of all HTTP method values from the Methods Registry.
     * 
     * @static
     * 
     * @returns {string[]} An array ofe the Registry values.
     * 
     * @description This method returns all the HTTP method values from the Registry, 
     * including both the built-in and extended if any.
     */
    public static get values(): string[] {
        return Object.values(this.methods);
    }

    /**
     * Extends the HTTP Methods Registry with custom methods.
     * 
     * @static
     * 
     * @param {THTTPMethodsConstraint} methods - An object representing custom HTTP methods to be added to the registry.
     * 
     * @description This method allows you to add custom HTTP methods to the existing registry of standard methods.
     * Once extended, the registry will include both standard and custom methods, which can be validated and used
     * throughout the application.
     * 
     * @see {@link HTTPMethodsConvenience.isExtended}
     * @see {@link HTTPMethodsConvenience.reset}
     * 
     * @example
     * ```typescript
     * enum ECustomHTTPMethods { LINK = 'LINK', UNLINK = 'UNLINK' }
     * HTTPMethodsConvenience.extend(ECustomHTTPMethods);
     * console.log(HTTPMethodsConvenience.isValid('LINK')); // true
     * ```
     */
    public static extend(methods: THTTPMethodsConstraint): void {
        this.extended = methods;
    }

    /**
     * Resets the HTTP Methods Registry to its default state.
     * 
     * @static
     * 
     * @description Remove extended methods from the Registry, restoring to only built-in methods state..
     * @see {@link HTTPMethodsConvenience.extend}
     * @see {@link HTTPMethodsConvenience.isExtended}
     * 
     * @example Reset the registry to its default state
     * ```typescript
     * HTTPMethodsConvenience.reset();
     * console.log(HTTPMethodsConvenience.isExtended); // false
     * ```
     */
    public static reset(): void {
        this.extended = null;
    }

    /**
     * Checks if the HTTP Methods Registry has been extended with custom methods.
     * 
     * @static
     * 
     * @returns {boolean} `true` if the registry includes custom methods, otherwise `false`.
     * 
     * @see {@link HTTPMethodsConvenience.extend}
     * @see {@link HTTPMethodsConvenience.reset}
     * 
     * @example 
     * // Initially, the registry is not extended
     * ```typescript
     * console.log(HTTPMethodsConvenience.isExtended); // false
     * 
     * // Extend the registry with custom methods
     * enum ECustomHTTPMethods { LINK = 'LINK', UNLINK = 'UNLINK' }
     * HTTPMethodsConvenience.extend(ECustomHTTPMethods);
     * console.log(HTTPMethodsConvenience.isExtended); // true
     * // Reset to the built-in state.
     * HTTPMethodsConvenience.reset();
     * console.log(HTTPMethodsConvenience.isExtended); // false
     * ```
     */
    public static get isExtended(): boolean {
        return !!this.extended;
    }

    /**
     * Check if the given HTTP method(s) are valid against the Methods Registry
     * {@link HTTPMethodsConvenience.methods} (either built-in or with extended methods).
     * 
     * @uses {@link HTTPMethodsConvenience._givens}
     * @uses {@link HTTPMethodsConvenience.isAmong}
     * 
     * @param {(string | string[])} maybeMethod
     */
    public static isValid(maybeMethod: string | string[]): boolean {
        const givens = HTTPMethodsConvenience._givens(maybeMethod);

        return this.isAmong(givens);
    }

    /**
     * Check if a given HTTP method is allowed based on a methods in the Registry
     * or on the optional list of allowed methods either as {@link THTTPMethodsConstraint}
     * object or `string[]`.
     * 
     * @static
     * 
     * @param {string | string[]} given - The HTTP method(s) to check.
     * @param {THTTPMethodsConstraint | string[]} allowed - An optional list of allowed methods. 
     * If not provided, defaults to all methods in the Registry.
     * 
     * @returns {boolean} `true` if all given methods are in the list of allowed methods, otherwise `false`.
     * 
     * @example
     * ```typescript
     * // Check if a single method is among the allowed methods
     * console.log(HTTPMethodsConvenience.isAmong('GET')); // true
     * 
     * // Check if multiple methods are among the allowed methods
     * console.log(HTTPMethodsConvenience.isAmong(['GET', 'POST'])); // true
     * 
     * // Check against a custom list of allowed methods
     * console.log(HTTPMethodsConvenience.isAmong('PATCH', ['GET', 'POST'])); // false
     * ```
     */    
    public static isAmong(given: string | string[], allowed?: THTTPMethodsConstraint | string[]): boolean {
        const givens = HTTPMethodsConvenience._givens(given);
        const _allowed = allowed ? Object.values(allowed) : this.values;

        return givens.every((given: string) => { return _allowed.includes(given.toUpperCase()); });
    }

    /**
     * Normalize a given string to an uppercase standard or custom HTTP method.
     * 
     * @static
     * 
     * @param {string} maybeMethod - The HTTP method to normalize and validate.
     * 
     * @returns {keyof THTTPMethodsConstraint} The normalized HTTP method in uppercase if valid.
     * 
     * @throws {HTTPConveniencePackException} If the `maybeMethod` is not a string or
     * is not a valid HTTP method.
     * 
     * @example
     * ```typescript
     * // Normalize a valid HTTP method
     * console.log(HTTPMethodsConvenience.normalize('get')); // 'GET'
     * 
     * // Attempt to normalize an invalid HTTP method
     * try {
     *   HTTPMethodsConvenience.normalize('invalidMethod');
     * } catch (e) {
     *   // "maybeMethod" argument when transformed to upper case should be a valid HTTP built-in or extended method, "invalidMethod" given.
     *   console.error(e.message); 
     * }
     * ```
     */    
    public static normalize(maybeMethod: string): keyof THTTPMethodsConstraint {
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
     * Standardize given string input into an array.
     */
    private static _givens(maybeMethod: string | string[]): string[] {
        return Array.isArray(maybeMethod) ? maybeMethod : [maybeMethod];
    }

}



