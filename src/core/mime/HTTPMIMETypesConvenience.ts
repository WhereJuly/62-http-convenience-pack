'use strict';

import { MIME_TYPES_ESSENTIAL } from '@src/core/mime/types/essential.types.js';
import { TExtendedMIMETypes } from '@src/core/mime/utility.types.js';

export const MIMExtensionInapplicable = 'inapplicable';

export default class HTTPMIMETypesConvenience {

    private static extended: TExtendedMIMETypes<any> | null = null;

    public static get types(): typeof MIME_TYPES_ESSENTIAL & TExtendedMIMETypes<any> {
        return !this.extended ? MIME_TYPES_ESSENTIAL : { ...MIME_TYPES_ESSENTIAL, ...this.extended };
    }

    public static extend<GMIMEType extends string>(customExtended: TExtendedMIMETypes<GMIMEType>): void {
        this.extended = customExtended;
    }

}
