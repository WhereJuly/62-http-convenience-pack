'use strict';

import { MIME_TYPES_BUILTIN } from '@src/core/mime/types/builtin.mime.js';
import { TExtendedMIMETypes } from '@src/core/mime/utility.types.js';

export const MIMExtensionInapplicable = 'inapplicable';

export default class HTTPMIMETypesConvenience {

    private static extended: TExtendedMIMETypes<any> | null = null;

    public static get types(): typeof MIME_TYPES_BUILTIN & TExtendedMIMETypes<any> {
        return !this.extended ? MIME_TYPES_BUILTIN : { ...MIME_TYPES_BUILTIN, ...this.extended };
    }


    public static get isExtended(): boolean {
        return !!this.extended;
    }

    /**
     * Add the custom MIME types to the built-in ones.
     * 
     * @param {TExtendedMIMETypes<GMIMEType>} extended 
     * 
     * @example Provide the predefined `const` object typed 
     * @see {@link MIME_TYPES_POPULAR} for a definition example.
     * ```typescript
     * HTTPMIMETypesConvenience.extend(MIME_TYPES_POPULAR);
     * ```
     * 
     * @example Provide the POJO. It will require to cast `extension` and `group`
     * types .
     * ```typescript
     * actual.extend({
     *   'application/vnd.example.custom': {
     *     type: 'application/vnd.example.custom',
     *     extension: 'custom' as EMIMEExtensions,
     *     group: 'custom' as EMIMEGroups,
     *   },
     * });
     * ```
     */
    public static extend<GMIMEType extends string>(extended: TExtendedMIMETypes<GMIMEType>): void {
        this.extended = extended;
    }

    /**
     * Reset to the unextended state. Apply when need to restore the built-in MIME types.
     *
     * @example
     * ```typescript
     * HTTPMIMETypesConvenience.reset();
     * ```
     */
    public static reset(): void {
        this.extended = null;
    }

    /**
     * Validate if the given MIME type is a built-in or extended MIME type.
     *
     * @param {string} maybeType - The MIME type to check.
     * @return {boolean} `true` if `maybeType` is a valid MIME type.
     *
     * @example
     * ```typescript
     * const isValidMIME = HTTPMIMETypesConvenience.isValid('application/json'); // true
     * ```
     * Same as {@link HTTPMIMETypesConvenience.inList} with no `list` parameter
     */
    public static isValid(maybeType: string): boolean {
        return !!Object.keys(HTTPMIMETypesConvenience.types).find((type: string) => {
            return type === maybeType;
        });
    }

}
