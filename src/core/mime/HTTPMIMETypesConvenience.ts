'use strict';

import { MIME_TYPES_BUILTIN } from '@src/core/mime/types/builtin.mime.js';
import { TExtendedMIMETypes } from '@src/core/mime/utility.types.js';

export const MIMExtensionInapplicable = 'inapplicable';

export default class HTTPMIMETypesConvenience {

    private static extended: TExtendedMIMETypes<any> | null = null;

    public static get types(): typeof MIME_TYPES_BUILTIN & TExtendedMIMETypes<any> {
        return !this.extended ? MIME_TYPES_BUILTIN : { ...MIME_TYPES_BUILTIN, ...this.extended };
    }

    public static extend<GMIMEType extends string>(customExtended: TExtendedMIMETypes<GMIMEType>): void {
        this.extended = customExtended;
    }

    public static reset(): void {
        this.extended = null;
    }

    public static get isExtended(): boolean {
        return !!this.extended;
    }

}
