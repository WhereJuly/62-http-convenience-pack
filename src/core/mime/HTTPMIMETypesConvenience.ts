'use strict';

import { ExtendedMIMETypes, MIME_TYPES_ESSENTIAL } from './types/essential.types.js';

export default class HTTPMIMETypesConvenience<GMIMEType, GMIMEExtension, GMIMEGroup> {

    private static extended: ExtendedMIMETypes<any, any, any> | null = null;

    public static get types(): typeof MIME_TYPES_ESSENTIAL & ExtendedMIMETypes<any, any, any> {
        return !this.extended ? MIME_TYPES_ESSENTIAL : { ...MIME_TYPES_ESSENTIAL, ...this.extended };
    }

    public static extend<GMIMEType extends string, GMIMEExtension, GMIMEGroup>(customExtended: ExtendedMIMETypes<GMIMEType, GMIMEExtension, GMIMEGroup>): void {
        this.extended = customExtended;
    }

}

// HTTPMIMETypesConvenience.extend()