/* eslint-disable @typescript-eslint/no-empty-object-type */

'use strict';

import { MIME_TYPES_BUILTIN } from '@src/core/mime2/builtin.constants.js';
import { BuiltInMIMETypesSource } from '@src/core/mime2/source/builtin.mime.js';
import { TMIMETypeObject, TMIMETypesRegistryGeneric, TSource } from '@src/core/mime2/types.js';

enum EMimeTypeRecordAttributes {
    TYPE = 'type',
    GROUP = 'group',
    EXTENSION = 'extension'
}

export const MIMExtensionInapplicable = 'inapplicable';

export enum EIsValidAttributes {
    TYPE = EMimeTypeRecordAttributes.TYPE,
    EXTENSION = EMimeTypeRecordAttributes.EXTENSION
}

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

    public static reset(): void {
        this.extended = null;
    }

    /**
     * The polymorphic method to validate the provided MIME Type attribute 
     * value against the specified attribute.
     * 
     * @example 
     * ```typescript
     * isValid(value: string, attribute: EIsValidAttributes): boolean
     * ```
     */

    /**
     * The polymorphic method to validate the provided MIME Type attribute value
     * against the specified attribute from {@link EIsValidAttributes}.
     * 
     * @static
     * 
     * @param {string} value - The MIME Type attribute value to validate.
     * For extensions validation will accept extensions with or without dot (`.json`, `gz`).
     * @param {EIsValidAttributes} attribute - The attribute to validate against.
     * @default EIsValidAttributes.TYPE
     * 
     * @returns {boolean} `true` if the value is valid for the specified attribute, otherwise `false`.
     * 
     * @example Implicit attribute validation (defaults to TYPE)
     * ```typescript
     * const isValid = HTTPMIMETypesConvenience2.isValid('application/json');
     * console.log(isValid); // true
     * ```
     * 
     * @example Explicit `EXTENSION` attribute validation
     * ```typescript
     * const isValidExtension = HTTPMIMETypesConvenience2.isValid('.json', EIsValidAttributes.EXTENSION);
     * console.log(isValidExtension); // true 
     * ```
     */
    public static isValid(value: string, attribute?: EIsValidAttributes): boolean {
        const attributeName = attribute || EMimeTypeRecordAttributes.TYPE;
        // NB: If attributeName is EXTENSION, normalize the value to include dot (if not present). 
        const normalized = attributeName === EMimeTypeRecordAttributes.TYPE ? value :
            attributeName === EIsValidAttributes.EXTENSION && value.includes('.') ? value : `.${value}`;

        return !!Object.values(HTTPMIMETypesConvenience2.types).find((type: TMIMETypeObject<TSource>) => {
            return normalized === type[attributeName];
        });
    }
}
