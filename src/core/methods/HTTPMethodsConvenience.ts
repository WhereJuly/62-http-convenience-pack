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
     * Extends the HTTP Methods Registry with custom methods.
     * 
     * @static
     * 
     * @param {THTTPMethodsConstraint} methods - An object representing custom HTTP methods 
     * to be added to the registry.
     * 
     * @description Once extended, the Registry will include both standard and custom methods
     * available via {@link HTTPMethodsConvenience.methods} getter.
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
     * Resets the HTTP Methods Registry to its built-in state.
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
     * Check if the given HTTP method(s) are valid against the Methods Registry
     * {@link HTTPMethodsConvenience.methods} (either built-in or with extended methods).
     * 
     * @param {(string | string[])} maybeMethod
     * @uses {@link HTTPMethodsConvenience._givens}
     * 
     * @example
     * 
     * ```typescript
     * HTTPmethodsConvenience.isValid('GET'); // true
     * HTTPmethodsConvenience.isValid('UNLINK'); // false
     * HTTPmethodsConvenience.isValid(['GET', 'POST']); // true; Accept `string[]` as well;
     * HTTPmethodsConvenience.isValid(['GET', 'post']); // true; Automated normalize before validation 
     * HTTPmethodsConvenience.isValid(['GET', 'link']); // false; 
     * ```
     * 
     * @uses {@link HTTPMethodsConvenience.isAmong}
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
     * If not provided, defaults to all methods in the Registry 
     * (same as {@link HTTPMethodsConvenience.isValid}).
     * 
     * @returns {boolean} `true` if given method(s) is in `allowed` methods, otherwise `false`.
     * 
     * @uses {@link HTTPMethodsConvenience._givens}
     * 
     * @example
     * ```typescript
     * // Check if a single method is among the methods in the Registry
     * console.log(HTTPMethodsConvenience.isAmong('GET')); // true
     * 
     * // Check if a single method is equal to the exact one allowed method
     * console.log(HTTPMethodsConvenience.isAmong('GET', EHTTPMethods.GET)); // true
     * 
     * // Check if multiple methods are among the allowed methods
     * console.log(HTTPMethodsConvenience.isAmong(['GET', 'POST'])); // true
     * 
     * // Check against a custom list of allowed methods
     * console.log(HTTPMethodsConvenience.isAmong('PATCH', ['GET', 'POST'])); // false
     * ```
     */
    public static isAmong(given: string | string[], allowed?: string | THTTPMethodsConstraint | string[]): boolean {
        const givens = HTTPMethodsConvenience._givens(given);
        /**
         * REFACTOR: Calculate array of values at once, no functions. Filter out the actual (non-null) value then.
         * NB: Put to Chronicles as great replacement of conditionals. 
         * Ask cgpt if that reminds him some pattern or what an refer to it in Chromiles.
         */
        const is = [
            (allowed: unknown) => { return !allowed ? this.values : null; },
            (allowed: unknown) => { return typeof allowed === 'string' ? [allowed] : null; },
            (allowed: unknown) => { return typeof allowed === 'object' ? Object.values(allowed as THTTPMethodsConstraint) : null; },
        ];

        const _allowed = is.find(fn => fn(allowed) !== null)?.(allowed) || this.values;  // Apply the first valid function

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
     * Return the Registry methods as array.
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
     * Standardize given string input into an array.
     */
    private static _givens(maybeMethod: string | string[]): string[] {
        return Array.isArray(maybeMethod) ? maybeMethod : [maybeMethod];
    }

}



