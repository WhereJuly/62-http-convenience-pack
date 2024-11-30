'use strict';

import { describe, expect, it } from 'vitest';

import { MIME_TYPES_BUILTIN, MIME_TYPES_EXTENSIONS_BUILTIN } from '@wherejuly/http-convenience-pack';

describe('HTTPMethodsModuleTest', () => {

    it('Assess enum usage convenience', () => {
    });

    it('Assess HTTPMIMETypesConvenience', () => {
        expect(MIME_TYPES_BUILTIN['application/json'].type).toEqual('application/json');
        expect(MIME_TYPES_EXTENSIONS_BUILTIN['.3gp']).toEqual('.3gp');
        expect(MIME_TYPES_BUILTIN['application/java-archive']).toMatchObject({ type: 'application/java-archive', group: 'APPLICATION', extension: '.jar' });
    });

});
