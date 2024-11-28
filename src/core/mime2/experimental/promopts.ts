'use strict';

// ---

// I have the following constant
export const BuiltInMIMETypesSource = [
    // Text
    ['text/plain', 'TEXT', '.txt'],
    ['text/html', 'TEXT', '.html'],
    ['text/css', 'TEXT', '.css'],
] as const;

type TSource = readonly [string, string, string];

// And the following types

type TMIMETypeObject<T extends TSource> = {
    type: T[0];
    group: T[1];
    extension: T[2];
};

type TMIMETypeRecord<T extends readonly (TSource)[]> = {
    [K in T[number][0]]: TMIMETypeObject<[K, Extract<T[number], [K, string, string]>[1], Extract<T[number], [K, string, string]>[2]]>;
};

export type TMIMETypeArray = typeof BuiltInMIMETypesSource;

export type TMIMETypesRegistryGeneric<GTSource extends readonly (TSource)[]> = TMIMETypeRecord<GTSource>;

// export type TMIMETypesRegistry = TMIMETypeRecord<TMIMETypeArray>;

// The TMIMETypeArray is rigidly contains BuiltInMIMETypesSource constant content.
// I need to create the TMIMETypesRegistry type that could accept the constant of the same
// shape as TMIMETypeArray but with different content.
// As for example `fixture` constant that follows.

const fixture = [
    ['custom/json', 'json', '.json'],
    ['custom/plain', 'txt', '.txt'],
] as const;

// Example usage:
// type FixtureRegistry = TMIMETypesRegistryGeneric<typeof fixture>;

// Now I have TMIMETypesRegistryGeneric type that could accept the different constant.
// I make the factory function MIMETypesGenericRegistryFactory to produce typed MIME Types registries from
// different source constants like `fixture`.
// Here is the factory function:
export function MIMETypesGenericRegistryFactory<GTSource extends readonly (TSource)[]>(mimeTypes: GTSource): TMIMETypesRegistryGeneric<GTSource> {
    return Object.fromEntries(
        mimeTypes.map(([type, group, extension]) => [
            type, { type, group, extension },
        ])
    ) as TMIMETypesRegistryGeneric<GTSource>;
}

// Now I try to use the factory function:
const MIME_TYPES_EXTENDED = MIMETypesGenericRegistryFactory<typeof fixture>(fixture);
console.log(MIME_TYPES_EXTENDED['custom/json']);
// But I get the error on `(fixture)` part

// The error says:
/*
Argument of type 'readonly [readonly ["custom/json", "json", ".json"], readonly ["custom/plain", "txt", ".txt"]]' is not assignable to parameter of type 'readonly [string, string, string]'.
  Source has 2 element(s) but target requires 3.ts(2345)
const fixture: readonly [readonly ["custom/json", "json", ".json"], readonly ["custom/plain", "txt", ".txt"]]
*/

// Now the error is fixed.
// And I have the different issue.

// I create two constants like this
export const MIME_TYPES_BUILTIN = MIMETypesGenericRegistryFactory<typeof BuiltInMIMETypesSource>(BuiltInMIMETypesSource);
// and `MIME_TYPES_EXTENDED from the above.
// I have a class with `types()` getter 

// I would like to type `types()` getter return value to reflect it to be of both
// MIME_TYPES_BUILTIN and MIME_TYPES_EXTENDED types.
// Can it be done in a generic way?

// I changed the class to use MIME_TYPES_EXTENDED as one of the return types.
// Here is how it looks.

/* eslint-disable @typescript-eslint/no-empty-object-type */
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

    public static extend<T extends readonly TSource[]>(types: TMIMETypesRegistryGeneric<T>): void {
        this.extended = types;
    }
}

// But my issue is `MIME_TYPES_EXTENDED` is only defined for the example above.
// In reality I only know that it will be of type `TMIMETypesRegistryGeneric` with some
// content matching `TSource` shape. Can replace `MIME_TYPES_EXTENDED` type here with
// something that would combine `MIME_TYPES_BUILTIN` and `TMIMETypesRegistryGeneric<TSource>`?