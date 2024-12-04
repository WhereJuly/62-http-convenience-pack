'use strict';

import fixtures from '@tests/foundation/.ancillary/fixtures/index.js';

import { describe, expect, it } from 'vitest';

import HTTPHeadersConvenience from '@src/core/headers/HTTPHeadersConvenience.js';
import { EHTTPHeaders } from '@src/index.js';
import BuiltInExtractors from '@src/core/headers/BuiltInExtractors.js';

describe('HTTPHeadersConvenienceTest', () => {

    it('The static HTTPHeadersConvenience object should exist', () => {
        const actual = HTTPHeadersConvenience;

        expect(actual).toBeDefined();
        expect(actual.make).toBeInstanceOf(Function);
        expect(actual.extract).toBeInstanceOf(Function);
        expect(actual.hasValue).toBeInstanceOf(Function);
    });

    describe('+static extract: Should extract the header value from headers object', () => {

        const extractor = (value: string) => `custom-${value}`;

        it.each(dataProvider_extract())('Case #%# $name', (data) => {
            const actual = HTTPHeadersConvenience.extract(data.fixture.headers, data.fixture.extract, data.fixture.extractor);

            expect(actual).toEqual(data.expected);
        });

        function dataProvider_extract() {
            return [
                { name: 'Empty headers object', fixture: { headers: {}, extract: EHTTPHeaders.Accept }, expected: null },
                { name: 'Missing header', fixture: { headers: fixtures.general, extract: 'non-existent' }, expected: null },
                { name: 'String literal header (lower case) among general headers [normalize]', fixture: { headers: fixtures.general, extract: 'accept' }, expected: fixtures.general[EHTTPHeaders.Accept] },
                { name: 'Enum header (Proper case) among general headers [normalize]', fixture: { headers: fixtures.general, extract: EHTTPHeaders.AcceptEncoding }, expected: fixtures.general[EHTTPHeaders.AcceptEncoding] },
                { name: 'Custom extractor function', fixture: { headers: fixtures.general, extract: EHTTPHeaders.AcceptEncoding, extractor }, expected: extractor(fixtures.general[EHTTPHeaders.AcceptEncoding]) },
            ];
        }

    });

    describe('+static extract: Should use BuiltInExtractors extractors', () => {

        it.each(dataProvider_extract())('Case #%# $name', (data) => {
            const actual = HTTPHeadersConvenience.extract(data.fixture.headers, data.fixture.extract, data.fixture.extractor);

            expect(actual).toEqual(data.expected);
        });

        function dataProvider_extract() {

            return [
                { name: 'Bearer', fixture: { headers: fixtures.general, extract: EHTTPHeaders.Authorization, extractor: BuiltInExtractors.token }, expected: 'the-bearer-token' },
            ];
        }

    });


    // WRITE: Assert: normalize returns lowercase;
    // WRITE: Assert: static extract with built-in extractor function;
    // WRITE: Assert: BuiltInExtractors class with various extractors: assert each extractor returns expected value;
    // WRITE: Assert: BuiltInExtractors to have set method to add all or the selected built-in extractors at once on HTTPHeadersConvenience.

});
