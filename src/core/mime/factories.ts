'use strict';

import { TMIMEExtensions, TMIMEGroups, TMIMETypeArray, TMIMETypesRegistryGeneric, TSource } from '@src/core/mime/types.js';

// WRITE: Should I write checking the uniqueness of the MIME types and extensions?
// Probably yes for at least MIME Types. For extensions probably not.
// WRITE: Should I normalize all the type an extension inputs to lower case?
// WRITE: Should I normalize the extensions to "."-prefixed?

/**
 * Creates an auto-completable generic MIME Types Registry from the provided array 
 * of MIME type definitions.
 * 
 * @template GTSource
 * @param {GTSource} mimeTypes - Array of MIME type definitions.
 * @returns {TMIMETypesRegistryGeneric<GTSource>} A registry mapping types to their attributes.
 * 
 * @example @see {MIME_TYPES_BUILTIN} creation in `./builtin.constants.ts`
 */
export function MIMETypesGenericRegistryFactory<GTSource extends readonly (TSource)[]>(mimeTypes: GTSource): TMIMETypesRegistryGeneric<GTSource> {
    return Object.fromEntries(
        mimeTypes.map(([type, group, extension]) => [
            type, { type, group, extension },
        ])
    ) as TMIMETypesRegistryGeneric<GTSource>;
}

/**
 * Creates an auto-completable MIME groups constant from the provided array of MIME type definitions.
 *
 * @param {TMIMETypeArray} mimeTypes - Array of MIME type definitions.
 * @returns {TMIMEGroups} A registry mapping groups to themselves.
 * 
 * @example @see {MIME_TYPES_GROUPS_BUILTIN} creation in `./builtin.constants.ts`
 */
export function MIMEGroupsFactory(mimeTypes: TMIMETypeArray) {
    return Object.fromEntries(
        mimeTypes.map(([_, group]) => [group, group])
    ) as TMIMEGroups;
}

/**
 * Creates a MIME extensions registry from the provided array of MIME type definitions.
 *
 * @param {TMIMETypeArray} mimeTypes - Array of MIME type definitions.
 * @returns {TMIMEExtensions} A registry mapping extensions to themselves.
 * 
 * @example @see {MIME_TYPES_EXTENSIONS_BUILTIN} creation in `./builtin.constants.ts`
 */
export function MIMEExtensionsFactory(mimeTypes: TMIMETypeArray) {
    return Object.fromEntries(
        mimeTypes.map(([_, __, extension]) => [extension, extension])
    ) as TMIMEExtensions;
}


