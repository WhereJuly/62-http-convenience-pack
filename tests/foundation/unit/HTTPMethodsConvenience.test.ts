'use strict';

import { assert, describe, expect, it } from 'vitest';

import HTTPMethodsConvenience, { EHTTPMethods } from '@src/core/methods/HTTPMethodsConvenience.js';
import HTTPConveniencePackException from '@src/exceptions/HTTPConveniencePack.exception.js';

const custom = { LINK: 'LINK', UNLINK: 'UNLINK' };

describe('HTTPMethodsConvenienceTest', () => {

    it('The static HTTPMethodsConvenience object should exist', () => {
        const actual = HTTPMethodsConvenience;

        expect(actual).toBeDefined();
        expect(actual.isValid).toBeInstanceOf(Function);
        expect(actual.isAllowed).toBeInstanceOf(Function);
        expect(actual.normalize).toBeInstanceOf(Function);
    });

    it('The HTTPMethodsConvenience object instance should be of expected shape', () => {
        const actual = new HTTPMethodsConvenience({});

        expect(actual).toBeInstanceOf(HTTPMethodsConvenience);
        expect(actual.isValid).toBeInstanceOf(Function);
        expect(actual.isAllowed).toBeInstanceOf(Function);
        expect(actual.normalize).toBeInstanceOf(Function);
    });

    describe('+isValid: Static and instance methods should polymorphically return the expected value for string and array arguments', () => {

        it.each(dataProvider_is_valid_method())('Case #%# $name', async (data) => {
            const instance = new HTTPMethodsConvenience(custom);

            const actual = {
                static: HTTPMethodsConvenience.isValid(data.fixture),
                instance: instance.isValid(data.fixture),
            };

            expect(actual.static).toEqual(data.expected.static);
            expect(actual.instance).toEqual(data.expected.instance);
        });

        function dataProvider_is_valid_method() {
            return [
                { name: 'Valid string', fixture: 'POST', expected: { static: true, instance: true } },
                { name: 'Valid array', fixture: ['POST', 'OPTIONS'], expected: { static: true, instance: true } },
                { name: 'Valid custom, string', fixture: 'LINK', expected: { static: false, instance: true } },
                { name: 'Valid custom, array', fixture: ['LINK', 'UNLINK'], expected: { static: false, instance: true } },
                { name: 'Invalid string', fixture: 'invalid', expected: { static: false, instance: false } },
                { name: 'Invalid array', fixture: ['invalid', 'invalid'], expected: { static: false, instance: false } },
            ];
        }

    });

    describe('+isAllowed: Static and instance methods should return the expected value for string and array arguments', () => {

        it.each(dataProvider_is_allowed())('Case #%# $name', async (data) => {
            const instance = new HTTPMethodsConvenience(custom);

            const actual = {
                static: HTTPMethodsConvenience.isAllowed(data.fixture.given, data.fixture.allowed),
                instance: instance.isAllowed(data.fixture.given, data.fixture.allowed),
            };

            expect(actual.static).toEqual(data.expected.static);
            expect(actual.instance).toEqual(data.expected.instance);
        });

        function dataProvider_is_allowed() {
            return [
                { name: '[allowed is defined] Standard `given` is allowed', fixture: { given: EHTTPMethods.OPTIONS, allowed: Object.values(EHTTPMethods) }, expected: { static: true, instance: true } },
                { name: '[allowed is defined] `given` is not allowed', fixture: { given: 'LINK' as EHTTPMethods, allowed: Object.values(EHTTPMethods) }, expected: { static: false, instance: false } },
                { name: '[allowed is undefined] Standard `given` is allowed', fixture: { given: EHTTPMethods.OPTIONS, allowed: undefined }, expected: { static: true, instance: true } },
                { name: '[allowed is undefined] `given` is not allowed', fixture: { given: 'LINK' as EHTTPMethods, allowed: undefined }, expected: { static: false, instance: true } },
                { name: '[allowed is defined] Custom `given` is allowed', fixture: { given: 'LINK' as EHTTPMethods, allowed: Object.values(custom) as EHTTPMethods[] }, expected: { static: true, instance: true } },
                { name: '[allowed is defined] Custom `given` is not allowed', fixture: { given: 'not-allowed' as EHTTPMethods, allowed: Object.values(custom) as EHTTPMethods[] }, expected: { static: false, instance: false } },
                { name: '[allowed is undefined] Custom `given` is allowed', fixture: { given: 'LINK' as EHTTPMethods, allowed: undefined }, expected: { static: false, instance: true } },
                { name: '[allowed is undefined] Custom `given` is not allowed', fixture: { given: 'not-allowed' as EHTTPMethods, allowed: undefined }, expected: { static: false, instance: false } },
            ];
        }
    });

    describe('+normalize: Static and instance methods should return the expected value or throw', () => {

        it.each(dataProvider_normalize_static())('Case #%# $name', async (data) => {
            try {
                const actual = data.actual.normalize(data.fixture);
                expect(actual).toEqual(data.expected);
            } catch (error) {
                const actual = error as Error;
                expect(actual).toBeInstanceOf(HTTPConveniencePackException);
                expect(actual.message).toContain(data.expected);
            }
        });

        function dataProvider_normalize_static() {
            const _static = HTTPMethodsConvenience;
            const instance = new HTTPMethodsConvenience(custom);

            return [
                { name: 'Success (standard)', actual: _static, fixture: 'patch', expected: EHTTPMethods.PATCH },
                { name: 'Throw on invalid (standard)', actual: _static, fixture: 'link', expected: '"maybeMethod" argument when transformed to upper case should be a valid HTTP standard or custom method' },
                { name: 'Throw on non-string (standard)', actual: _static, fixture: {} as any, expected: 'should be a string, typeof "object" given' },
                { name: 'Success (custom)', actual: instance, fixture: 'link', expected: 'LINK' },
                { name: 'Throw on invalid (custom)', actual: instance, fixture: 'invalid', expected: '"maybeMethod" argument when transformed to upper case should be a valid HTTP standard or custom method' },
                { name: 'Throw on non-string (custom)', actual: instance, fixture: 123 as any, expected: 'should be a string, typeof "number" given' },
            ];
        }

    });

});
