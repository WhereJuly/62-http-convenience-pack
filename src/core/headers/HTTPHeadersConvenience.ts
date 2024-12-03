'use strict';

import { EHTTPAuthenticationScheme, EHTTPHeaders } from '@src/core/headers/headers.types.js';

type THeader = { [EHTTPHeaders.Authorization]: string; };
type THeadersObject = { [key in EHTTPHeaders | string]: string; };
type TExtractorFunction<GExtractorReturns = string> = (value: string) => GExtractorReturns;

export default class HTTPHeadersConvenience {

    private static builtin: typeof EHTTPHeaders = EHTTPHeaders;

    /**
     * WRITE: This is rough description. Re-write.
     * 
     * Extractors property: Set with built-in extractors for numbers, booleans, arrays, dates, objects,
     * @see {@link .a&cd/headers/built-in-extractors.md}
     * Consumer can add extractors with `public static set extractors`. 
     * Will need extractors getter;
     * 
     * WRITE: What to do when the key=extractor already exists. 
     * What to do if the key is among built-in extractors.
     * 
     * WRITE: The `token` extractor that automatically detects token scheme
     * from the built-in ones (like Bearer, Basic, etc., may include a lot of them)
     * and extracts the value.
     */
    private static _extractors: Map<string, TExtractorFunction> = new Map();

    /**
     * Extractors getter.
     * 
     * WRITE: doc block.
     *
     * @static
     */
    public static get extractors(): Map<string, TExtractorFunction> {
        return this._extractors;
    }

    /**
     * Extractors setter.
     * 
     * WRITE: doc block.
     *
     * @static
     */
    public static set extractors(descriptor: { name: string, extractor: TExtractorFunction; }) {
        this._extractors.set(descriptor.name, descriptor.extractor);
    }

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
     * the extracted value. May return a desired generic type value.
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

    public static normalize(header: EHTTPHeaders | string): string {
        return header.toLowerCase();
    }

}