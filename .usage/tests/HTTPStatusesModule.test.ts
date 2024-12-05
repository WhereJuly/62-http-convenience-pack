'use strict';

import { describe, expect, it } from 'vitest';

import {
    EHTTPStatusCodeGroups, GROUPED_STATUS_CODES, HTTP_STATUSES, HTTPStatusesConvenience,
    IHTTPStatus,
} from '@wherejuly/http-convenience-pack';

// IMPORTANT: eslint warnings may clear after VS Code `Reload Window` command.

describe('HTTPStatusesModuleTest', () => {

    it('Assess enum, const and types usage', () => {
        expect({} as IHTTPStatus).toEqual({});
        expect(EHTTPStatusCodeGroups).toMatchObject({ INFO: 'info' });
        expect(EHTTPStatusCodeGroups.CLIENTERR).toEqual('clienterr');
        expect(HTTP_STATUSES[101].code).toEqual(101);
        expect(GROUPED_STATUS_CODES[EHTTPStatusCodeGroups.CLIENTERR]).toContain(404);
    });

    it('Assess HTTPStatusesConvenience usage', () => {
        expect(HTTPStatusesConvenience.isValid(HTTP_STATUSES[100].code)).toEqual(true);
        expect(HTTPStatusesConvenience.isValid(200)).toEqual(true);

        expect(HTTPStatusesConvenience.inGroup(200, EHTTPStatusCodeGroups.CLIENTERR)).toEqual(false);
        expect(HTTPStatusesConvenience.inGroup(200, EHTTPStatusCodeGroups.SUCCESS)).toEqual(true);

        expect(HTTPStatusesConvenience.ofGroup(200)).toEqual(EHTTPStatusCodeGroups.SUCCESS);
        expect(HTTPStatusesConvenience.ofGroup('200')).toEqual(EHTTPStatusCodeGroups.SUCCESS);

        const specific = [HTTP_STATUSES[200].code, HTTP_STATUSES[204].code];
        expect(HTTPStatusesConvenience.isAmong(201, specific)).toEqual(false);
        expect(HTTPStatusesConvenience.isAmong(201, GROUPED_STATUS_CODES[EHTTPStatusCodeGroups.CLIENTERR])).toEqual(false);

        expect(HTTPStatusesConvenience.message(201)).toEqual(HTTP_STATUSES[201].message);

        expect(HTTPStatusesConvenience.normalize(201)).toEqual(201);
        expect(HTTPStatusesConvenience.normalize('201')).toEqual(201);
    });

});
