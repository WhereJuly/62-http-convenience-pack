'use strict';

import { describe, expect, it } from 'vitest';

import {
    EIsValidAttributes, EMIMETypeRecordAttributes,
    HTTPMIMETypesConvenience, MIME_TYPES_BUILTIN, MIME_TYPES_EXTENSIONS_BUILTIN, MIME_TYPES_GROUPS_BUILTIN, MIMEExtensionsFactory,
    MIMEGroupsFactory, MIMETypesGenericRegistryFactory, MIMExtensionInapplicable, TMIMEExtensions,
    TMIMEGroups, TMIMETypeObject, TMIMETypeRecord, TMIMETypesRegistryGeneric, TSource
} from '@wherejuly/http-convenience-pack';

describe('HTTPMethodsModuleTest', () => {

    it('Assess enum, constants, types usage convenience', () => {
        expect({} as TSource).toEqual({});
        expect({} as TMIMETypeObject<['', '', '']>).toEqual({});
        expect({} as TMIMETypeRecord<[['', '', '']]>).toEqual({});
        expect({} as TMIMETypesRegistryGeneric<[['', '', '']]>).toEqual({});
        expect(({} as TMIMEGroups).APPLICATION).toEqual(undefined);
        expect(({} as TMIMEExtensions)['.avi']).toEqual(undefined);

        expect(MIMExtensionInapplicable).toEqual('inapplicable');
        expect(EMIMETypeRecordAttributes).toMatchObject({ TYPE: 'type' });
        expect(EIsValidAttributes).toMatchObject({ TYPE: 'type' });

        expect(MIMETypesGenericRegistryFactory).toBeInstanceOf(Function);
        expect(MIMEGroupsFactory).toBeInstanceOf(Function);
        expect(MIMEExtensionsFactory).toBeInstanceOf(Function);

        expect(MIME_TYPES_BUILTIN['application/json'].type).toEqual('application/json');
        expect(MIME_TYPES_EXTENSIONS_BUILTIN['.3gp']).toEqual('.3gp');
        expect(MIME_TYPES_BUILTIN['application/java-archive']).toMatchObject({ type: 'application/java-archive', group: 'APPLICATION', extension: '.jar' });
    });

    it('Assess HTTPMIMETypesConvenience', () => {
        const actual = HTTPMIMETypesConvenience;

        expect(actual.extend).toBeInstanceOf(Function);
        expect(actual.reset).toBeInstanceOf(Function);
        expect(actual.isValid).toBeInstanceOf(Function);
        expect(actual.isAmong).toBeInstanceOf(Function);
        expect(actual.inGroup).toBeInstanceOf(Function);
        expect(actual.ofGroup).toBeInstanceOf(Function);
        expect(actual.pickBy).toBeInstanceOf(Function);

        expect(actual.types).toMatchObject({ 'text/plain': { type: 'text/plain' } });
        expect(actual.isExtended).toEqual(false);
        expect(actual.extend({} as TMIMETypesRegistryGeneric<[['a', 'b', 'c']]>)).toEqual(undefined);
        expect(actual.isExtended).toEqual(true);
        expect(actual.reset()).toEqual(undefined);

        expect(actual.isValid('text/plain')).toEqual(true);
        expect(actual.isValid('gz', EIsValidAttributes.EXTENSION)).toEqual(true);
        expect(actual.isValid('.gz', EIsValidAttributes.EXTENSION)).toEqual(true);

        expect(actual.isAmong('text/plain')).toEqual(true);
        expect(actual.isAmong('application/gzip', [MIME_TYPES_BUILTIN['application/gzip'].type])).toEqual(true);

        expect(actual.inGroup('application/gzip', MIME_TYPES_GROUPS_BUILTIN.APPLICATION)).toEqual(true);

        expect(actual.ofGroup('application/gzip')).toEqual(MIME_TYPES_GROUPS_BUILTIN.APPLICATION);
    });

});
