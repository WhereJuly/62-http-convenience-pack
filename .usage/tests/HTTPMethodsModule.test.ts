'use strict';

import { describe, expect, it } from 'vitest';

import { EHTTPMethods, HTTPMethodsConvenience,  } from '@wherejuly/http-convenience-pack';

describe('HTTPMethodsModuleTest', () => {

    it('Use EHTTPMethods enum', () => {
        console.log(EHTTPMethods);

        const actual = EHTTPMethods.GET;

        expect(actual).toEqual('GET');
    });

    it('Use HTTPConvenienceMethods', () => {

        HTTPMethodsConvenience.isValid('get');

        // WRITE: Should accept strings as well? 
        // WRITE: Arrays of strings?
        HTTPMethodsConvenience.isAllowed('get' as EHTTPMethods); 

    });


});
