'use strict';

// IMPORTANT: For the future if categorizing methods will be needed.

/**
 * @considered
 */
const _HTTPMethods = {
    GET: ['safe', 'idempotent', 'cacheable'],
    HEAD: ['safe', 'idempotent', 'cacheable'],
    POST: ['non_idempotent', 'cacheable'], // Cacheable if explicitly stated
    PUT: ['idempotent'],
    DELETE: ['idempotent'],
    PATCH: ['non_idempotent'],
    OPTIONS: ['idempotent', 'preflight'],
    TRACE: ['idempotent', 'preflight', 'special_purpose'],
    CONNECT: ['special_purpose'],
};

/**
 * @considered
 */
enum _EHTTPMethodsGroups {
    SAFE = "safe",
    IDEMPOTENT = "idempotent",
    NON_IDEMPOTENT = "non_idempotent",
    CACHEABLE = "cacheable",
    PREFLIGHT = "preflight",
    SPECIAL_PURPOSE = "special_purpose",
}
