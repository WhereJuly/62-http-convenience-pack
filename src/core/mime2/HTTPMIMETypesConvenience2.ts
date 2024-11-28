'use strict';

import { BuiltInMIMETypesSource } from '@src/core/mime2/source/builtin.mime.js';
import { TMIMETypeArray, TMIMETypesRegistry } from '@src/core/mime2/types.js';

export const MIMExtensionInapplicable = 'inapplicable';

export default class HTTPMIMETypesConvenience2 {

    private static builtin: TMIMETypesRegistry = HTTPMIMETypesConvenience2.createMIMETypes(BuiltInMIMETypesSource);
    private static extended: unknown;

    public static get types(): unknown {
        return !this.extended ? HTTPMIMETypesConvenience2.builtin : {};
    }

    // Use to create MIME Types Registry constants.
    public static createMIMETypes(mimeTypes: TMIMETypeArray): TMIMETypesRegistry {
        return Object.fromEntries(
            mimeTypes.map(([type, group, extension]) => [
                type, { type, group, extension },
            ])
        ) as TMIMETypesRegistry;
    }

}
