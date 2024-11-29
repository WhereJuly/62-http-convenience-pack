'use strict';

import { describe, expect, it } from 'vitest';

import HTTPMethodsConvenience from '@src/core/methods/HTTPMethodsConvenience.js';
import HTTPConveniencePackException from '@src/exceptions/HTTPConveniencePack.exception.js';
import { EHTTPMethods, TCustomHTTPMethodsConstraint } from '@src/core/methods/methods.types.js';

const custom = { LINK: 'LINK', UNLINK: 'UNLINK' };

// WARNING: This is the type fixture to test adding custom HTTP methods.
enum ECustomHTTPMethods {
    LINK = 'LINK',
    UNLINK = 'UNLINK',
}

const ExtendedHTTPMethods = { ...EHTTPMethods, ...ECustomHTTPMethods };

describe('HTTPMethodsConvenienceTest', () => {

    it('The static HTTPMethodsConvenience object should exist', () => {
        const actual = HTTPMethodsConvenience;

        expect(actual).toBeDefined();
        expect(actual.methods).toEqual(EHTTPMethods);
        expect(actual.isExtended).toEqual(false);
        expect(actual.extend).toBeInstanceOf(Function);
        expect(actual.reset).toBeInstanceOf(Function);
        expect(actual.isValid).toBeInstanceOf(Function);
        expect(actual.isAmong).toBeInstanceOf(Function);
        expect(actual.normalize).toBeInstanceOf(Function);
    });

    it('+static extend(): Should extend the built-in methods', () => {
        const convenience = HTTPMethodsConvenience;
        convenience.extend(ECustomHTTPMethods);

        const actual = Object.keys(convenience.methods);

        expect(actual).toContain(ECustomHTTPMethods.LINK);

        // To restore to the built-in state.
        convenience.reset();
        expect(convenience.isExtended).toEqual(false);
    });


    // it.skip('The HTTPMethodsConvenience object instance should be of expected shape', () => {
    //     const actual = new HTTPMethodsConvenience({});

    //     expect(actual).toBeInstanceOf(HTTPMethodsConvenience);
    //     expect(actual.isValid).toBeInstanceOf(Function);
    //     expect(actual.isAllowed).toBeInstanceOf(Function);
    //     expect(actual.normalize).toBeInstanceOf(Function);
    // });

    // it.skip('The HTTPMethodsConvenience object instance should operate on standards and custom HTTP methods', () => {
    //     const actual = new HTTPMethodsConvenience(ECustomHTTPMethods);

    //     expect(actual.isValid(ExtendedHTTPMethods.GET)).toEqual(true); // Test standard HTTP method autocomplete
    //     expect(actual.isValid(ExtendedHTTPMethods.LINK)).toEqual(true);
    //     expect(actual.isAllowed(ECustomHTTPMethods.LINK)).toEqual(true);
    //     expect(actual.normalize('unlink')).toEqual(ECustomHTTPMethods.UNLINK);
    // });

    describe('+static isValid: Should polymorphically return the expected value for string and array arguments', () => {

        it.each(dataProvider_is_valid_method())('Case #%# $name', (data) => {
            HTTPMethodsConvenience.extend(ECustomHTTPMethods);

            const actual = HTTPMethodsConvenience.isValid(data.fixture);

            expect(actual).toEqual(data.expected);

            HTTPMethodsConvenience.reset();
        });

        function dataProvider_is_valid_method() {
            return [
                { name: 'Valid string', fixture: 'POST', expected: true },
                { name: 'Valid array', fixture: ['POST', 'OPTIONS'], expected: true },
                { name: 'Valid custom, string', fixture: 'LINK', expected: true },
                { name: 'Valid custom, array', fixture: ['LINK', 'UNLINK'], expected: true },
                { name: 'Invalid string', fixture: 'invalid', expected: false },
                { name: 'Invalid array', fixture: ['invalid', 'invalid'], expected: false },
            ];
        }

    });

    describe('+static isAmong: Should return the expected value for string and array arguments', () => {

        it.each(dataProvider_is_among())('Case #%# $name', (data) => {
            // HTTPMethodsConvenience.extend(ECustomHTTPMethods);
            const actual = HTTPMethodsConvenience.isAmong(data.fixture.given, data.fixture.allowed);

            expect(actual).toEqual(data.expected);
        });

        function dataProvider_is_among() {
            return [
                { name: '[allowed is defined] Standard `given` is allowed', fixture: { given: EHTTPMethods.OPTIONS, allowed: EHTTPMethods }, expected: true },
                { name: '[allowed is defined] `given` is not allowed', fixture: { given: 'LINK' as EHTTPMethods, allowed: EHTTPMethods }, expected: false },
                { name: '[allowed is undefined] Standard `given` is allowed', fixture: { given: EHTTPMethods.OPTIONS, allowed: undefined }, expected: true },
                { name: '[allowed is undefined] `given` is not allowed', fixture: { given: 'LINK' as EHTTPMethods, allowed: undefined }, expected: false },
                { name: '[allowed is defined] Custom `given` is allowed', fixture: { given: 'LINK' as EHTTPMethods, allowed: ECustomHTTPMethods }, expected: true },
                { name: '[allowed is defined] Custom `given` is not allowed', fixture: { given: 'not-allowed' as EHTTPMethods, allowed: ECustomHTTPMethods }, expected: false },
                { name: '[allowed is undefined] Custom `given` is allowed', fixture: { given: 'LINK' as EHTTPMethods, allowed: undefined }, expected: false },
                { name: '[allowed is undefined] Custom `given` is not allowed', fixture: { given: 'not-allowed' as EHTTPMethods, allowed: undefined }, expected: false },
            ];
        }

    });

    describe('+static normalize: Should return the expected value or throw', () => {

        it.each(dataProvider_normalize())('Case #%# $name', (data) => {
            HTTPMethodsConvenience.extend(ECustomHTTPMethods);
            
            try {
                const convenience = HTTPMethodsConvenience;

                const actual = convenience.normalize(data.fixture);
                expect(actual).toEqual(data.expected);
            } catch (error) {
                const actual = error as Error;
                expect(actual).toBeInstanceOf(HTTPConveniencePackException);
                expect(actual.message).toContain(data.expected);
            }
            
            HTTPMethodsConvenience.reset();
        });

        function dataProvider_normalize() {
            return [
                { name: 'Success (built-in)', fixture: 'patch', expected: EHTTPMethods.PATCH },
                { name: 'Throw on invalid (built-in)', fixture: 'search', expected: '"maybeMethod" argument when transformed to upper case should be a valid HTTP built-in or extended method' },
                { name: 'Throw on non-string (built-in)', fixture: {} as string, expected: 'should be a string, typeof "object" given' },
                { name: 'Success (custom)', fixture: 'link', expected: 'LINK' },
                { name: 'Throw on invalid (custom)', fixture: 'invalid', expected: '"maybeMethod" argument when transformed to upper case should be a valid HTTP built-in or extended method' },
                { name: 'Throw on non-string (custom)', fixture: 123 as unknown as string, expected: 'should be a string, typeof "number" given' },
            ];
        }

    });

});
