'use strict';

import { assert, describe, expect, it } from 'vitest';

import HTTPMethodsConvenience, { EHTTPMethods } from '@src/methods/HTTPMethodsConvenience.js';

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
                { name: '[allowed is defined] Custom `given` is allowed', fixture: { given: 'LINK' as EHTTPMethods, allowed: Object.values(custom) as EHTTPMethods[]}, expected: { static: true, instance: true } },
                { name: '[allowed is defined] Custom `given` is not allowed', fixture: { given: 'not-allowed' as EHTTPMethods, allowed: Object.values(custom) as EHTTPMethods[]}, expected: { static: false, instance: false } },
                { name: '[allowed is undefined] Custom `given` is allowed', fixture: { given: 'LINK' as EHTTPMethods, allowed: undefined}, expected: { static: false, instance: true } },
                { name: '[allowed is undefined] Custom `given` is not allowed', fixture: { given: 'not-allowed' as EHTTPMethods, allowed: undefined}, expected: { static: false, instance: false } },
            ];
        }
    });

    // WRITE: normalize: Static and instance methods should polymorphically return the expected value for given and allowed arguments.


    // it('+constructor() #1: Should create the expected HTTPMethodsConvenience object', () => {
    //     const actual = new HTTPMethodsConvenience();

    //     expect(actual).toBeInstanceOf(HTTPMethodsConvenience);
    //     expect(actual.items).toEqual([]);
    //     expect(actual.types).toEqual([]);
    //     expect(actual.isEmpty).toEqual(true);
    // });



    // Assert: behavior with extended custom methods.
    // e.g. LINK / UNLINK

    // Assert: toValues: Static and instance method with custom methods.
});
