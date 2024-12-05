'use strict';

import { ETokenSchemes } from '@src/core/headers/BuiltInExtractors.js';
import { EHTTPHeaders } from '@src/core/headers/headers.types.js';

/**
 * @internal
 * 
 * The internal type for {@link HTTPHeadersConvenience.make} method.
 * Could be probably unified fir the method `_maker` parameter type in the future.
 */
type TTokenValueMakerFunction = (token: TAuthorizationTokenValue) => string;

/**
 * The constant included in {@link HTTPHeadersConvenience.make} methods return value for
 * unknown token schemes.
 * 
 * @example
 * ```typescript
 * 
 * const authorizationHeader = HTTPHeadersConvenience.make(EHTTPHeaders.Authorization, "InvalidScheme", "someToken");
 * if authorizationHeader.Authorization.includes(TokenSchemeUnknown)
 *   throw new Error('Cannot make the Authorization header with an invalid scheme.'); 
 * ```
 */
export const TokenSchemeUnknown = 'Error: token scheme unknown.';

/**
 * Represents the general kind of HTTP request headers object.
 * 
 * Used in multiple methods in {@link HTTPHeadersConvenience} class.
 * 
 * @example
 * 
 * ```json
 * {
 *   "Accept-Encoding": "gzip, deflate, br",
 *   "Accept-Language": "en-US,en;q=0.9"
 * }
 */
export type THeadersObject = { [key in EHTTPHeaders | string]: string; };

/**
 * The specific type used as a return type for  {@link HTTPHeadersConvenience.make} method.
 * 
 * @example
 * ```typescript
 * { "Authorization": "Bearer the-bearer-token" }
 * ```
 */
export type TAuthorizationHeaderObject = { [EHTTPHeaders.Authorization]: string; };

/**
 * The value type used as `token` parameter type for {@link HTTPHeadersConvenience.make} method.
 */
export type TAuthorizationTokenValue = string | string[];

/**
 * Authorization token schemes implemented for for {@link HTTPHeadersConvenience.make} method.
 */
export enum EMakerTokenSchemes {
    Basic = ETokenSchemes.Basic,
    Bearer = ETokenSchemes.Bearer,
}

/**
 * The header value extraction / transformer function type.
 * 
 * @see {@link HTTPHeadersConvenience.extract} method.
 * Used internally in {@link BuiltInExtractors.token} method.
 * 
 * WRITE: Usage example for custom extractors.
 */
export type TExtractorFunction<GExtractorReturns = string> = (value: string) => GExtractorReturns;

/**
 * The convenience class for manipulating HTTP headers.
 */
export default class HTTPHeadersConvenience {

