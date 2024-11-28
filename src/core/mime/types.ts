'use strict';

import { BuiltInMIMETypesSource } from '@src/core/mime/source/builtin.mime.js';

/**
 * The basic structure for the MIME Types sources: a triplet of type, group, and extension.
 * 
 * @see {@link BuiltInMIMETypesSource} as the source example.
 */
export type TSource = readonly [string, string, string];

/**
 * The basic MIME Types object structure: type, group, and extension.
 */
export type TMIMETypeObject<T extends TSource> = {
    type: T[0];
    group: T[1];
    extension: T[2];
};

// WARNING: --- MIME Types Registry types follow ---

/**
 * The basic MIME Type Registry record type.
 * 
 * @example
 * ```typescript
 * {'application/json': { type: 'application/json', group: 'APPLICATION', extension: '.json' } }.
 * ```
 */
export type TMIMETypeRecord<T extends readonly (TSource)[]> = {
    [K in T[number][0]]: TMIMETypeObject<[K, Extract<T[number], [K, string, string]>[1], Extract<T[number], [K, string, string]>[2]]>;
};

/**
 * REFACTOR: Should this type be removed?
 */
export type TMIMETypeArray = typeof BuiltInMIMETypesSource;

/**
 * The basic MIME Types Generic Registry type.
 */
export type TMIMETypesRegistryGeneric<GTSource extends readonly (TSource)[]> = TMIMETypeRecord<GTSource>;

// WARNING: --- MIME Types groups types ---

// WRITE: The groups should be generic as well?
type TMIMEGroupRecord<T extends readonly (TSource)[]> = {
    [G in T[number][1]]: G; // Maps group keys to their own value
};

export type TMIMEGroups = TMIMEGroupRecord<TMIMETypeArray>;

// WARNING: --- MIME Types extensions types ---

// WRITE: The extensions should be generic as well?
type TMIMEExtensionsRecord<T extends readonly (TSource)[]> = {
    [E in T[number][2]]: E; // Maps extension keys to their own value
};

export type TMIMEExtensions = TMIMEExtensionsRecord<TMIMETypeArray>;