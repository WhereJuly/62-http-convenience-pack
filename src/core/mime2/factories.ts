'use strict';

import { TMIMEExtensions, TMIMEGroups, TMIMETypeArray, TMIMETypesRegistry } from '@src/core/mime2/types.js';

// Use to create MIME Types Registry constants. Usually for extended types.
export function MIMETypesRegistryFactory(mimeTypes: TMIMETypeArray): TMIMETypesRegistry {
    return Object.fromEntries(
        mimeTypes.map(([type, group, extension]) => [
            type, { type, group, extension },
        ])
    ) as TMIMETypesRegistry;
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


