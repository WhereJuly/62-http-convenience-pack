'use strict';

import { TMIMEExtensions, TMIMEGroups, TMIMETypeArray, TMIMETypesRegistryGeneric, TSource } from '@src/core/mime2/types.js';

// WRITE: Should I write checking the uniqueness of the MIME types and extensions?
// Probably yes for at least MIME Types. For extensions probably not.
// WRITE: Should I normalize all the type an extension inputs to lower case?
// WRITE: Should I normalize the extensions to "."-prefixed?
export function MIMETypesGenericRegistryFactory<GTSource extends readonly (TSource)[]>(mimeTypes: GTSource): TMIMETypesRegistryGeneric<GTSource> {
    return Object.fromEntries(
        mimeTypes.map(([type, group, extension]) => [
            type, { type, group, extension },
        ])
    ) as TMIMETypesRegistryGeneric<GTSource>;
}

export function MIMEGroupsFactory(mimeTypes: TMIMETypeArray) {
    return Object.fromEntries(
        mimeTypes.map(([_, group]) => [group, group])
    ) as TMIMEGroups;
}

export function MIMEExtensionsFactory(mimeTypes: TMIMETypeArray) {
    return Object.fromEntries(
        mimeTypes.map(([_, __, extension]) => [extension, extension])
    ) as TMIMEExtensions;
}


