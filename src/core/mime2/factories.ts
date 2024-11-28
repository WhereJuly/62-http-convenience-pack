'use strict';

import { TMIMETypeArray, TMIMETypesRegistry } from '@src/core/mime2/types.js';

// Use to create MIME Types Registry constants. Usually for extended types.
export function MIMETypesRegistryFactory(mimeTypes: TMIMETypeArray): TMIMETypesRegistry {
    return Object.fromEntries(
        mimeTypes.map(([type, group, extension]) => [
            type, { type, group, extension },
        ])
    ) as TMIMETypesRegistry;
}
