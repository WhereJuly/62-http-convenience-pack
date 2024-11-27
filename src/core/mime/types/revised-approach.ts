'use strict';

const types = [
    ['application/json', 'json', '.json'],
    ['text/plain', 'txt', '.txt'],
] as const; // Mark as const for literal types

type MIMETypeArray = typeof types;

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
    types.map(([type, group, extension]) => [
        type,
        { type, group, extension },
    ])
) as MIMERecord;

// Now accessing 'group' should work correctly:
console.log(MIME_TYPES['application/json']);
console.log(MIME_TYPES['application/json'].type); // Output: 'json'

// Explore: Get mime types grouped and selectable by group with autocomplete.
// Explore: try to apply use cases (methods) from test file to this solution.
// Explore: try to apply use cases from readme file to this solution.
