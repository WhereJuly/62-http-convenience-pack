'use strict';

import { describe, expect, it } from 'vitest';

import { EHTTPMethods, HCP, HTTPMethodsConvenience, } from '@wherejuly/http-convenience-pack';

describe('HTTPMethodsModuleTest', () => {

    it('Assess EHTTPMethods enum usage convenience', () => {
        // console.log(EHTTPMethods);

        const actual = {
            straight: EHTTPMethods.GET,
            namespaced: HCP.EMethods.GET,
        };

        expect(actual.straight).toEqual('GET');
        expect(actual.namespaced).toEqual('GET');
    });

    it('Assess HTTPMethodsConvenience', () => {

        // NB: Usage tryout.
        // WRITE: Should accept strings as well? 
        // WRITE: Arrays of strings?
        HTTPMethodsConvenience.isAmong('get' as EHTTPMethods);

        // WRITE: Allow for undefined `customMethods` parameter.
        const actual = {
            straight: {
                isValid: HTTPMethodsConvenience.isValid('get'),
                isAmong: HTTPMethodsConvenience.isAmong('get'),
                normalize: HTTPMethodsConvenience.normalize('get'),
            },
            namespaced: {
                isValid: HCP.Methods.isValid(HCP.EMethods.GET),
                isAllowed: HCP.Methods.isAmong(HCP.EMethods.GET as EHTTPMethods),
            }
        };

        expect(actual.straight.isValid).toEqual(true);
        expect(actual.straight.isAmong).toEqual(true);
        expect(actual.namespaced.isValid).toEqual(true);
        expect(actual.namespaced.isAllowed).toEqual(true);
        expect(actual.straight.normalize).toEqual(EHTTPMethods.GET);
    });

});
