'use strict';

import { describe, expect, it } from 'vitest';

import { EHTTPMethods, EHTTPMethodsGroupsList, HTTPMethodInGroups, HTTPMethodsConvenience, THTTPMethodsConstraint } from '@wherejuly/http-convenience-pack';

enum EUsageHTTPMethods {
    LINK = 'LINK'
}

const UsageCustomMethods = {
    UNLINK: 'UNLINK', // Custom method
} as const;

describe('HTTPMethodsModuleTest', () => {

    it('Assess EHTTPMethods enum usage convenience', () => {
        const actual = EHTTPMethods.GET;

        expect(actual).toEqual('GET');
        expect(EHTTPMethodsGroupsList).toMatchObject({ SAFE: 'safe', IDEMPOTENT: 'idempotent' });
        expect(EHTTPMethodsGroupsList.CACHEABLE).toEqual('cacheable');
        expect(HTTPMethodInGroups).toMatchObject({ GET: ['safe', 'idempotent', 'cacheable'] });
        expect(HTTPMethodInGroups.HEAD).toEqual(['safe', 'idempotent', 'cacheable']);

        expect(EUsageHTTPMethods as THTTPMethodsConstraint).toEqual({ LINK: 'LINK' });;
        expect(UsageCustomMethods as THTTPMethodsConstraint).toEqual({ UNLINK: 'UNLINK' });;
        expect(UsageCustomMethods.UNLINK).toEqual('UNLINK');;
        expect(HTTPMethodsConvenience.extend(UsageCustomMethods)).toEqual(undefined);;
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

        expect(HTTPMethodsConvenience.methods).toMatchObject({ GET: 'GET' });

        expect(HTTPMethodsConvenience.isExtended).toEqual(false);

        expect(HTTPMethodsConvenience.reset()).toEqual(undefined);

        expect(HTTPMethodsConvenience.isValid('get')).toEqual(true);
        expect(HTTPMethodsConvenience.isValid(['get', 'posT'])).toEqual(true);

        expect(HTTPMethodsConvenience.isAmong('patch')).toEqual(true);
        expect(HTTPMethodsConvenience.isAmong('patch', ['GET', 'PATCH'])).toEqual(true);
        expect(HTTPMethodsConvenience.isAmong(['patch', 'get'], ['GET', 'PATCH'])).toEqual(true);

        expect(HTTPMethodsConvenience.inGroup('patch', EHTTPMethodsGroupsList.NON_IDEMPOTENT)).toEqual(true);
        expect(HTTPMethodsConvenience.inGroup('patch', [EHTTPMethodsGroupsList.NON_IDEMPOTENT, EHTTPMethodsGroupsList.CACHEABLE])).toEqual(true);
        expect(HTTPMethodsConvenience.inGroup('patch', [EHTTPMethodsGroupsList.NON_IDEMPOTENT, EHTTPMethodsGroupsList.CACHEABLE], true)).toEqual(false);

        expect(HTTPMethodsConvenience.ofGroups('patch')).toEqual([EHTTPMethodsGroupsList.NON_IDEMPOTENT]);

        expect(HTTPMethodsConvenience.ofGroups('patch')).toEqual([EHTTPMethodsGroupsList.NON_IDEMPOTENT]);


    });

});
