'use strict';

/**
 * The basic interface used within the package or for custom use cases.
 */
export interface IHTTPStatus {
    code: number;
    message: string;
}

/**
 * Enum contains groups of HTTP status codes.
 * 
 * Comply with [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110#section-15) as of June 2022.
 * The groups are named 'classes' there. Here resort to 'groups' to avoid messing with usual 'class'. 
 * 
 * Autocompleting.
 * Used in methods {@link HTTPStatusesConvenience.inGroup}, {@link HTTPStatusesConvenience.ofGroup} 
 * or for custom use cases.
 * 
 * @see {@link GROUPED_STATUS_CODES}
 * 
 * @example
 * ```typescript
 * console.log(EHTTPStatusCodeGroups.INFO) // 'info'
 * ```
 */
export enum EHTTPStatusCodeGroups {
    INFO = 'info',
    CLIENTERR = 'clienterr',
    SERVERERR = 'servererr',
    SUCCESS = 'success',
    REDIRECT = 'redirect',
}

/**
 * The list of allowed HTTP status codes grouped by HTTP status code group.
 * 
 * Comply with [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110#section-15) as of June 2022.
 * 
 * Taken from {@link https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml}.
 * 
 * Autocompleting. 
 * Used in methods {@link HTTPStatusesConvenience.inGroup}, {@link HTTPStatusesConvenience.ofGroup} 
 * 
 */
export const GROUPED_STATUS_CODES = {
    [EHTTPStatusCodeGroups.INFO]: [100, 101, 102, 103] as const,
    [EHTTPStatusCodeGroups.SUCCESS]: [200, 201, 202, 203, 204, 205, 206, 207, 208, 226] as const,
    [EHTTPStatusCodeGroups.REDIRECT]: [300, 301, 302, 303, 304, 305, 307, 308] as const,
    [EHTTPStatusCodeGroups.CLIENTERR]: [400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 421, 422, 423, 424, 425, 426, 428, 429, 431, 451] as const,
    [EHTTPStatusCodeGroups.SERVERERR]: [500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511] as const,
} as const;

export type TStatusCodeGroups = {
    [key in EHTTPStatusCodeGroups]: typeof GROUPED_STATUS_CODES[key][number];
};

/**
 * The list of allowed HTTP statuses objects: code and message.
 * 
 * Comply with [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110#section-15) as of June 2022.
 * Taken from {@link https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml}.
 * 
 * Autocompleting. 
 * 
 * @example
 * ```typescript
 * console.log(HTTPStatuses[200]) // { code: 200, message: 'OK' }
 * console.log(HTTPStatuses[404].message) // 'Not Found'
 * console.log(HTTPStatuses[404].code)' // 404
 * ```
 */
export const HTTP_STATUSES: { [key in TStatusCodeGroups[EHTTPStatusCodeGroups]]: IHTTPStatus } = {
    100: { code: 100, message: 'Continue' },
    101: { code: 101, message: 'Switching Protocols' },
    102: { code: 102, message: 'Processing' },
    103: { code: 103, message: 'Early Hints' },
    200: { code: 200, message: 'OK' },
    201: { code: 201, message: 'Created' },
    202: { code: 202, message: 'Accepted' },
    203: { code: 203, message: 'Non-Authoritative Information' },
    204: { code: 204, message: 'No Content' },
    205: { code: 205, message: 'Reset Content' },
    206: { code: 206, message: 'Partial Content' },
    207: { code: 207, message: 'Multi-Status' },
    208: { code: 208, message: 'Already Reported' },
    226: { code: 226, message: 'IM Used' },
    300: { code: 300, message: 'Multiple Choices' },
    301: { code: 301, message: 'Moved Permanently' },
    302: { code: 302, message: 'Found' },
    303: { code: 303, message: 'See Other' },
    304: { code: 304, message: 'Not Modified' },
    305: { code: 305, message: 'Use Proxy' },
    307: { code: 307, message: 'Temporary Redirect' },
    308: { code: 308, message: 'Permanent Redirect' },
    400: { code: 400, message: 'Bad Request' },
    401: { code: 401, message: 'Unauthorized' },
    402: { code: 402, message: 'Payment Required' },
    403: { code: 403, message: 'Forbidden' },
    404: { code: 404, message: 'Not Found' },
    405: { code: 405, message: 'Method Not Allowed' },
    406: { code: 406, message: 'Not Acceptable' },
    407: { code: 407, message: 'Proxy Authentication Required' },
    408: { code: 408, message: 'Request Timeout' },
    409: { code: 409, message: 'Conflict' },
    410: { code: 410, message: 'Gone' },
    411: { code: 411, message: 'Length Required' },
    412: { code: 412, message: 'Precondition Failed' },
    413: { code: 413, message: 'Content Too Large' },
    414: { code: 414, message: 'URI Too Long' },
    415: { code: 415, message: 'Unsupported Media Type' },
    416: { code: 416, message: 'Range Not Satisfiable' },
    417: { code: 417, message: 'Expectation Failed' },
    421: { code: 421, message: 'Misdirected Request' },
    422: { code: 422, message: 'Unprocessable Content' },
    423: { code: 423, message: 'Locked' },
    424: { code: 424, message: 'Failed Dependency' },
    425: { code: 425, message: 'Too Early' },
    426: { code: 426, message: 'Upgrade Required' },
    428: { code: 428, message: 'Precondition Required' },
    429: { code: 429, message: 'Too Many Requests' },
    431: { code: 431, message: 'Request Header Fields Too Large' },
    451: { code: 451, message: 'Unavailable For Legal Reasons' },
    500: { code: 500, message: 'Internal Server Error' },
    501: { code: 501, message: 'Not Implemented' },
    502: { code: 502, message: 'Bad Gateway' },
    503: { code: 503, message: 'Service Unavailable' },
    504: { code: 504, message: 'Gateway Timeout' },
    505: { code: 505, message: 'HTTP Version Not Supported' },
    506: { code: 506, message: 'Variant Also Negotiates' },
    507: { code: 507, message: 'Insufficient Storage' },
    508: { code: 508, message: 'Loop Detected' },
    510: { code: 510, message: 'Not Extended' },
    511: { code: 511, message: 'Network Authentication Required' },
};
