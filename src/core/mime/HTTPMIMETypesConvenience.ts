/* eslint-disable @typescript-eslint/no-empty-object-type */

'use strict';

import { MIME_TYPES_BUILTIN } from '@src/core/mime/builtin.constants.js';
import { BuiltInMIMETypesSource } from '@src/core/mime/source/builtin.mime.js';
import { TMIMETypeObject, TMIMETypesRegistryGeneric, TSource } from '@src/core/mime/types.js';

enum EMIMETypeRecordAttributes {
    TYPE = 'type',
    GROUP = 'group',
    EXTENSION = 'extension'
}

export const MIMExtensionInapplicable = 'inapplicable';

export enum EIsValidAttributes {
    TYPE = EMIMETypeRecordAttributes.TYPE,
    EXTENSION = EMIMETypeRecordAttributes.EXTENSION
}

export default class HTTPMIMETypesConvenience {
    
    private static extended: TMIMETypesRegistryGeneric<any> | null = null;

    public static get types(): TMIMETypesRegistryGeneric<typeof BuiltInMIMETypesSource> &
        (typeof HTTPMIMETypesConvenience.extended extends TMIMETypesRegistryGeneric<any>
            ? typeof HTTPMIMETypesConvenience.extended
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
     * The method validates the provided MIME Type attribute value
     * against the values from {@link HTTPMIMETypesConvenience.type} getter.
     * 
     * The actual attribute to compare against is defined by {@link EIsValidAttributes}.
     * 
     * @static
     * 
     * @param {string} value - The MIME Type attribute value to validate.
     * For extensions validation will accept extensions with or without dot (`.json`, `gz`).
     * @param {EIsValidAttributes} attribute - The attribute to validate against.
     * @default EIsValidAttributes.TYPE
     * 
     * @returns {boolean} `true` if the value is valid for the provided attribute, otherwise `false`.
     * 
     * @example Implicit attribute validation (defaults to TYPE)
     * ```typescript
     * const isValid = HTTPMIMETypesConvenience.isValid('application/json');
     * console.log(isValid); // true
     * ```
     * 
     * @example Explicit `EXTENSION` attribute validation
     * ```typescript
     * const isValidExtension = HTTPMIMETypesConvenience.isValid('.json', EIsValidAttributes.EXTENSION);
     * console.log(isValidExtension); // true 
     * ```
     */
    public static isValid(value: string, attribute?: EIsValidAttributes): boolean {
        const attributeName = attribute || EMIMETypeRecordAttributes.TYPE;

        // NB: If attributeName is EXTENSION, normalize the value to include dot (if not present). 
        const normalized = attributeName === EMIMETypeRecordAttributes.TYPE ? value :
            attributeName === EIsValidAttributes.EXTENSION && value.includes('.') ? value : `.${value}`;

        return Object.values(HTTPMIMETypesConvenience.types).some((type: TMIMETypeObject<TSource>) => {
            return normalized === type[attributeName];
        });
    }

    /**
     * Checks if a given MIME type name is among a list of type names.
     * 
     * @static
     * 
     * @param {string} typeNameToFind - The MIME type name to search for.
     * @param {string[]} typeNames - An optional array of type names to search within. 
     * Defaults to all type names from {@link HTTPMIMETypesConvenience.types}.
     * 
     * @returns {boolean} `true` if the type name is found in `typeNames`, otherwise `false`.
     * 
     * @example Check if a type name is among the default registry
     * 
     * ```typescript
     * const isAmongDefault = HTTPMIMETypesConvenience.isAmong('application/json');
     * console.log(isAmongDefault); // true
     * ```
     * 
     * @example Check if a type name is among a custom list
     * ```typescript
     * const customTypes = ['application/xml', 'text/html'];
     * const isAmongCustom = HTTPMIMETypesConvenience.isAmong('text/html', customTypes);
     * console.log(isAmongCustom); // true
     * ```
     */
    public static isAmong(typeNameToFind: string, typeNames?: string[]): boolean {
        const where = typeNames ?? Object.keys(HTTPMIMETypesConvenience.types);

        return where.some((typeName: string) => { return typeNameToFind === typeName; });
    }

    /**
     * Determines if a given MIME type belongs to a provided group existing in
     * the MIME Types Registry {@link HTTPMIMETypesConvenience.types}.
     * 
     * The method first looks for the given MIME type in the registry. If found,
     * it checks the found MIME type group matches the provided group.
     * 
     * @static
     * 
     * @param {string} typeName - The MIME type name to check.
     * @param {TMIMEGroups | string} group - The group to check against.
     * 
     * @returns {boolean} `true` if the MIME type belongs to the provided group, otherwise `false`.
     * 
     * @example Check if a MIME type is in a specific group
     * 
     * ```typescript
     * const isInGroup = HTTPMIMETypesConvenience.inGroup('application/json', MIME_TYPES_GROUPS_BUILTIN.APPLICATION);
     * console.log(isInGroup); // true or false based on the registry
     * ```
     */
    public static inGroup(typeName: string, group: string): boolean {
        const found = HTTPMIMETypesConvenience.findBy(typeName);

        return found?.group === group;
    }

    /**
     * Retrieves the group of a given MIME type from
     * the MIME Types Registry {@link HTTPMIMETypesConvenience.types}.
     * 
     * @static
     * 
     * @param {string} typeName - The MIME type name for which to retrieve the group.
     * 
     * @returns {string | null} The group of the MIME type if found, otherwise `null`.
     * 
     * @example Retrieve the group for a specific MIME type
     * 
     * ```typescript
     * const group = HTTPMIMETypesConvenience.ofGroup('application/json');
     * console.log(group); // 'APPLICATION' or null if not found
     * ```
     */
    public static ofGroup(typeName: string): string | null {
        const found = HTTPMIMETypesConvenience.findBy(typeName);

        return found ? found.group : null;
    }

    /**
     * This method is undocumented. Not officially available yet.
     * @todo Suggest use cases. TDD implement.
     */
    public static pickBy(value: string): (TMIMETypeObject<TSource>)[] | null {
        const multiple = Object.values(HTTPMIMETypesConvenience.types)
            .filter((typeRecord: TMIMETypeObject<TSource>) => { return typeRecord.type === value; });

        return multiple ?? null;
    }

    /**
     * WARNING: So far implement only for Type attribute.
     * @return {TMIMETypeObject<TSource> | null}
     */
    private static findBy(value: string): TMIMETypeObject<TSource> | null {
        const found = Object.values(HTTPMIMETypesConvenience.types)
            .find((typeRecord: TMIMETypeObject<TSource>) => { return typeRecord.type === value; });

        return found ?? null;
    }

}
