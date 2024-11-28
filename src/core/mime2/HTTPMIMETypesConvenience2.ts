'use strict';

import { MIME_TYPES_BUILTIN } from '@src/core/mime2/builtin.constants.js';
import { TMIMETypeArray, TMIMETypesRegistry } from '@src/core/mime2/types.js';

export const MIMExtensionInapplicable = 'inapplicable';

export default class HTTPMIMETypesConvenience2 {

    private static extended: unknown;

    public static get types(): unknown {
        return !this.extended ? MIME_TYPES_BUILTIN : {};
    }

    // Use to create MIME Types Registry constants. Usually for extended types.
    public static createMIMETypes(mimeTypes: TMIMETypeArray): TMIMETypesRegistry {
        return Object.fromEntries(
            mimeTypes.map(([type, group, extension]) => [
                type, { type, group, extension },
            ])
        ) as TMIMETypesRegistry;
    }

}
