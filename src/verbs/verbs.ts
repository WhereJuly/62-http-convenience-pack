'use strict';

/**
 * Comply with [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110#methods)
 */
export enum EHTTPVerbs {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH',
    OPTIONS = 'OPTIONS',
    HEAD = 'HEAD',
    TRACE = 'TRACE',
}

export class HTTPVerbsConvenience<GECustomVerbs extends { [key: string]: string; } = {}> {

    private valid: EHTTPVerbs | GECustomVerbs;

    constructor(customVerbs: GECustomVerbs) {
        this.valid = { ...EHTTPVerbs, ...customVerbs };
    }

    public isValid(maybeVerb: string): boolean { }

    public normalize(maybeVerb: string): EHTTPVerbs | GECustomVerbs {
        // throw if not in enum
        // normalize to UpperCase
    }

    public isAllowed(verbs: EHTTPVerbs, allowed: [EHTTPVerbs | GECustomVerbs]): boolean { }

    public static normalize(maybeVerb: string): EHTTPVerbs {
        // throw if !isValid
        // normalize to UpperCase
    }

    public static isValid(maybeVerb: string): boolean {
        // Retrieve values from EHTTPVerbs and validate maybeVerb against those.
    }

    public static isAllowed(verbs: EHTTPVerbs, allowed: [EHTTPVerbs]): boolean {
        // throw if !isValid
    }

}