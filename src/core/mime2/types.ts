'use strict';

import { BuiltInMIMETypesSource } from '@src/core/mime2/source/builtin.mime.js';

type TMIMETypeObject<T extends [string, string, string]> = {
    type: T[0];
    group: T[1];
    extension: T[2];
};

// WARNING: --- MIME Types Registry types ---

type TMIMETypeRecord<T extends readonly (readonly [string, string, string])[]> = {
    [K in T[number][0]]: TMIMETypeObject<[K, Extract<T[number], [K, string, string]>[1], Extract<T[number], [K, string, string]>[2]]>;
};

/**
 * WRITE: Then I will implement it as generic to allow to create the MIMI Types Registries
 * for the different input MIME Types sources.
 */
export type TMIMETypeArray = typeof BuiltInMIMETypesSource;

export type TMIMETypesRegistry = TMIMETypeRecord<TMIMETypeArray>;

// WARNING: --- MIME Types groups types ---

type TMIMEGroupRecord<T extends readonly (readonly [string, string, string])[]> = {
    [G in T[number][1]]: G; // Maps group keys to their own value
};

export type TMIMEGroups = TMIMEGroupRecord<TMIMETypeArray>;

