'use strict';

/**
 * Comply with [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110#methods)
 */
export enum EHTTPMethods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH',
    OPTIONS = 'OPTIONS',
    HEAD = 'HEAD',
    TRACE = 'TRACE',
}

export default class HTTPMethodsConvenience<GECustomMethods extends { [key: string]: string; } = {}> {

    private valid: EHTTPMethods | GECustomMethods;

    constructor(customMethods: GECustomMethods) {
        this.valid = { ...EHTTPMethods, ...customMethods };
    }

    public isValid(maybeMethod: string): boolean {
        // WRITE: implement this method calling the static isValid method.
        return false;
    }
    
    public normalize(maybeMethod: string): EHTTPMethods | GECustomMethods {
        // WRITE: implement this method calling the static normalize method.
        // throw if not in enum
        // normalize to UpperCase
        return '' as any;
    }

    // WRITE: polymorphic method to check if verb or array of methods is allowed.
    public isAllowed(methods: EHTTPMethods, allowed: [EHTTPMethods | GECustomMethods]): boolean {
        // WRITE: implement this method calling the static normalize method.
        return false;
    }

    public static normalize(maybeMethod: string): EHTTPMethods {
        // WRITE: implement this method
        
        // throw if !isValid
        // normalize to UpperCase
        return '' as any;
    }

    public static isValid(maybeMethod: string): boolean {
        // Retrieve values from EHTTPMethods and validate maybeMethod against those.
        // WRITE: implement this method
        return false;
    }

    public static isAllowed(methods: EHTTPMethods, allowed: [EHTTPMethods], shouldThrow: boolean = false): boolean {
        // WRITE: implement this method
        // throw if !isValid && shouldThrow
        return false;
    }

}