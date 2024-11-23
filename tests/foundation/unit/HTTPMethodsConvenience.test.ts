'use strict';

import { assert, describe, expect, it } from 'vitest';

import HTTPMethodsConvenience from '@src/methods/HTTPMethodsConvenience.js';

describe('HTTPMethodsConvenienceTest', () => {

    it('+constructor() #1: Should create the expected HTTPMethodsConvenience object', () => {
        const actual = new HTTPMethodsConvenience();

        expect(actual).toBeInstanceOf(HTTPMethodsConvenience);
        expect(actual.items).toEqual([]);
        expect(actual.types).toEqual([]);
        expect(actual.isEmpty).toEqual(true);
    });

});
