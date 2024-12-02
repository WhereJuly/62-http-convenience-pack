'use strict';

/**
 * The HTTP methods enums supertype to type custom HTTP methods enums.
 */
export type THTTPMethodsConstraint = Record<string, string>;

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
    CONNECT = 'CONNECT',
}

/**
 * The HTTP methods groups list enum.
 * 
 * @see {@link HTTPMethodInGroups}
 * 
 * REFACTOR: This is the initial implementation of grouping functionality.
 * See the analysis for potential refactoring to less repetitive implementation
 * in {@link .a&cd/methods/methods-in-groups.md}.
 * 
 */
export enum EHTTPMethodsGroupsList {
    SAFE = 'safe',
    IDEMPOTENT = 'idempotent',
    NON_IDEMPOTENT = 'non-idempotent',
    CACHEABLE = 'cacheable',
    PREFLIGHT = 'preflight',
    SPECIAL = 'special',
}

/**
 * The HTTP method belonging to groups enum.
 * 
 * @see {@link EHTTPMethodsGroupsList}
 */
export const HTTPMethodInGroups = {
    [EHTTPMethods.GET]: [EHTTPMethodsGroupsList.SAFE, EHTTPMethodsGroupsList.IDEMPOTENT, EHTTPMethodsGroupsList.CACHEABLE],
    [EHTTPMethods.HEAD]: [EHTTPMethodsGroupsList.SAFE, EHTTPMethodsGroupsList.IDEMPOTENT, EHTTPMethodsGroupsList.CACHEABLE],
    [EHTTPMethods.POST]: [EHTTPMethodsGroupsList.NON_IDEMPOTENT, EHTTPMethodsGroupsList.CACHEABLE], // Cacheable if explicitly stated
    [EHTTPMethods.PUT]: [EHTTPMethodsGroupsList.IDEMPOTENT],
    [EHTTPMethods.DELETE]: [EHTTPMethodsGroupsList.IDEMPOTENT],
    [EHTTPMethods.PATCH]: [EHTTPMethodsGroupsList.NON_IDEMPOTENT],
    [EHTTPMethods.OPTIONS]: [EHTTPMethodsGroupsList.IDEMPOTENT, EHTTPMethodsGroupsList.PREFLIGHT],
    [EHTTPMethods.TRACE]: [EHTTPMethodsGroupsList.IDEMPOTENT, EHTTPMethodsGroupsList.PREFLIGHT, EHTTPMethodsGroupsList.SPECIAL],
    [EHTTPMethods.CONNECT]: [EHTTPMethodsGroupsList.SPECIAL],
} as const;
