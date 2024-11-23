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

    // NB: No use to create an instance without custom methods. The constructor should be used to initialize the class with custom methods.
    constructor(customMethods: GECustomMethods) {
        this.valid = { ...EHTTPMethods, ...customMethods };
    }

    public static isValid(maybeMethod: string | string[]): boolean {
        const expected = Object.values(EHTTPMethods);
        const given = Array.isArray(maybeMethod) ? maybeMethod : [maybeMethod];

        return given.every((input: string) => { return expected.includes(input.toUpperCase() as EHTTPMethods); });
    }

    public static isAllowed(given: EHTTPMethods, allowed: [EHTTPMethods], shouldThrow: boolean = false): boolean {
        // WRITE: implement this method
        // throw if !isValid && shouldThrow
        return false;
    }

    public static normalize(maybeMethod: string): EHTTPMethods {
        // WRITE: implement this method

        // throw if !isValid
        // normalize to UpperCase
        return '' as any;
    }

    // WARNING: --- Here come instance methods.

    public isValid(maybeMethod: string | string[]): boolean {
        return HTTPMethodsConvenience.isValid(maybeMethod);
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



}