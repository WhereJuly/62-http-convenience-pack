'use strict';

import fixtures from '@tests/foundation/.ancillary/fixtures/index.js';

import { describe, expect, it } from 'vitest';

import HTTPHeadersConvenience, { EMakerTokenSchemes, TokenSchemeUnknown } from '@src/core/headers/HTTPHeadersConvenience.js';
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

    describe('+static make: Should make an Authorization header object', () => {

        it.each(dataProvider_make())('Case #%# $name', (data) => {
            const actual = HTTPHeadersConvenience.make(EHTTPHeaders.Authorization, data.fixture.scheme, data.fixture.token);

            expect(actual).toEqual(data.expected);
        });

        function dataProvider_make() {
            return [
                { name: 'Bearer', fixture: { scheme: EMakerTokenSchemes.Bearer, token: 'token' }, expected: { [EHTTPHeaders.Authorization]: 'Bearer token' } },
                { name: 'Basic', fixture: { scheme: EMakerTokenSchemes.Basic, token: ['login', 'password'] }, expected: { [EHTTPHeaders.Authorization]: 'Basic bG9naW46cGFzc3dvcmQ=' } },
                { name: 'Unknown', fixture: { scheme: 'unknown' as EMakerTokenSchemes, token: 'any' }, expected: { [EHTTPHeaders.Authorization]: `unknown ${TokenSchemeUnknown}` } },
            ];
        }

    });

});