    /**
     * Generates an HTTP Authorization header object {@link TAuthorizationHeaderObject} 
     * for authorization based on the specified token scheme {@link EMakerTokenSchemes}.
     * 
     * It supports Authorization header only with `Bearer` and `Basic` schemes so far.
     * 
     * @param {EHTTPHeaders.Authorization} header - So far limited to `Authorization`.
     * @param {EMakerTokenSchemes} scheme - The token scheme to be used.
     * @param {TAuthorizationTokenValue} token - The authorization token.
     * - `string` for `Bearer` scheme, see {@link unchanged} value maker.
     * - `[string, string]` for `Basic` scheme, see {@link HTTPHeadersConvenience.makerToBasicToken}
     * value maker.
     * 
     * @param _maker - An optional value maker function, not currently implemented.
     * 
     * @returns {TAuthorizationHeaderObject} An object representing the HTTP header with
     * the formatted authorization token value.
     *
     * @example EMakerTokenSchemes.Bearer scheme prepends the token with "Bearer " prefix.
     * 
     * ```typescript
     * HTTPHeadersConvenience.make(EHTTPHeaders.Authorization, EMakerTokenSchemes.Bearer, "myBearerToken"); // { Authorization: "Bearer myBearerToken" }
     * ```
     * 
     * @example EMakerTokenSchemes.Basic: transforms `['username', 'password']` tuple to Basic token.
     * @see {@link HTTPHeadersConvenience.makerToBasicToken} maker function.
     * 
     * ```typescript
     * HTTPHeadersConvenience.make(EHTTPHeaders.Authorization, EMakerTokenSchemes.Basic, ['username', 'password']); // { Authorization: "Basic dXNlcm5hbWU6cGFzc3dvcmQ=" }
     * ```
     * @example Unsupported token scheme: returns token value that includes `Error: token scheme unknown.` 
     * @see {@link TokenSchemeUnknown}
     * 
     * ```typescript
     * HTTPHeadersConvenience.make(EHTTPHeaders.Authorization, "InvalidScheme", "someToken"); // { Authorization: "InvalidScheme TokenSchemeUnknown" }
     * ```
     */
    public static make(header: EHTTPHeaders.Authorization, scheme: EMakerTokenSchemes, token: TAuthorizationTokenValue, _maker?: unknown): TAuthorizationHeaderObject {
        const unchanged = (token: TAuthorizationTokenValue) => { return token as string; };
        const valueMakers: { [key in EMakerTokenSchemes]: TTokenValueMakerFunction } = {
            [EMakerTokenSchemes.Bearer]: unchanged,
            [EMakerTokenSchemes.Basic]: HTTPHeadersConvenience.makerToBasicToken as TTokenValueMakerFunction
        };

        const valueMaker = valueMakers[scheme];
        const value = valueMaker ? valueMaker(token) : TokenSchemeUnknown;

        return { [header]: `${scheme} ${value}` };
    }

    /**
     * Extracts a header value from the provided headers object. 
     * 
     * By default returns plain string value of the header. Can return the header value
     * transformed with built-in or custom extractor into string, token, number, 
     * array, date (all are built-in), or object etc. (custom).
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
     * @example  Custom extractor with string return value type, transforms value to upper case.
     * ```typescript
     * const headers = { 'Content-Type': 'application/json' };
     * const extractor = (value) => value.toUpperCase()
     * console.log(HTTPHeadersConvenience.extract(headers, EHTTPHeaders.ContentType, extractor)); // 'APPLICATION/JSON'
     * ```
     * 
     * @example Custom extractor with custom return value type.
     * ```typescript
     * const headers = { 'Content-Type': 'application/json', 'Accept-Language': 'en-US,fr-CA' };
     * const extractor = (value) => value.split(',')
     * console.log(HTTPHeadersConvenience.extract<string[]>(headers, EHTTPHeaders.AcceptLanguage, extractor)); // ['en-US', 'fr-CA']
     * ```
     * @example Built-in `Basic` auth token extractor.
     * ```typescript
     * const headers = { 'Authorization': 'Basic dXNlcm5hbWU6cGFzc3dvcmQ=', 'Accept-Language': 'en-US,fr-CA' };
     * const extractor = BuiltInExtractors.token
     * console.log(HTTPHeadersConvenience.extract<string[]>(headers, EHTTPHeaders.Authorization, extractor)); // ['username', 'password']
     * ```
     */
    public static extract<GExtractorReturns = string>(headersObject: THeadersObject, headerName: EHTTPHeaders | string, extractor_?: TExtractorFunction<GExtractorReturns>): string | GExtractorReturns | null {
        const extractor = extractor_ ?? ((value: string) => value);
        const keyValue = HTTPHeadersConvenience.toKeyValue(headersObject, headerName);

        return keyValue ? extractor(keyValue[1]) : null;
    }

