'use strict';

import { MIME_TYPES_BUILTIN } from '@src/core/mime2/builtin.constants.js';
import { TMIMETypesRegistry } from '@src/core/mime2/types.js';

export const MIMExtensionInapplicable = 'inapplicable';

export default class HTTPMIMETypesConvenience2 {

    private static extended: unknown;

    public static get types(): TMIMETypesRegistry {
        return !this.extended ? MIME_TYPES_BUILTIN : {} as TMIMETypesRegistry;
    }


}

