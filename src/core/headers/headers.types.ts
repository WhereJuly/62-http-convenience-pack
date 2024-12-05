'use strict';

/**
 * The HTTP Headers enum.
 * 
 * @note The separation into request and response headers is informal, just for partial clarity.
 */
export enum EHTTPHeaders {
    // Request Headers
    Authorization = 'Authorization',
    ContentType = 'Content-Type', // Can be both request and response header
    Accept = 'Accept',
    AcceptEncoding = 'Accept-Encoding',
    Cookie = 'Cookie',
    XRequestedWith = "X-Requested-With",

    // Response Headers
    ContentLength = 'Content-Length',
    SetCookie = 'Set-Cookie',
    CacheControl = 'Cache-Control',
    ETag = 'ETag',
    Location = 'Location',
    AccessControlAllowOrigin = 'Access-Control-Allow-Origin',
}

/**
 * @internal
 * 
 * The HTTP Header Groups enum. Probably redundant for now.
 * @see {@link _HTTP_HEADERS_GROUPED}
 */
enum _EHTTPHeaderGroups {
    Request = 'request',
    Response = 'response',
}

/**
 * @internal
 * 
 * The HTTP Headers grouped typed constant.
 * 
 * WARNING: The grouping by request / response seems not to have a practical use case.
 * Will see if any useful grouping idea appears in the future.
 */
const _HTTP_HEADERS_GROUPED = {
    [_EHTTPHeaderGroups.Request]:
        [EHTTPHeaders.Authorization, EHTTPHeaders.ContentType, EHTTPHeaders.XRequestedWith,
        EHTTPHeaders.Accept, EHTTPHeaders.AcceptEncoding, EHTTPHeaders.Cookie],
    [_EHTTPHeaderGroups.Response]:
        [EHTTPHeaders.ContentType, EHTTPHeaders.ContentLength, EHTTPHeaders.SetCookie,
        EHTTPHeaders.CacheControl, EHTTPHeaders.ETag, EHTTPHeaders.Location,
        EHTTPHeaders.AccessControlAllowOrigin]
} as const;
