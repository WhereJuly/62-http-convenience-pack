'use strict';

import { TExtractorFunction } from '@src/core/headers/BuiltInExtractors.js';
import { EHTTPAuthenticationScheme, EHTTPHeaders } from '@src/core/headers/headers.types.js';

type THeader = { [EHTTPHeaders.Authorization]: string; };
type THeadersObject = { [key in EHTTPHeaders | string]: string; };

export default class HTTPHeadersConvenience {

    // NB: Will see if it is needed.
    private static headers: typeof EHTTPHeaders = EHTTPHeaders;

    // NB: For the initial implementation restrict with Authorization header only
    // Could make any header object with a custom maker function.

    // For makers functions I could add the makers static property
    // that would contain Set of maker functions named after EHTTPHeaders elements.
    // That makers Set could be manually extended with more makers by a consumer.
    public static make(_header: EHTTPHeaders.Authorization, _value: unknown, _scheme: EHTTPAuthenticationScheme): THeader {
        // WRITE: Implementation

        // NB: Here should be probably one standard maker function - JSON.stringify() - or similar.
        // To transform different values to string. Well maybe an optional custom maker function.
        return {} as any;
    }

    /**
     * Extracts a header value from the provided headers object. 
     * 
     * By default returns plain string value of the header. Can return the header value
     * transformed with built-in or custom extractor into number, array, date, object etc.
     * 
     * @param {THeadersObject} headersObject - The object containing HTTP headers with values.
     * The one generally comes in HTTP requests.
     * 
     * @param {EHTTPHeaders | string} toExtract - The *case-insensitive* header name to extract.
     * 
     * @param {TExtractorFunction<GExtractorReturns>} extractor_ - Optional function to process
     * the extracted value. May return a desired generic type value `GExtractorReturns` 
     * (default `string`).
     * 
     * @returns The extracted value optionally processed by the extractor or `null` if
     * the `toExtract` is not found in `headersObject`.
     * 
     * @example Basic usage.
     * ```typescript
     * const headers = { 'Content-Type': 'application/json' };
     * console.log(HTTPHeadersConvenience.extract(headers, EHTTPHeaders.ContentType)); // 'application/json'
     * ```
     * 
     * @example Custom extractor with string return value type.
     * ```typescript
     * const headers = { 'Content-Type': 'application/json' };
     * const extractor = (value) => value.toUpperCase()
     * console.log(HTTPHeadersConvenience.extract(headers, 'Content-Type', extractor)); // 'APPLICATION/JSON'
     * ```
     * 
     * @example Custom extractor with custom return value type.
     * ```typescript
     * const headers = { 'Content-Type': 'application/json', 'Accept-Language': 'en-US,fr-CA' };
     * const extractor = (value) => value.split(',')
     * console.log(HTTPHeadersConvenience.extract<string[]>(headers, 'Accept-Language', extractor)); // ['en-US', 'fr-CA']
     * ```
     * 
     * WRITE: The example with built-in `token` extractor usage.
     */
    public static extract<GExtractorReturns>(headersObject: THeadersObject, toExtract: EHTTPHeaders | string, extractor_?: TExtractorFunction<GExtractorReturns>): string | GExtractorReturns | null {
        const extractor = extractor_ ?? ((value: string) => value);

        const found = Object.entries(headersObject).find((entry: [string, string]) => {
            const [key, value] = [this.normalize(entry[0]), entry[1]];
            return key === this.normalize(toExtract) ? value : null;
        });

        return found ? extractor(found[1]) : null;
    }

    /**
     * Checks if the header is present and its value matches the expected value.
     * 
     * For this extract the header value with {@link HTTPHeadersConvenience.extract}
     * applying the `_extractor` if provided. Then compares the extracted value with `expected` argument.
     * 
     * @returns {boolean} - `true` if the header is present and its value matches the expected value, otherwise `false`.
     */
    public static hasValue(_headersObject: THeadersObject, _toExtract: EHTTPHeaders, _expected: unknown, _extractor?: TExtractorFunction<any>): boolean {
        // WRITE: Implementation
        return false;
    }

    /**
     * Normalizes the given HTTP header name by converting it to lowercase.
     * 
     * @param {EHTTPHeaders | string} header The HTTP header name to normalize.
     * @returns The normalized header name as a lowercase string.
     * 
     * @example
     * normalize('Content-Type'); // 'content-type'
     * normalize(EHTTPHeaders.Authorization); // 'authorization'
     */
    public static normalize(header: EHTTPHeaders | string): string {
        return header.toLowerCase();
    }

}