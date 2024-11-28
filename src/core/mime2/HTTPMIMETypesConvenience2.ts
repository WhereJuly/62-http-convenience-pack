/* eslint-disable @typescript-eslint/no-empty-object-type */

'use strict';

import { MIME_TYPES_BUILTIN } from '@src/core/mime2/builtin.constants.js';
import { BuiltInMIMETypesSource } from '@src/core/mime2/source/builtin.mime.js';
import { TMIMETypesRegistryGeneric, TSource } from '@src/core/mime2/types.js';

export const MIMExtensionInapplicable = 'inapplicable';

export default class HTTPMIMETypesConvenience2 {
    private static extended: TMIMETypesRegistryGeneric<any> | null = null;

    public static get types(): TMIMETypesRegistryGeneric<typeof BuiltInMIMETypesSource> &
        (typeof HTTPMIMETypesConvenience2.extended extends TMIMETypesRegistryGeneric<any>
            ? typeof HTTPMIMETypesConvenience2.extended
            : {}) {
        return this.extended
            ? { ...MIME_TYPES_BUILTIN, ...this.extended }
            : MIME_TYPES_BUILTIN;
    }

    public static get isExtended(): boolean {
        return !!this.extended;
    }

    public static extend<T extends readonly TSource[]>(types: TMIMETypesRegistryGeneric<T>): void {
        this.extended = types;
    }

}
