'use strict';

import { BuiltInMIMETypesSource } from '@src/core/mime2/source/builtin.mime.js';

export type TSource = readonly [string, string, string];

type TMIMETypeObject<T extends TSource> = {
    type: T[0];
    group: T[1];
    extension: T[2];
};

// WARNING: --- MIME Types Registry types ---

export type TMIMETypeRecord<T extends readonly (TSource)[]> = {
    [K in T[number][0]]: TMIMETypeObject<[K, Extract<T[number], [K, string, string]>[1], Extract<T[number], [K, string, string]>[2]]>;
};

/**
 * WRITE: Then I will implement it as generic to allow to create the MIMI Types Registries
 * for the different input MIME Types sources.
 */
export type TMIMETypeArray = typeof BuiltInMIMETypesSource;

export type TMIMETypesRegistryGeneric<GTSource extends readonly (TSource)[]> = TMIMETypeRecord<GTSource>;

// WARNING: --- MIME Types groups types ---

type TMIMEGroupRecord<T extends readonly (TSource)[]> = {
    [G in T[number][1]]: G; // Maps group keys to their own value
};

export type TMIMEGroups = TMIMEGroupRecord<TMIMETypeArray>;

// WARNING: --- MIME Types extensions types ---

type TMIMEExtensionsRecord<T extends readonly (TSource)[]> = {
    [E in T[number][2]]: E; // Maps extension keys to their own value
};

export type TMIMEExtensions = TMIMEExtensionsRecord<TMIMETypeArray>;