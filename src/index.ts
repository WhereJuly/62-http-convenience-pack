'use strict';

import {
    EHTTPMethods as _EHTTPMethods, type THTTPMethodsConstraint as _THTTPMethodsConstraint
} from './core/methods/methods.types.js';

import { default as _HTTPMethodsConvenience } from './core/methods/HTTPMethodsConvenience.js';

export namespace HCP {
    export import EMethods = _EHTTPMethods;
    export type TMethodsConstraint = _THTTPMethodsConstraint;
    export class Methods extends _HTTPMethodsConvenience { };
}

// HTTP Methods
export { default as HTTPMethodsConvenience } from './core/methods/HTTPMethodsConvenience.js';
export { EHTTPMethods, type THTTPMethodsConstraint } from './core/methods/methods.types.js';

// HTTP Statuses
export { IHTTPStatus, EHTTPStatusCodeGroups, GROUPED_STATUS_CODES, StatusCodeGroups, THTTPStatuses } from './core/statuses/statuses.types.js';
export { default as HTTPStatusesConvenience } from './core/statuses/HTTPStatusesConvenience.js';

// WRITE: HTTP MIME Types