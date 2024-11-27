'use strict';

import { describe, expect, it } from 'vitest';

import HTTPMIMETypesConvenience from '@src/core/mime/HTTPMIMETypesConvenience.js';
import { MIME_TYPES_ESSENTIAL } from '@src/core/mime/types/essential.types.js';
import { EMIMEExtensions, EMIMEGroups } from '@src/core/mime/types/common.mime.js';
import { MIME_TYPES_POPULAR } from '@src/core/mime/types/popular.types.js';

describe('HTTPMIMETypesConvenienceTest', () => {

    it('The static HTTPMIMETypesConvenience object should exist', () => {
        const actual = HTTPMIMETypesConvenience;

        expect(actual).toBeDefined();
        expect(actual.types).toEqual(MIME_TYPES_ESSENTIAL);
        expect(actual.extend).toBeInstanceOf(Function);
        expect(actual.reset).toBeInstanceOf(Function);
    });

    it('+static extend(), +get isExtended: Should add the extended types and check it', () => {
        const actual = HTTPMIMETypesConvenience;

        // Check .extend() with POJO
        actual.extend({
            'application/vnd.example.custom': {
                type: 'application/vnd.example.custom',
                extension: 'custom' as EMIMEExtensions,
                group: 'custom' as EMIMEGroups,
            },
        });

        // Check .extend() with the correctly typed const
        actual.extend(MIME_TYPES_POPULAR);

        expect(actual.isExtended).toEqual(true);
    });

    it('+static reset(): check the class is extended ', () => {
        const actual = HTTPMIMETypesConvenience;
        actual.reset();

        expect(actual.isExtended).toEqual(false);

        console.dir(actual.types);
    });

    // Assert: extend the MIME types with custom ones.
    // Assert: ofGroup
    // Assert: inGroup
    // Assert: inList (with and without `list` parameter)
    // Assert: isValid (check against built-in and extended types, alias for inList with no `list` parameter)
    // Assert: findBy(attribute: EAttribute, value: string): TMIMETypeEntry<GMIMEType, GMIMEExtension, GMIMEGroup> | null
    // Assert: get isExtended
    // Assert: get groups
    // Assert: reset()
    // Assert: enum autocompletion & enum values for all the enums, essential and popular.

});
