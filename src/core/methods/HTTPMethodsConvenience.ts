'use strict';

import { EHTTPMethods, EHTTPMethodsGroupsList, HTTPMethodInGroups, THTTPMethodsConstraint } from '@src/core/methods/methods.types.js';
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
     * @description
     * 
     * WARNING: The custom methods enum values must be uppercase.
     * This is because the RFC defines methods as uppercase and the validation 
     * functionality (isValid, isAmong) convert validated input to upper case.
     * 
     * The TypeScript cannot ensure the uppercase values for enums. Could resort to
     * type constants but due to the extension use case is rare and simple
     * prefer to leave it to a developer to not complicate the Pack code.
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
     * WARNING: The `allowed` values must be uppercase.
     * @see {@link HTTPMethodsConvenience.extend}
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

        const allowedArgValues = [
            !allowed ? this.values : null,
            typeof allowed === 'string' ? [allowed] : null,
            typeof allowed === 'object' ? Object.values(allowed as THTTPMethodsConstraint) : null
        ];

        const _allowed = allowedArgValues.find((value: string[] | null) => { return value; }) as string[];

        return givens.every((given: string) => { return _allowed.includes(given.toUpperCase()); });
    }

    /**
     * Checks if the given HTTP method belongs to the specified group(s).
     * 
     * Checks against {@link HTTPMethodInGroups} typed constant(s).
     * 
     * This method can accept either a single group or an array of groups. 
     * By default, it checks if the method belongs to **at least one** of the groups (logical OR).
     * 
     * If you pass `false` for the optional `all` parameter, the method will check 
     * if it belongs to **every** group (logical AND).
     * 
     * 
     * More specific than {@link HTTPMethodsConvenience.isAmong}.
     * 
     * @param {string} given - The HTTP method.
     * @param {EHTTPMethodsGroupsList | EHTTPMethodsGroupsList[]} groups - The group(s) to check against.
     * Either single or multiple items from `EHTTPMethodsGroupsList`.
     * @param {boolean} all - A boolean flag;
     * - false (default): check if the method belongs to **at list one** group (logical OR);
     * - true: check if the method belongs to **all** groups (logical AND).
     * 
     * @returns 
     * - `true` if the method is in the group(s): by default **at least in one** group;
     *   when `all` === true the method should belong to **all** given groups;
     * - otherwise `false`.
     * 
     * @throws {HTTPConveniencePackException} If the `maybeMethod` is not a string or
     * is not a valid HTTP method.
     * 
     * @uses {@link HTTPMethodsConvenience.ofGroups}
     * @uses {@link HTTPMethodsConvenience.normalize}
     * 
     * @example
     * ```typescript
     * HTTPMethodsConvenience.inGroup('GET', EHTTPMethodsGroupsList.SAFE); // true
     * HTTPMethodsConvenience.inGroup('POST', EHTTPMethodsGroupsList.IDEMPOTENT); // false
     * HTTPMethodsConvenience.inGroup('GET', [EHTTPMethodsGroupsList.IDEMPOTENT, EHTTPMethodsGroupsList.CACHEABLE]); // true
     * HTTPMethodsConvenience.inGroup('CONNECT', [EHTTPMethodsGroupsList.IDEMPOTENT, EHTTPMethodsGroupsList.CACHEABLE]); // false
     * HTTPMethodsConvenience.inGroup('GET', [EHTTPMethodsGroupsList.IDEMPOTENT, EHTTPMethodsGroupsList.CACHEABLE], true); // true
     * HTTPMethodsConvenience.inGroup('POST', [EHTTPMethodsGroupsList.IDEMPOTENT, EHTTPMethodsGroupsList.CACHEABLE], true); // false
     * ```
     */
    public static inGroup(given: string, groups: EHTTPMethodsGroupsList | EHTTPMethodsGroupsList[], all: boolean = false): boolean {
        const maybeMethod = this.normalize(given);
        const _groups = Array.isArray(groups) ? groups : [groups];

        const comparator = all ? 'every' : 'some';

        return _groups[comparator]((group: EHTTPMethodsGroupsList) => {
            return this.ofGroups(maybeMethod)?.includes(group);
        });
    }

    /**
     * Retrieves the groups associated with a given HTTP method from {@link HTTPMethodInGroups}
     * for the valid method, otherwise  returns an empty array.
     * 
     * @param maybeMethod - The valid HTTP method
     * 
     * @see {@link HTTPMethodsConvenience.isValid}
     * 
     * Case sensitivity should match {@link EHTTPMethods} enum.
     * 
     * @returns An array of groups {@link EHTTPMethodsGroupsList} from {@link HTTPMethodInGroups}
     * or an empty.
     * 
     * @throws {HTTPConveniencePackException} If the `maybeMethod` is not a string or
     * is not a valid HTTP method.
     * 
     * @example
     * 
     * ```typescript
     * console.log(HTTPMethodsConvenience.ofGroups('GET')); // HTTPMethodInGroups[EHTTPMethods.GET] as array;
     * ```
     * 
     * @example
     * 
     * ```typescript
     * console.log(HTTPMethodsConvenience.ofGroups('unknown')); // []
     * ```
     */
    public static ofGroups(maybeMethod: string): readonly EHTTPMethodsGroupsList[] {
        const method = this.normalize(maybeMethod);

        return HTTPMethodInGroups[method as EHTTPMethods] || [];
    }

    /**
     * Normalize a given string to an uppercase standard or custom HTTP method.
     * 
     * @static
     * 
     * @note
     * 
     * NB: The method throws. 
     * 
     * The design assumption is that external input strings are always expected 
     * to be the valid HTTP methods. 
     * 
     * @param {string} maybeMethod - The HTTP method to normalize and validate.
     * 
     * @returns {keyof THTTPMethodsConstraint} The normalized HTTP method in uppercase if valid.
     * 
     * @throws {HTTPConveniencePackException} If the `maybeMethod` is not a string or
     * is not a valid HTTP method.
     * 
     * @used by {@link HTTPMethodsConvenience.inGroup}
     * @used by {@link HTTPMethodsConvenience.ofGroups}
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



