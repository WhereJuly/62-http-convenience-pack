'use strict';

import { BuiltInMIMETypes } from '@src/core/mime/revised/builtin-2.mime.js';

// WARNING: experimentation stub
const _types = [
    ['application/json', 'json', '.json'],
    ['text/plain', 'txt', '.txt'],
] as const; // Mark as const for literal types

// type MIMETypeArray = typeof types;

type MIMETypeArray = typeof BuiltInMIMETypes;

// --- MIMEObject

type MIMETypeObject<T extends [string, string, string]> = {
    type: T[0];
    group: T[1];
    extension: T[2];
};

type MIMETypeRecord<T extends readonly (readonly [string, string, string])[]> = {
    [K in T[number][0]]: MIMETypeObject<[K, Extract<T[number], [K, string, string]>[1], Extract<T[number], [K, string, string]>[2]]>;
};

type MIMERecord = MIMETypeRecord<MIMETypeArray>;

const MIME_TYPES = Object.fromEntries(
    BuiltInMIMETypes.map(([type, group, extension]) => [
        type,
        { type, group, extension },
    ])
) as MIMERecord;

// --- MIME Groups

type MIMEGroupRecord<T extends readonly (readonly [string, string, string])[]> = {
    [G in T[number][1]]: G; // Maps group keys to their own value
};


type MIMEGroup = MIMEGroupRecord<MIMETypeArray>;

const MIME_GROUPS: MIMEGroup = Object.fromEntries(
    BuiltInMIMETypes.map(([_, group]) => [group, group])
) as MIMEGroup;

// --- MIME Extensions

type MIMEExtensionsRecord<T extends readonly (readonly [string, string, string])[]> = {
    [E in T[number][2]]: E; // Maps extension keys to their own value
};

type MIMEExtensions = MIMEExtensionsRecord<MIMETypeArray>;

const MIME_EXTENSIONS: MIMEExtensions = Object.fromEntries(
    BuiltInMIMETypes.map(([_, __, extension]) => [extension, extension])
) as MIMEExtensions;

// --- Usage

// MIME Types
console.log(MIME_TYPES['application/json']);
console.log(MIME_TYPES['application/json'].type); // Output: 'json'

// MIME Groups
console.log(MIME_GROUPS.FONT); // Output: 'application/json'

// MIME Extensions
console.log(MIME_EXTENSIONS['.json']); // Output: '.json'
console.log(MIME_EXTENSIONS['.txt']);  // Output: '.txt'

// Explore: Get mime types grouped and selectable by group with autocomplete.
// Explore: try to apply use cases (methods) from test file to this solution.
// Explore: try to apply use cases from readme file to this solution.
