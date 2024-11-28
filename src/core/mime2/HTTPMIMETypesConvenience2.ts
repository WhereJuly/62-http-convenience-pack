'use strict';

import { BuiltInMIMETypes } from '@src/core/mime2/builtin.mime.js';
import { TMIMETypeArray, TMIMETypes } from '@src/core/mime2/types.js';

export const MIMExtensionInapplicable = 'inapplicable';

export default class HTTPMIMETypesConvenience2 {

    private static builtin: TMIMETypes = HTTPMIMETypesConvenience2.createMIMETypes(BuiltInMIMETypes);
    private static extended: unknown;

    public static get types(): unknown {
        return !this.extended ? HTTPMIMETypesConvenience2.builtin : {};
    }

    // Use to create the extended MIME types.
    // REFACTOR: Rename MIMERecord type to TMIMETypeRecord.
    public static createMIMETypes(mimeTypes: TMIMETypeArray): TMIMETypes {
        return Object.fromEntries(
            mimeTypes.map(([type, group, extension]) => [
                type, { type, group, extension },
            ])
        ) as TMIMETypes;
    }

}
