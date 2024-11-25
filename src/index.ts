'use strict';

import {
    EHTTPMethods as _EHTTPMethods,
    default as _HTTPMethodsConvenience,
    type TCustomHTTPMethodsConstraint as _TCustomHTTPMethodsConstraint
} from './core/methods/HTTPMethodsConvenience.js';

export namespace HTTPConveniencePack {
    export import EHTTPMethods = _EHTTPMethods;
    export type TCustomHTTPMethodsConstraint = _TCustomHTTPMethodsConstraint;
    export class HTTPMethodsConvenience extends _HTTPMethodsConvenience { };
}