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

    describe('+isValid: Static and instance methods should polymorphically return the expected value for string and array arguments', () => {

        it.each(dataProvider_is_valid_method())('Case #%# $name', async (data) => {
            const instance = new HTTPMethodsConvenience({});

            const actual = {
                static: HTTPMethodsConvenience.isValid(data.fixture),
                instance: instance.isValid(data.fixture),
            };

            expect(actual.static).toEqual(data.expected);
            expect(actual.instance).toEqual(data.expected);
        });

        function dataProvider_is_valid_method() {
            return [
                { name: 'Valid string', fixture: 'POST', expected: true },
                { name: 'Valid array', fixture: ['POST', 'OPTIONS'], expected: true },
                { name: 'Invalid string', fixture: 'invalid', expected: false },
                { name: 'Invalid array', fixture: ['invalid', 'invalid'], expected: false },
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
