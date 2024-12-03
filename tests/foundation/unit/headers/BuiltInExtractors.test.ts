'use strict';

import fixtures from '@tests/foundation/.ancillary/fixtures/index.js';

import { describe, expect, it } from 'vitest';

import BuiltInExtractors from '@src/core/headers/BuiltInExtractors.js';
import { EHTTPHeaders } from '@src/index.js';

describe('BuiltInExtractorsTest', () => {

    it('The static BuiltInExtractors object should exist', () => {
        const actual = BuiltInExtractors;

        expect(actual).toBeDefined();
        expect(actual.array).toBeInstanceOf(Function);
        expect(actual.date).toBeInstanceOf(Function);
        expect(actual.b64).toBeInstanceOf(Function);
        expect(actual.token).toBeInstanceOf(Function);
    });

    describe('+static array: Should extract the array header value from string', () => {

        it.each(dataProvider_array())('Case #%# $name', (data) => {
            const actual = BuiltInExtractors.array(data.fixture.value, data.fixture.by);

            expect(actual).toEqual(data.expected);
        });

        function dataProvider_array() {
            return [
                { name: 'Valid array, comma-separated', fixture: { value: fixtures.general[EHTTPHeaders.AcceptEncoding] }, expected: (fixtures.general[EHTTPHeaders.AcceptEncoding]).split(',') },
                { name: 'Valid array, colon-separated', fixture: { value: 'login:password', by: ':' }, expected: ['login', 'password'] },
                { name: 'String, no expected separators', fixture: { value: 'something', by: ':' }, expected: ['something'] },
                { name: 'Not a string', fixture: { value: 123 as unknown as string }, expected: [] },
            ];
        }

    });

    describe('+static date: Should extract the Date object from date string', () => {
        const fixture = fixtures.general;

        it.each(dataProvider_date())('Case #%# $name', (data) => {
            const actual = BuiltInExtractors.date(data.fixture);

            expect(actual).toEqual(data.expected);
        });

        function dataProvider_date() {
            return [
                { name: 'Valid date string', fixture: fixture['Last-Modified'], expected: new Date(fixture['Last-Modified']) },
                { name: 'Invalid date string', fixture: 'not-a-date', expected: null },
                { name: 'Not a string', fixture: 123 as unknown as string, expected: null },
            ];
        }
    });

    describe('+static b64: Should decode the Base64 string', () => {
        const fixture = fixtures.b64.Authorization.split(' ')[1];

        it.each(dataProvider_b64())('Case #%# $name', (data) => {
            const actual = BuiltInExtractors.b64(data.fixture);

            expect(actual).toEqual(data.expected);
        });

        function dataProvider_b64() {
            return [
                { name: 'Valid Base64 string', fixture: fixture!, expected: 'user:pass' },
                { name: 'Invalid Base64 string', fixture: 'invalid', expected: '' },
                { name: 'Not a string', fixture: 123 as unknown as string, expected: '' },
            ];
        }

    });

    describe('+static token: Should extract the Authorization header tokens according to built-in schemes or return header value for unknown scheme', () => {

        it.each(dataProvider_token())('Case #%# $name', (data) => {
            const actual = BuiltInExtractors.token(data.fixture);

            console.log(data.fixture);
            console.log(actual);

            expect(actual).toEqual(data.expected);
        });

        function dataProvider_token() {
            const fixture = fixtures.authentication_schemes;

            return [
                { name: 'Basic', fixture: fixture.basic, expected: ['username', 'password'] },
                { name: 'Bearer', fixture: fixture.bearer, expected: 'abc123xyz456' },
                { name: 'Digest', fixture: fixture.digest, expected: fixture.digest },
                { name: 'OAuth1', fixture: fixture.oauth1, expected: fixture.oauth1 },
                { name: 'OAuth2', fixture: fixture.oauth2, expected: 'ya29.a0AfH6SMCzX6S3g0prEb1KfkIuJ4v9t9gFsKfP_Sp4QI2JpEjjGp4P7p-4lRwrG5' },
                { name: 'Unknown', fixture: fixture.unknown, expected: fixture.unknown },
            ];
        }

    });

    // WRITE: Assert: BuiltInExtractors class with various extractors: assert each extractor returns expected value;
    // WRITE: Assert: BuiltInExtractors to have set method to add all or the selected built-in extractors at once on HTTPHeadersConvenience.

});
