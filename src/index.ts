'use strict';

import {
    EHTTPMethods as _EHTTPMethods,
    default as _HTTPMethodsConvenience,
    type TCustomHTTPMethodsConstraint as _TCustomHTTPMethodsConstraint
} from './core/methods/HTTPMethodsConvenience.js';


export namespace HCP {
    export import EMethods = _EHTTPMethods;
    export type TMethodsConstraint = _TCustomHTTPMethodsConstraint;
    export class Methods extends _HTTPMethodsConvenience { };
}

export { EHTTPMethods, default as HTTPMethodsConvenience, type TCustomHTTPMethodsConstraint } from './core/methods/HTTPMethodsConvenience.js';