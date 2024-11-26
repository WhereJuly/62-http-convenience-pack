'use strict';

import { describe, expect, it } from 'vitest';

import { HTTPStatusesConvenience } from '../../../src/core/statuses/HTTPStatusesConvenience.js';
import { THTTPStatuses } from '../../../src/core/statuses/statuses.types.js';


describe('HTTPStatusesConvenienceTest', () => {

    it('The static HTTPStatusesConvenience object should exist', () => {
        const actual = HTTPStatusesConvenience;

        expect(actual).toBeDefined();
        expect(actual.isValid).toBeInstanceOf(Function);
        expect(actual.message).toBeInstanceOf(Function);
        expect(actual.message(THTTPStatuses[101].code)).toEqual(THTTPStatuses[101].message);
    });

    describe('+isValid: Should check if the given code is valid', () => {

        it.each(dataProvider_is_valid())('Case #%# $name', (data) => {
            const convenience = HTTPStatusesConvenience;

            const actual = convenience.isValid(data.fixture);

            expect(actual).toEqual(data.expected);
        });

        function dataProvider_is_valid() {
            return [
                { name: 'Valid number', fixture: 200, expected: true },
                { name: 'Valid string', fixture: '300', expected: true },
                { name: 'Invalid number', fixture: 999, expected: false },
                { name: 'Invalid string', fixture: '999', expected: false },
            ];
        }

    });

    // Assert: given status code is withing the group

});
