'use strict';

// NB: HTTP Methods Module
export { default as HTTPMethodsConvenience } from './core/methods/HTTPMethodsConvenience.js';
export { EHTTPMethods, type THTTPMethodsConstraint } from './core/methods/methods.types.js';

// NB: HTTP Statuses Module
export { IHTTPStatus, EHTTPStatusCodeGroups, GROUPED_STATUS_CODES, StatusCodeGroups, THTTPStatuses } from './core/statuses/statuses.types.js';
export { default as HTTPStatusesConvenience } from './core/statuses/HTTPStatusesConvenience.js';

/**
 * NB: MIME Types Module
 * 
 * These are for advanced usage. Despite being exported they are not the 
 * part of the published interface.
 */
export {
    TSource, TMIMETypeObject, TMIMETypeRecord, TMIMETypeArray, TMIMETypesRegistryGeneric,
    TMIMEGroups, TMIMEExtensions
} from './core/mime/types.js';

// These are public API
export {
    default as HTTPMIMETypesConvenience, EIsValidAttributes, EMIMETypeRecordAttributes,
    MIMExtensionInapplicable,
} from './core/mime/HTTPMIMETypesConvenience.js';

// These are public API
export { MIME_TYPES_BUILTIN, MIME_TYPES_GROUPS_BUILTIN, MIME_TYPES_EXTENSIONS_BUILTIN } from './core/mime/builtin.constants.js';

// These are advanced public API
export { MIMETypesGenericRegistryFactory, MIMEGroupsFactory, MIMEExtensionsFactory } from './core/mime/factories.js';

// Package common member
export { default as HTTPConveniencePackException } from './exceptions/HTTPConveniencePack.exception.js'; 