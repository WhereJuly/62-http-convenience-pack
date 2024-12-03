'use strict';

/**
 * The HTTP Headers enum.
 */
export enum EHTTPHeaders {
    // Request Headers
    Authorization = 'Authorization',
    ContentType = 'Content-Type',
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
 * The HTTP Header Groups enum.
 */
export enum EHTTPHeaderGroups {
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
    [EHTTPHeaderGroups.Request]:
        [EHTTPHeaders.Authorization, EHTTPHeaders.ContentType, EHTTPHeaders.XRequestedWith,
        EHTTPHeaders.Accept, EHTTPHeaders.AcceptEncoding, EHTTPHeaders.Cookie],
    [EHTTPHeaderGroups.Response]:
        [EHTTPHeaders.ContentType, EHTTPHeaders.ContentLength, EHTTPHeaders.SetCookie,
        EHTTPHeaders.CacheControl, EHTTPHeaders.ETag, EHTTPHeaders.Location,
        EHTTPHeaders.AccessControlAllowOrigin]
} as const;
