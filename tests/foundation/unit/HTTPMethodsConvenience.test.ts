'use strict';

import { describe, expect, it } from 'vitest';

import HTTPMethodsConvenience from '@src/core/methods/HTTPMethodsConvenience.js';
import HTTPConveniencePackException from '@src/exceptions/HTTPConveniencePack.exception.js';
import { EHTTPMethods, EHTTPMethodsGroupsList, HTTPMethodInGroups } from '@src/core/methods/methods.types.js';

// WARNING: This is the type fixture to test adding custom HTTP methods.
enum ECustomHTTPMethods {
    LINK = 'LINK',
    UNLINK = 'UNLINK',
}

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
        expect(actual.inGroup).toBeInstanceOf(Function);
        expect(actual.ofGroups).toBeInstanceOf(Function);
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
                { name: 'Valid custom, string, normalize', fixture: 'link', expected: true },
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
                { name: '[allowed is defined, string] Custom `given` is allowed', fixture: { given: 'LINK' as EHTTPMethods, allowed: ECustomHTTPMethods.LINK }, expected: true },
                { name: '[allowed is defined] Custom `given` is not allowed', fixture: { given: 'not-allowed' as EHTTPMethods, allowed: ECustomHTTPMethods }, expected: false },
                { name: '[allowed is undefined] Custom `given` is allowed', fixture: { given: 'LINK' as EHTTPMethods, allowed: undefined }, expected: false },
                { name: '[allowed is undefined] Custom `given` is not allowed', fixture: { given: 'not-allowed' as EHTTPMethods, allowed: undefined }, expected: false },
            ];
        }

    });

    describe('+static inGroup: Should return the respective boolean value', () => {

        it.each(dataProvider_in_group_method())('Case #%# $name', (data) => {
            const actual = HTTPMethodsConvenience.inGroup(data.fixture.method, data.fixture.group, data.fixture.all);

            expect(actual).toEqual(data.expected);
        });

        function dataProvider_in_group_method() {
            return [
                { name: 'Is in group', fixture: { method: 'POST', group: EHTTPMethodsGroupsList.CACHEABLE }, expected: true },
                { name: 'Is not in group', fixture: { method: 'POST', group: EHTTPMethodsGroupsList.IDEMPOTENT }, expected: false },
                { name: 'Is in one of multiple groups (OR)', fixture: { method: 'GET', group: [EHTTPMethodsGroupsList.IDEMPOTENT, EHTTPMethodsGroupsList.CACHEABLE] }, expected: true },
                { name: 'Is not in multiple groups (OR)', fixture: { method: 'CONNECT', group: [EHTTPMethodsGroupsList.IDEMPOTENT, EHTTPMethodsGroupsList.CACHEABLE] }, expected: false },
                { name: 'Is in all multiple groups (AND)', fixture: { method: 'GET', group: [EHTTPMethodsGroupsList.IDEMPOTENT, EHTTPMethodsGroupsList.CACHEABLE], all: true }, expected: true },
                { name: 'Is not in multiple groups (AND)', fixture: { method: 'POST', group: [EHTTPMethodsGroupsList.IDEMPOTENT, EHTTPMethodsGroupsList.CACHEABLE], all: true }, expected: false },
            ];
        }

    });

    describe('+static ofGroups: Should return the groups given method belongs to', () => {

        it.each(dataProvider_of_groups_method())('Case #%# $name', (data) => {
            const actual = HTTPMethodsConvenience.ofGroups(data.fixture);

            expect(actual).toEqual(data.expected);
        });

        function dataProvider_of_groups_method() {
            return [
                { name: 'Belongs to groups', fixture: 'POST', expected: HTTPMethodInGroups[EHTTPMethods.POST] },
            ];
        }

        it('Should throw for invalid method', () => {
            const actual = () => { HTTPMethodsConvenience.ofGroups('invalid'); };

            expect(actual).toThrow('should be a valid HTTP built-in or extended method');
        });

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
