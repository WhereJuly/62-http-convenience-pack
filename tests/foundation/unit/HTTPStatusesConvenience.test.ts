'use strict';

import { describe, expect, it } from 'vitest';

import { HTTPStatusesConvenience } from '../../../src/core/statuses/HTTPStatusesConvenience.js';
import { EHTTPStatusCodeGroups, THTTPStatuses } from '../../../src/core/statuses/statuses.types.js';


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
            const actual = HTTPStatusesConvenience.isValid(data.fixture);

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

    describe('+inGroup: Should check if the given code is in the given group', () => {
        it.each(dataProvider_in_group())('Case #%# $name', (data) => {
            const actual = HTTPStatusesConvenience.inGroup(data.fixture.code, data.fixture.group);

            expect(actual).toEqual(data.expected);
        });

        function dataProvider_in_group() {
            return [
                { name: 'Is in group', fixture: { code: 100, group: EHTTPStatusCodeGroups.INFO }, expected: true },
                { name: 'Is not in group', fixture: { code: 200, group: EHTTPStatusCodeGroups.CLIENTERR }, expected: false },
            ];
        }
    });

    describe('+ofGroup: Should return the group matching code or null', () => {
        it.each(dataProvider_in_group())('Case #%# $name', (data) => {
            const actual = HTTPStatusesConvenience.ofGroup(data.fixture);

            expect(actual).toEqual(data.expected);
        });

        function dataProvider_in_group() {
            return [
                { name: 'Group found (INFO)', fixture: 100, expected: EHTTPStatusCodeGroups.INFO },
                { name: 'Group found (CLIENTERR)', fixture: 401, expected: EHTTPStatusCodeGroups.CLIENTERR },
                { name: 'Group not found', fixture: 999, expected: null },
            ];
        }
    });



    // Assert: given status code is withing the group
    // Assert: ofGroup method returns the correct group or null
});
