'use strict';

/**
 * Represents cache control directives used in HTTP headers to manage server-side caching behavior.
 * 
 * Directives:
 * - `public`: Cacheable by any cache.
 * - `private`: Cacheable only by the client.
 * - `no-cache`: Requires revalidation before serving cached responses.
 * - `no-store`: Prevents caching entirely.
 * - `max-age=<seconds>`: Specifies freshness duration for responses.
 * - `s-maxage=<seconds>`: Like `max-age`, but applies to shared caches.
 * - `must-revalidate`: Ensures stale responses are revalidated.
 * - `proxy-revalidate`: Ensures shared caches revalidate stale responses.
 * - `immutable`: Indicates the response will not change.
 * - `stale-while-revalidate=<seconds>`: Allows stale responses during async revalidation.
 * - `stale-if-error=<seconds>`: Allows stale responses if revalidation fails.
 */
export enum ECacheControlServer {
    Public = 'public',
    Private = 'private',
    NoCache = 'no-cache',
    NoStore = 'no-store',
    MaxAge = 'max-age=<seconds>',
    SMaxAge = 's-maxage=<seconds>',
    MustRevalidate = 'must-revalidate',
    ProxyRevalidate = 'proxy-revalidate',
    Immutable = 'immutable',
    StaleWhileRevalidate = 'stale-while-revalidate=<seconds>',
    StaleIfError = 'stale-if-error=<seconds>'
}

/**
 * Represents cache control directives used in HTTP headers to manage client-side caching behavior.
 * 
 * - 'no-cache': Forces the cache to revalidate the resource with the server before serving it.
 * - 'no-store': Prevents the request or response from being stored in any cache.
 * - 'max-age=<seconds>': Specifies the maximum age of a cached response that the client is willing to accept.
 * - 'max-stale[=<seconds>]': Allows the client to accept stale responses, optionally specifying the maximum staleness (in seconds).
 * - 'min-fresh=<seconds>': Requires the response to be fresh for at least the specified number of seconds.
 * - 'only-if-cached': Instructs the cache to return a response only if it is already cached.
 */
export enum ECacheControlClient {
    NoCache = 'no-cache',
    NoStore = 'no-store',
    MaxAge = 'max-age=<seconds>',
    MaxStale = 'max-stale[=<seconds>]',
    MinFresh = 'min-fresh=<seconds>',
    OnlyIfCached = 'only-if-cached'
}