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
        HTTPMethodsConvenience.isAllowed('get' as EHTTPMethods);

        // WRITE: Allow for undefined `customMethods` parameter.
        const cMethods = new HTTPMethodsConvenience({});

        const actual = {
            straight: {
                isValid: HTTPMethodsConvenience.isValid('get'),
                isAllowed: HTTPMethodsConvenience.isAllowed('get' as EHTTPMethods),
                normalize: HTTPMethodsConvenience.normalize('get'),
            },
            namespaced: {
                isValid: HCP.Methods.isValid(HCP.EMethods.GET),
                isAllowed: HCP.Methods.isAllowed(HCP.EMethods.GET as EHTTPMethods),
            },
            instance: {
                isValid: cMethods.isValid('get'),
                isAllowed: cMethods.isAllowed('get' as EHTTPMethods),
            }
        };
        
        expect(actual.straight.isValid).toEqual(true);
        expect(actual.straight.isAllowed).toEqual(true);
        expect(actual.namespaced.isValid).toEqual(true);
        expect(actual.namespaced.isAllowed).toEqual(true);
        expect(actual.instance.isValid).toEqual(true);
        expect(actual.instance.isAllowed).toEqual(true);
        expect(actual.straight.normalize).toEqual(EHTTPMethods.GET);
    });

});
