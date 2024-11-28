'use strict';

import { BuiltInMIMETypes } from '@src/core/mime2/builtin.mime.js';
import { MIMERecord, MIMETypeArray } from '@src/core/mime2/types-and-functions.js';

export const MIMExtensionInapplicable = 'inapplicable';

export default class HTTPMIMETypesConvenience2 {

    private static builtin: MIMERecord = HTTPMIMETypesConvenience2.createMIMETypes(BuiltInMIMETypes);
    private static extended: unknown;

    public static get types(): unknown {
        return !this.extended ? HTTPMIMETypesConvenience2.builtin : {};
    }

    // Use to create the extended MIME types.
    // REFACTOR: Rename MIMERecord type to TMIMETypeRecord.
    public static createMIMETypes(mimeTypes: MIMETypeArray): MIMERecord {
        return Object.fromEntries(
            mimeTypes.map(([type, group, extension]) => [
                type, { type, group, extension },
            ])
        ) as MIMERecord;
    }

}
