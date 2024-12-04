'use strict';

import { ETokenSchemes, TExtractorFunction } from '@src/core/headers/BuiltInExtractors.js';
import { EHTTPHeaders } from '@src/core/headers/headers.types.js';

type TAuthorizationHeaderObject = { [EHTTPHeaders.Authorization]: string; };
type THeadersObject = { [key in EHTTPHeaders | string]: string; };

type TAuthorizationTokenValue = string | string[];
type TTokenValueMakerFunction = (token: TAuthorizationTokenValue) => string;

export enum EMakerTokenSchemes {
    Basic = ETokenSchemes.Basic,
    Bearer = ETokenSchemes.Bearer,
}

/**
 * The constant included in {@link HTTPHeadersConvenience.make} methods return value for
 * unknown token schemes.
 */
export const TokenSchemeUnknown = 'Error: token scheme unknown.';

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
     * @example EMakerTokenSchemes.Bearer: 
     * @see {@link HTTPHeadersConvenience.makerToBasicToken} maker function.
     * 
     * ```typescript
     * // 
     * HTTPHeadersConvenience.make(EHTTPHeaders.Authorization, EMakerTokenSchemes.Basic, "username:password"); // { Authorization: "Basic dXNlcm5hbWU6cGFzc3dvcmQ=" }
     * ```
     * @example Unsupported token scheme: returns token value that includes `Error: token scheme unknown.` 
     * @see {@link TokenSchemeUnknown}
     * 
     * ```typescript
     * HTTPHeadersConvenience.make("Authorization", "InvalidScheme", "someToken"); // { Authorization: "InvalidScheme TokenSchemeUnknown" }
     * ```
     */
    public static make(header: EHTTPHeaders.Authorization, scheme: EMakerTokenSchemes, token: TAuthorizationTokenValue, _maker?: unknown): TAuthorizationHeaderObject {
        const unchanged = (token: TAuthorizationTokenValue) => { return token as string; };
        const valueMakers: { [key in EMakerTokenSchemes]: TTokenValueMakerFunction } = {
            [EMakerTokenSchemes.Bearer]: unchanged,
            [EMakerTokenSchemes.Basic]: this.makerToBasicToken as TTokenValueMakerFunction
        };

        const valueMaker = valueMakers[scheme];
        const value = valueMaker ? valueMaker(token) : TokenSchemeUnknown;

        return { [header]: `${scheme} ${value}` };
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