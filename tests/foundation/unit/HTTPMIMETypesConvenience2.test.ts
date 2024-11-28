'use strict';

import { describe, expect, it } from 'vitest';

import HTTPMIMETypesConvenience2, { EIsValidAttributes, MIMExtensionInapplicable } from '@src/core/mime2/HTTPMIMETypesConvenience2.js';
import { BuiltInMIMETypesSource } from '@src/core/mime2/source/builtin.mime.js';
import { MIME_TYPES_BUILTIN, MIME_TYPES_EXTENSIONS_BUILTIN, MIME_TYPES_GROUPS_BUILTIN } from '@src/core/mime2/builtin.constants.js';
import { MIMEExtensionsFactory, MIMEGroupsFactory, MIMETypesGenericRegistryFactory } from '@src/core/mime2/factories.js';

const fixture = [
    ['custom/json', 'json', '.json'],
    ['custom/plain', 'txt', '.txt'],
] as const;

const MIME_TYPES_EXTENDED = MIMETypesGenericRegistryFactory<typeof fixture>(fixture);

describe('HTTPMIMETypesConvenience2Test', () => {

    it.skip('Console output for documentation snippets ', () => {
        console.dir(HTTPMIMETypesConvenience2.types['application/gzip'].extension);
        console.dir(MIME_TYPES_BUILTIN['application/gzip'].group);
        console.dir(MIME_TYPES_BUILTIN['application/gzip'].type);
    });

    it('The static HTTPMIMETypesConvenience object should exist', () => {
        const actual = HTTPMIMETypesConvenience2;

        expect(actual).toBeDefined();
        expect(MIMETypesGenericRegistryFactory).toBeInstanceOf(Function);
        // expect(actual.types).toEqual(MIME_TYPES_BUILTIN);
        // expect(actual.extend).toBeInstanceOf(Function);
        // expect(actual.reset).toBeInstanceOf(Function);
    });

    it('MIMETypesRegistryFactory(): Should create the built-in MIME Types Registry with autocomplete', () => {
        const actual = MIMETypesGenericRegistryFactory(BuiltInMIMETypesSource);

        expect(Object.keys(actual)).toHaveLength(BuiltInMIMETypesSource.length);
        expect(HTTPMIMETypesConvenience2.types['application/gzip'].extension).toEqual('.gz');
        expect(MIME_TYPES_BUILTIN['application/json'].extension).toEqual('.json');
    });

    it('MIMEGroupsFactory(): Should create the built-in MIME Types groups with autocomplete', () => {
        const actual = MIMEGroupsFactory(BuiltInMIMETypesSource);

        expect(Object.keys(actual)).toHaveLength(7);
        expect(MIME_TYPES_GROUPS_BUILTIN.APPLICATION).toEqual('APPLICATION');
    });

    it('MIMEExtensionsFactory(): Should create the built-in MIME Types extensions with autocomplete', () => {
        const actual = MIMEExtensionsFactory(BuiltInMIMETypesSource);

        expect(Object.keys(actual)).toHaveLength(40);
        expect(MIME_TYPES_EXTENSIONS_BUILTIN['.bmp']).toEqual('.bmp');
        expect(MIME_TYPES_EXTENSIONS_BUILTIN.inapplicable).toEqual(MIMExtensionInapplicable);
    });

    it('+static extend(), +get isExtended: Should add the extended types and check it', () => {
        const actual = HTTPMIMETypesConvenience2;

        actual.extend(MIME_TYPES_EXTENDED);

        expect(actual.isExtended).toEqual(true);
        expect(actual.types['application/gzip'].extension).toEqual('.gz');
    });

    it('+static reset(): check the class is extended ', () => {
        const actual = HTTPMIMETypesConvenience2;
        actual.reset();

        expect(actual.isExtended).toEqual(false);
    });

    describe('+static isValid(): check the provided type is a valid one against built-in and extended ', () => {

        it.each(dataProvider_is_valid_method())('Case #%# $name', (data) => {
            const convenience = HTTPMIMETypesConvenience2;

            const actual = convenience.isValid(data.fixture, data.attribute);

            expect(actual).toEqual(data.expected);
        });

        function dataProvider_is_valid_method() {
            return [
                { name: 'Valid "type" autocomplete: default', fixture: MIME_TYPES_BUILTIN['application/gzip'].type, attribute: undefined, expected: true },
                { name: 'Valid "type" autocomplete: explicit', fixture: MIME_TYPES_BUILTIN['application/ld+json'].type, attribute: EIsValidAttributes.TYPE, expected: true },
                { name: 'Valid "extension" autocomplete: explicit', fixture: MIME_TYPES_BUILTIN['application/gzip'].extension, attribute: EIsValidAttributes.EXTENSION, expected: true },
                { name: 'Valid "extension" autocomplete: explicit, no "."', fixture: 'gz', attribute: EIsValidAttributes.EXTENSION, expected: true },
                { name: 'Invalid "type" autocomplete: explicit', fixture: 'invalid-type', attribute: EIsValidAttributes.TYPE, expected: false },
                { name: 'Invalid "extension" value: explicit', fixture: 'invalid-extension', attribute: EIsValidAttributes.EXTENSION, expected: false },
            ];
        }

    });


    it('+static isAmong(): check the provided type is among the default or provided types objects ', () => {
        const actual = HTTPMIMETypesConvenience2;

        expect(actual.isAmong('application/gzip')).toEqual(true);
        expect(actual.isAmong('application/gzip', ['application/gzip', 'application/json'])).toEqual(true);
        expect(actual.isAmong('text/xml', ['application/gzip', 'application/json'])).toEqual(false);
    });


    // Assert: inList (with and without `list` parameter)
    // Assert: ofGroup
    // Assert: inGroup
    // Assert: pickBy(attribute: EAttribute [type after the object keys], value: string): TMIMETypeEntry<GMIMEType, GMIMEExtension, GMIMEGroup> | null
    // Assert: get groups
    // Assert: enum autocompletion & enum values for all the enums, essential and popular.
    // Assert: create the typed MIME types constant, extend with it and see the autocomplete.


});
