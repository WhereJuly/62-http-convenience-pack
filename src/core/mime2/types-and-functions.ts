'use strict';

import { MIMETypesRegistryFactory } from '@src/core/mime2/factories.js';
import { BuiltInMIMETypesSource } from '@src/core/mime2/source/builtin.mime.js';
import { TMIMETypesRegistry, TMIMETypeArray, TMIMEGroups } from '@src/core/mime2/types.js';

// NB: --- initial experimentation stub
const _types = [
    ['application/json', 'json', '.json'],
    ['text/plain', 'txt', '.txt'],
] as const; // Mark as const for literal types

// type MIMETypeArray = typeof types;

// NB: --- Keep so far as an initial implementation.
const MIME_TYPES = Object.fromEntries(
    BuiltInMIMETypesSource.map(([type, group, extension]) => [
        type, { type, group, extension },
    ])
) as TMIMETypesRegistry;


// WARNING: --- Success
const MIME_RECORD_EXPERIMENT = MIMETypesRegistryFactory(BuiltInMIMETypesSource);

console.log(MIME_RECORD_EXPERIMENT['application/gzip']);
console.log(MIME_RECORD_EXPERIMENT['application/gzip'].extension);

// NB: --- End experiment

// NB: --- Keep so far as an initial implementation.
const MIME_GROUPS: TMIMEGroups = Object.fromEntries(
    BuiltInMIMETypesSource.map(([_, group]) => [group, group])
) as TMIMEGroups;

// --- MIME Extensions

type MIMEExtensionsRecord<T extends readonly (readonly [string, string, string])[]> = {
    [E in T[number][2]]: E; // Maps extension keys to their own value
};

type MIMEExtensions = MIMEExtensionsRecord<TMIMETypeArray>;

const MIME_EXTENSIONS: MIMEExtensions = Object.fromEntries(
    BuiltInMIMETypesSource.map(([_, __, extension]) => [extension, extension])
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
