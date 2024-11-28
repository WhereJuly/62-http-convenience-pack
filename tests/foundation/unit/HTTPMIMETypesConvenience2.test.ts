'use strict';

import { describe, expect, it } from 'vitest';

import HTTPMIMETypesConvenience2, { MIMExtensionInapplicable } from '@src/core/mime2/HTTPMIMETypesConvenience2.js';
import { BuiltInMIMETypesSource } from '@src/core/mime2/source/builtin.mime.js';
import { MIME_TYPES_BUILTIN, MIME_TYPES_EXTENSIONS_BUILTIN, MIME_TYPES_GROUPS_BUILTIN } from '@src/core/mime2/builtin.constants.js';
import { MIMEExtensionsFactory, MIMEGroupsFactory, MIMETypesRegistryFactory } from '@src/core/mime2/factories.js';

describe('HTTPMIMETypesConvenience2Test', () => {

    it.skip('Console output for documentation snippets ', () => {
        console.dir(HTTPMIMETypesConvenience2.types['application/gzip'].extension);
        console.dir(MIME_TYPES_BUILTIN['application/gzip'].group);
        console.dir(MIME_TYPES_BUILTIN['application/gzip'].type);
    });

    it('The static HTTPMIMETypesConvenience object should exist', () => {
        const actual = HTTPMIMETypesConvenience2;

        expect(actual).toBeDefined();
        expect(MIMETypesRegistryFactory).toBeInstanceOf(Function);
        // expect(actual.types).toEqual(MIME_TYPES_BUILTIN);
        // expect(actual.extend).toBeInstanceOf(Function);
        // expect(actual.reset).toBeInstanceOf(Function);
    });

    it('MIMETypesRegistryFactory(): Should create the built-in MIME Types Registry with autocomplete', () => {
        const actual = MIMETypesRegistryFactory(BuiltInMIMETypesSource);

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

    // it('+static extend(), +get isExtended: Should add the extended types and check it', () => {
    //     const actual = HTTPMIMETypesConvenience;

    //     // Check .extend() with POJO
    //     actual.extend({
    //         'application/vnd.example.custom': {
    //             type: 'application/vnd.example.custom',
    //             extension: 'custom' as EMIMEExtensions,
    //             group: 'custom' as EMIMEGroups,
    //         },
    //     });

    //     // Check .extend() with the correctly typed const
    //     actual.extend(MIME_TYPES_POPULAR);

    //     expect(actual.isExtended).toEqual(true);
    // });

    // it('+static reset(): check the class is extended ', () => {
    //     const actual = HTTPMIMETypesConvenience;
    //     actual.reset();

    //     expect(actual.isExtended).toEqual(false);
    // });

    // it('+static isValid(): check the provided type is a valid one against built-in and extended ', () => {
    //     const actual = HTTPMIMETypesConvenience;

    //     expect(actual.isValid(EBuiltInMIMETypes.AUDIO_MPEG)).toEqual(true);
    //     expect(actual.isValid('image/png')).toEqual(true); // NB: Check it accepts strings
    //     expect(actual.isValid('invalid')).toEqual(false);

    //     actual.extend(MIME_TYPES_POPULAR);

    //     expect(actual.isValid(EPopularMIMETypes.APPLICATION_JAR)).toEqual(true);

    //     actual.reset();
    // });

    // it('+static isAmong(): check the provided type is among the default or provided types objects ', () => {
    //     const actual = HTTPMIMETypesConvenience;

    //     // Check against `HTTPMIMETypesConvenience.types`
    //     expect(actual.isAmong(EBuiltInMIMETypes.AUDIO_MPEG)).toEqual(true);
    //     expect(actual.isAmong(EPopularMIMETypes.APPLICATION_JAR)).toEqual(false); 
    //     expect(actual.isAmong('invalid')).toEqual(false); // NB: Check it accepts strings

    //     expect(actual.isAmong(EBuiltInMIMETypes.AUDIO_MPEG, GROUPED_MIME_TYPES_BUILTIN.AUDIO)).toEqual(true);
    //     expect(actual.isAmong(EBuiltInMIMETypes.AUDIO_MPEG, GROUPED_MIME_TYPES_BUILTIN.APPLICATION)).toEqual(false);

    // });


    // Assert: inList (with and without `list` parameter)
    // Assert: ofGroup
    // Assert: inGroup
    // Assert: pickBy(attribute: EAttribute [type after the object keys], value: string): TMIMETypeEntry<GMIMEType, GMIMEExtension, GMIMEGroup> | null
    // Assert: get groups
    // Assert: enum autocompletion & enum values for all the enums, essential and popular.
    // Assert: create the typed MIME types constant, extend with it and see the autocomplete.


});
