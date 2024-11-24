'use strict';

import { assert, describe, expect, it } from 'vitest';

import HTTPMethodsConvenience from '@src/methods/HTTPMethodsConvenience.js';

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

    describe.only('+isValid: Static and instance methods should polymorphically return the expected value for string and array arguments', () => {

        it.each(dataProvider_is_valid_method())('Case #%# $name', async (data) => {
            const instance = new HTTPMethodsConvenience({ LINK: 'LINK', UNLINK: 'UNLINK' });

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
                // { name: 'Valid custom, string', fixture: 'LINK', expected: { static: false, instance: true } },
                // { name: 'Valid custom, array', fixture: ['LINK', 'UNLINK'], expected: { static: false, instance: true } },
                { name: 'Invalid string', fixture: 'invalid', expected: { static: false, instance: false } },
                { name: 'Invalid array', fixture: ['invalid', 'invalid'], expected: { static: false, instance: false } },
            ];
        }

    });

    describe('+isAllowed: Static and instance methods should polymorphically return the expected value for string and array arguments', () => {

        it.each(dataProvider_is_allowed())('Case #%# $name', async (data) => {
        });

        function dataProvider_is_allowed() {
            return [
                { name: 'Allowed string', fixture: 'POST', expected: true },
            ];
        }
    });

    // WRITE: isAllowed: Static and instance methods should polymorphically return the expected value for given and allowed arguments.
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
});
