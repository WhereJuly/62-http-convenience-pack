'use strict';

import { describe, expect, it } from 'vitest';

import {
    BuiltInExtractors, EHTTPHeaders, EMakerTokenSchemes, ETokenSchemes, HTTPHeadersConvenience,
    TAuthorizationHeaderObject, TAuthorizationTokenValue, TExtractorFunction, THeadersObject,
    TokenSchemeUnknown
} from '@wherejuly/http-convenience-pack';

// IMPORTANT: eslint warnings may clear after VS Code `Reload Window` command.

describe('HTTPHeadersModuleTest', () => {

    it('Assess enum, const and types usage', () => {
        expect(EHTTPHeaders).toMatchObject({ Authorization: 'Authorization' });
        expect(({} as THeadersObject)['123']).toEqual(undefined);
        expect(({} as TAuthorizationHeaderObject).Authorization).toEqual(undefined);
        expect({} as TAuthorizationTokenValue).toEqual({});

        expect(EMakerTokenSchemes).toMatchObject({ Basic: 'Basic' });
        expect(TokenSchemeUnknown).toContain('token scheme unknown');

        expect({} as TExtractorFunction).toEqual({});

        expect(ETokenSchemes).toMatchObject({ Basic: 'Basic' });
    });

    it('Assess HTTPHeadersConvenience usage', () => {
        const actual = HTTPHeadersConvenience;

        expect(actual.make).toBeInstanceOf(Function);
        expect(actual.extract).toBeInstanceOf(Function);
        expect(actual.hasValue).toBeInstanceOf(Function);
        expect(actual.toKeyValue).toBeInstanceOf(Function);
        expect(actual.normalize).toBeInstanceOf(Function);

        const headers = { Authorization: 'Bearer token' };

        expect(actual.make(EHTTPHeaders.Authorization, EMakerTokenSchemes.Bearer, 'token')).toMatchObject(headers);
        expect(actual.extract(headers, EHTTPHeaders.Authorization, BuiltInExtractors.token)).toEqual('token');
        expect(actual.hasValue(headers, EHTTPHeaders.Authorization, 'token', BuiltInExtractors.token)).toEqual(true);

        expect(actual.toKeyValue(headers, EHTTPHeaders.Accept)).toEqual(null);
        expect(actual.toKeyValue(headers, EHTTPHeaders.Authorization)).toEqual(Object.entries(headers)[0]);
        expect(actual.normalize(EHTTPHeaders.Authorization)).toEqual('authorization');
    });

    it('Assess BuiltInExtractors usage', () => {
        const actual = BuiltInExtractors;

        expect(actual.array).toBeInstanceOf(Function);
        expect(actual.date).toBeInstanceOf(Function);
        expect(actual.b64).toBeInstanceOf(Function);
        expect(actual.token).toBeInstanceOf(Function);

        expect(actual.array('gzip, deflate, br')).toEqual(['gzip', ' deflate', ' br']);
        expect(actual.date('2024-12-03')).toEqual(new Date('2024-12-03'));
        expect(actual.b64('dXNlcjpwYXNz')).toEqual('user:pass');
        expect(actual.token('Bearer abc123xyz456')).toEqual('abc123xyz456');
    });

});
