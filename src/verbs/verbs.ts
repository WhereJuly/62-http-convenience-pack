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

export default class HTTPVerbsConvenience<GECustomVerbs extends { [key: string]: string; } = {}> {

    private valid: EHTTPVerbs | GECustomVerbs;

    constructor(customVerbs: GECustomVerbs) {
        this.valid = { ...EHTTPVerbs, ...customVerbs };
    }

    public isValid(maybeVerb: string): boolean {
        // WRITE: implement this method calling the static isValid method.
        return false;
    }
    
    public normalize(maybeVerb: string): EHTTPVerbs | GECustomVerbs {
        // WRITE: implement this method calling the static normalize method.
        // throw if not in enum
        // normalize to UpperCase
        return '' as any;
    }

    // WRITE: polymorphic method to check if verb or array of verbs is allowed.
    public isAllowed(verbs: EHTTPVerbs, allowed: [EHTTPVerbs | GECustomVerbs]): boolean {
        // WRITE: implement this method calling the static normalize method.
        return false;
    }

    public static normalize(maybeVerb: string): EHTTPVerbs {
        // WRITE: implement this method
        
        // throw if !isValid
        // normalize to UpperCase
        return '' as any;
    }

    public static isValid(maybeVerb: string): boolean {
        // Retrieve values from EHTTPVerbs and validate maybeVerb against those.
        // WRITE: implement this method
        return false;
    }

    public static isAllowed(verbs: EHTTPVerbs, allowed: [EHTTPVerbs]): boolean {
        // WRITE: implement this method
        // throw if !isValid
        return false;
    }

}