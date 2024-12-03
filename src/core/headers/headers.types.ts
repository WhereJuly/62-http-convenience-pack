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
 * The HTTP Header Groups enum.
 */
export enum EHTTPHeaderGroups {
    Request = 'request',
    Response = 'response',
}

/**
 * @redundant This seems redundant.
 * 
 * The HTTP Authentication Scheme enum.
 * 
 * NB: For the beginning only basic and Bearer authentication schemes support is standardized.
 * The rest can be accustomed for by Custom scheme, that is user defined.
 * 
 * @see {@link HTTPHeadersConvenience.make}
 */
export enum EHTTPAuthenticationScheme {
    Basic = 'Basic', // NB: these two could be used as values to prepend a token value.
    Bearer = 'Bearer',
    Custom = 'custom',
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
