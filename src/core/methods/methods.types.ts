'use strict';

/**
 * The HTTP methods enums supertype to define custom HTTP methods.
 */
export type TCustomHTTPMethodsConstraint = Record<string, string>;

/**
 * The standard HTTP methods enum.
 * 
 * Comply with [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110#methods)
 * published in June 2022.
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