    /**
     * Checks if the value of a specific header contains the `expected` content.
     * 
     * Uses {@link HTTPHeadersConvenience.extract} under the hood to extract the
     * header value.
     * 
     * The `expected` should match extracted and transformed value.
     * 
     * @see {@link HTTPHeadersConvenience.extract} for extracting the header value.
     * @see {@link BuiltInExtractors} for built-in extractors.
     * 
     * @param {THeadersObject} headersObject - The object containing headers as key-value pairs.
     * @param {EHTTPHeaders | string} headerName - The header name to search for.
     * @param {string | string[]} contains - The content to search for in the header's value.
     * @param {TExtractorFunction<GExtractorReturns>} extractor - Optional custom extractor function
     * to retrieve the header value.
     * 
     * @returns True if the value contains the specified string(s), otherwise false.
     *
     * @example
     * const headers = { 'Content-Type': 'application/json' };
     * HTTPHeadersConvenience.hasValue(headers, EHTTPHeaders.ContentType, MIME_TYPES_BUILTIN['application/json'].type); // true
     * 
     * @example
     * const headers = { 'Authorization': 'Basic dXNlcm5hbWU6cGFzc3dvcmQ=', 'Accept-Language': 'en-US,fr-CA' };
     * const extractor = BuiltInExtractors.token
     * HTTPHeadersConvenience.hasValue<string[]>(headers, EHTTPHeaders.Authorization, ['username', 'password'], extractor); // true
     */
    public static hasValue<GExtractorReturns = string>(headersObject: THeadersObject, headerName: EHTTPHeaders | string, contains: string | string[], extractor?: TExtractorFunction<GExtractorReturns>): boolean {
        const value = this.extract<GExtractorReturns>(headersObject, headerName, extractor);

        // WARNING: The implementation seems not as clear as desired. 
        // Is it convenient to compare extracted values?
        // Besides the actual value of the method still TBC. Will keep as is for now.
        // Will decide after usage.
        const comparators = [
            typeof value === 'string' ? (value: string, contains: string) => value.includes(contains) : null,
            Array.isArray(value) && typeof contains === 'string' ? (value: string[], contains: string) => value.includes(contains) : null,
            Array.isArray(value) && Array.isArray(contains) ? (value: string[], contains: string[]) => value.toString().includes(contains.toString()) : null
        ];

        const comparator = comparators.find((cmp) => cmp);

        return value && comparator ? comparator(value as string & string[], contains as string & string[]) : false;
    }

    /**
     * Finds the key-value pair in a headers object where the key matches the normalized header name.
     * If not found, returns null.
     * 
     * @param {THeadersObject} headersObject - The object containing headers as key-value pairs.
     * @param {EHTTPHeaders | string} headerName - The header name to search for
     * 
     * @returns A tuple of the key and value if found, otherwise null.
     *
     * @example
     * const headers = { 'Content-Type': 'application/json' };
     * HTTPHeadersConvenience.toKeyValue(headers, EHTTPHeaders.ContentType); // ['Content-Type', 'application/json']
     */
    public static toKeyValue(headersObject: THeadersObject, headerName: EHTTPHeaders | string): [string, string] | null {
        const keyValue = Object.entries(headersObject).find(([key, _]: [string, string]) => {
            return HTTPHeadersConvenience.normalize(key) === this.normalize(headerName);
        });

        return keyValue ?? null;
    }

    /**
     * Normalizes the given HTTP header name by converting it to lowercase.
     * 
     * @param {EHTTPHeaders | string} header The HTTP header name to normalize.
     * @returns The normalized header name as a lowercase string.
     * 
     * @example
     * HTTPHeadersConvenience.normalize('Content-Type'); // 'content-type'
     * HTTPHeadersConvenience.normalize(EHTTPHeaders.Authorization); // 'authorization'
     */
    public static normalize(header: EHTTPHeaders | string): string {
        return header.toLowerCase();
    }

    /**
     * Converts a username and password pair into a Base64-encoded Basic authentication token.
     *
     * @param token - A tuple of type `[login, password]` containing the username
     * and password to be encoded.
     * 
     * @returns A Base64-encoded string representing the Basic authentication token.
     * 
     * @example
     * HTTPHeadersConvenience.makerToBasicToken(['username', 'password']); // 'dXNlcm5hbWU6cGFzc3dvcmQ='
     */
    private static makerToBasicToken(token: [string, string]): string {
        return Buffer.from(token.join(':')).toString('base64');
    }

}