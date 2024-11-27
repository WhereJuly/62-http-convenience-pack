'use strict';

import { MIME_TYPES_ESSENTIAL } from './types/essential.types.js';
import { TExtendedMIMETypes } from './utility.types.js';

export const MIMExtensionInapplicable = 'inapplicable';

export default class HTTPMIMETypesConvenience<GMIMEType, GMIMEExtension, GMIMEGroup> {

    private static extended: TExtendedMIMETypes<any, any, any> | null = null;

    public static get types(): typeof MIME_TYPES_ESSENTIAL & TExtendedMIMETypes<any, any, any> {
        return !this.extended ? MIME_TYPES_ESSENTIAL : { ...MIME_TYPES_ESSENTIAL, ...this.extended };
    }

    public static extend<GMIMEType extends string, GMIMEExtension, GMIMEGroup>(customExtended: TExtendedMIMETypes<GMIMEType, GMIMEExtension, GMIMEGroup>): void {
        this.extended = customExtended;
    }

}
