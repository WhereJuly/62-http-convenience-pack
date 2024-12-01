'use strict';

import { EHTTPStatusCodeGroups, GROUPED_STATUS_CODES, HTTP_STATUSES } from '@src/core/statuses/statuses.types.js';

/**
 * Type a group of status codes from the `GROUPED_STATUS_CODES` enum.
 * 
 * Used as {@link HTTPStatusesConvenience.isAmong} `list` parameter type
 */
type TGroupsList = typeof GROUPED_STATUS_CODES[keyof typeof GROUPED_STATUS_CODES];

/**
 * A convenience class for handling HTTP status codes.
 * 
 * This class provides methods to determine the group of a status code,
 * validate status codes, check if a status code belongs to a specific group,
 * retrieve the group of a status code, check if a status code is among a list,
 * get the message associated with a status code and normalize a code value.
 */
export default class HTTPStatusesConvenience {

    /**
     * Checks if the given status code is a valid HTTP status code.
     *
     * @param {number | string} given - The status code to check against {@link HTTP_STATUSES}.
     * @return {boolean} `true` if `given` is in the specified group.
     *
     * @example
     * ```typescript
     * const isValidStatus = HTTPStatusesConvenience.isValid(200); // true
     * ```
     */
    public static isValid(given: number | string): boolean {
        const code = this.normalize(given);

        return Object.keys(HTTP_STATUSES).includes(code.toString());
    }

    /**
     * Checks if a given status code belongs to a specified HTTP status code group.
     *
     * @param {number | string} given - The status code to check.
     * @param {EHTTPStatusCodeGroups} group - The group to check against.
     * @return {boolean} `true` if `given` is in the specified group.
     *
     * @example
     * ```typescript
     * const isInGroup = HTTPStatusesConvenience.inGroup(404, EHTTPStatusCodeGroups.CLIENTERR); // true
     * ```
     */
    public static inGroup(given: number | string, group: EHTTPStatusCodeGroups): boolean {
        const code = this.normalize(given);

        return this.isAmong(code, GROUPED_STATUS_CODES[group] as unknown as number[]);
    }

    /**
     * Retrieves the HTTP status code group for a given status code.
     *
     * @param {number} given - The status code to evaluate.
     * @return {EHTTPStatusCodeGroups | null} The found group, or null otherwise.
     *
     * @example
     * ```typescript
     * const statusCodeGroup = HTTPStatusesConvenience.ofGroup(200); // EHTTPStatusCodeGroups.SUCCESS
     * ```
     */
    public static ofGroup(given: number): EHTTPStatusCodeGroups | null {
        const code = this.normalize(given);
        const entries = Object.entries(GROUPED_STATUS_CODES) as [EHTTPStatusCodeGroups, readonly number[]][];
        const found = entries.find(([_type, codes]) => { return codes.includes(code); });

        return found ? found[0] : null;
    }

    /**
     * Checks if a given status code is among a specified (custom) list of status codes.
     * 
     * Assumed for custom use cases (TBW in documentation)
     *
     * @param {number | string} given - The status code to check.
     * @param {number[]} list - The list of status codes to check against.
     * @return {boolean} `true` if `given` is among the list.
     *
     * @example
     * ```typescript
     * const isAmongList = HTTPStatusesConvenience.isAmong(200, [200, 201, 202]); // true
     * ```
     */
    public static isAmong(given: number | string, list: number[] | TGroupsList): boolean {
        const code = this.normalize(given);

        return (list as number[]).includes(code);
    }

    /**
     * Retrieves the message associated with a given HTTP status code.
     *
     * @param {number} code - The HTTP status code to retrieve the message for.
     * @return {string | undefined} The respective message, undefined otherwise.
     *
     * @example
     * ```typescript
     * const message = HTTPStatusesConvenience.message(200); // "OK"
     * ```
     */
    public static message(code: number): string | undefined {
        return HTTP_STATUSES[code as keyof typeof HTTP_STATUSES]?.message;
    }

    /**
     * Normalizes the code input to a numeric value.
     * 
     * @param {number | string} input - The input value to normalize, which can be a number or a string.
     * @return {number} The normalized number.
     *
     * @example
     * ```typescript
     * const normalized = HTTPStatusesConvenience.normalize("404"); // 404
     * const alreadyNormalized = HTTPStatusesConvenience.normalize(200); // 200
     * ```
     */
    public static normalize(input: number | string): number {
        return typeof input === 'string' ? parseInt(input, 10) : input;
    }

}
