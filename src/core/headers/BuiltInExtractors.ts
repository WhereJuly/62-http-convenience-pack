'use strict';

export type TExtractorFunction<GExtractorReturns = string> = (value: string) => GExtractorReturns;

export enum ETokenSchemes {
    Bearer = "Bearer",
    Basic = "Basic",
    APIKey = "APIKey",
    // NB: OAuth1 could be supported upon request. Implement transform with OAuth1CredentialsVO.
    // OAuth1 = "OAuth",
    // NB: Digest could be supported upon request. Implement transform with DigestCredentialsVO.
    // Digest = "Digest", 
}

export default class BuiltInExtractors {

    /**
     * Splits a string into an array of substrings.
     * By default uses `,` delimiter, optionally using a specified delimiter.
     * 
     * @param {string} maybeString - The string to split.
     * @param {string} by - The delimiter to use for splitting. Defaults to ','.
     * 
     * @returns An array of substrings. Returns an empty array if `value` is not a string.
     * 
     * @example
     * ```typescript
     * BuiltInExtractors.array('a,b,c'); // ['a', 'b', 'c']
     * BuiltInExtractors.array('a|b|c', '|'); // ['a', 'b', 'c']
     * BuiltInExtractors.array(''); // ['']
     * BuiltInExtractors.array(null); // []
     * ```
     * NB: May require optional `by` to split 'login:password' in Basic scheme
     */
    public static array(maybeString: string, by: string = ','): string[] {
        return typeof maybeString === 'string' ? maybeString.split(by) : [];
    }

    /**
     * Attempts to parse a string into a `Date` object.
     * If the string is invalid, returns `null`.
     * 
     * @param {string} maybeDateString - The string to be parsed into a `Date` object.
     * @returns A `Date` object fro a valid date string, otherwise `null`.
     * 
     * @example
     * // Valid date string
     * console.log(BuiltInExtractors.date('2024-12-03')); // 2024-12-03T00:00:00.000Z
     * 
     * // Invalid date string or not a string
     * console.log(BuiltInExtractors.date(123 as any)); // null
     */
    public static date(maybeDateString: string): Date | null {
        const date = new Date(typeof maybeDateString === 'string' ? maybeDateString : '');

        return !isNaN(date.getTime()) ? date : null;
    }

    /**
     * Decodes a Base64-encoded string into a UTF-8 string. Returns an empty string if:
     * - The input is not a valid Base64 string.
     * - The Base64 string cannot be decoded into valid UTF-8 characters.
     *
     * @param {string} maybeBase64String - The input string to decode.
     * @returns The decoded UTF-8 string, or an empty string if the input is invalid 
     * or contains invalid characters.
     *
     * @example
     * console.log(BuiltInExtractors.b64('dXNlcjpwYXNz')); // 'login:pass' (valid Base64)
     * console.log(BuiltInExtractors.b64('invalid'));     // '' (not a valid Base64 string)
     * console.log(BuiltInExtractors.b64(123 as unknown as any));  // '' (not a string)
     */
    public static b64(maybeBase64String: string): string {
        const base64Pattern = /^[A-Za-z0-9+/=]+$/;
        const isValid = typeof maybeBase64String === 'string' && base64Pattern.test(maybeBase64String);

        if (!isValid) { return ''; }

        const decoded = Buffer.from(maybeBase64String, 'base64').toString('utf-8');

        /**
         * NB: The presence of '\uFFFD' MAY indicate that the decoded string 
         * contains invalid characters hence `maybeBase64String` is not a valid Base64 string.
         */
        if (decoded.includes('\uFFFD')) { return ''; }

        return decoded;
    }

    // NB: [string, string] for Basic scheme: [login, password]

    /**
     * Extracts and returns the Authorization header token **value**
     * Automatically detects the token data scheme among built-in schemes
     * @see {@link ETokenSchemes}.
     * 
     * @param {string} maybeToken The token string, potentially including a scheme.
     * @returns A string or a tuple containing the scheme and the extracted token value.
     * 
     * @example
     * // The Basic scheme extracts the `[login, password]` type tuple.
     * console.log(BuiltInExtractors.token('Basic dXNlcm5hbWU6cGFzc3dvcmQ=')); // ['username', 'password']
     * 
     * // Bearer scheme extracts the token value removing `Bearer ` prefix.
     * console.log(BuiltInExtractors.token('Bearer abc123')); // 'abc123'
     * 
     * @example
     * // APIKey scheme: same as Bearer scheme
     * console.log(BuiltInExtractors.token('APIKey xyz456')); // 'xyz456'
     * 
     * @example
     * // Unknown scheme return the Authorization header value as is.
     * console.log(BuiltInExtractors.token('unknown scheme')); // 'unknown scheme'
     */
    public static token(maybeToken: string): string | string[] {
        const valueExtractor = (value: any) => value;
        const basic = (value: string) => { return this.array(this.b64(value), ':'); };
        const tokenExtractors: { [key in ETokenSchemes]: TExtractorFunction<string | string[]> } = {
            [ETokenSchemes.Basic]: basic,
            [ETokenSchemes.Bearer]: valueExtractor,
            [ETokenSchemes.APIKey]: valueExtractor,
        };

        // const regex = /^(Bearer|Basic|APIKey)\s+(.+)$/;
        const regex = new RegExp(`^(${Object.values(ETokenSchemes).join('|')})\\s+(.+)$`);
        const match = maybeToken.match(regex);

        const [scheme, value] = match ? [match[1] as ETokenSchemes || null, match[2] || maybeToken] : [null, maybeToken];

        if (!scheme) { return value; }

        const tokenExtractor = tokenExtractors[scheme] ?? valueExtractor;

        return tokenExtractor(value);
    }

}
