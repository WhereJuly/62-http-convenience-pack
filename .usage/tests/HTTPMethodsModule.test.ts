'use strict';

import { describe, expect, it } from 'vitest';

import { EHTTPMethods, HTTPMethodsConvenience } from '@wherejuly/http-convenience-pack';

describe('HTTPMethodsModuleTest', () => {

    it('Assess EHTTPMethods enum usage convenience', () => {
        const actual = EHTTPMethods.GET;

        expect(actual).toEqual('GET');
    });

    it('Assess HTTPMethodsConvenience', () => {

        // NB: Usage tryout.
        // WRITE: Should accept strings as well? 
        // WRITE: Arrays of strings?
        HTTPMethodsConvenience.isAmong('get' as EHTTPMethods);

        // WRITE: Allow for undefined `customMethods` parameter.
        const actual = {
            isValid: HTTPMethodsConvenience.isValid('get'),
            isAmong: HTTPMethodsConvenience.isAmong('get'),
            normalize: HTTPMethodsConvenience.normalize('get'),
        };

        expect(actual.isValid).toEqual(true);
        expect(actual.isAmong).toEqual(true);
        expect(actual.normalize).toEqual(EHTTPMethods.GET);
    });

});
