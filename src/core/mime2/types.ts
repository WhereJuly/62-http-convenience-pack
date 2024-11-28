'use strict';

import { BuiltInMIMETypes } from '@src/core/mime2/builtin.mime.js';

type TMIMETypeObject<T extends [string, string, string]> = {
    type: T[0];
    group: T[1];
    extension: T[2];
};

type TMIMETypeRecord<T extends readonly (readonly [string, string, string])[]> = {
    [K in T[number][0]]: TMIMETypeObject<[K, Extract<T[number], [K, string, string]>[1], Extract<T[number], [K, string, string]>[2]]>;
};

export type TMIMETypeArray = typeof BuiltInMIMETypes;

export type TMIMETypes = TMIMETypeRecord<TMIMETypeArray>;