'use strict';

import { describe, expect, it } from 'vitest';

import {
    EHTTPStatusCodeGroups, GROUPED_STATUS_CODES, HTTPStatusesConvenience, IHTTPStatus,
    THTTPStatuses,
} from '@wherejuly/http-convenience-pack';

describe('HTTPStatusesModuleTest', () => {

    it('Assess enum & const usage', () => {
        // console.log(THTTPStatuses[101]);

        expect((THTTPStatuses[101] as IHTTPStatus).code).toEqual(101);
        expect(EHTTPStatusCodeGroups.CLIENTERR).toEqual('clienterr');
        expect(GROUPED_STATUS_CODES[EHTTPStatusCodeGroups.CLIENTERR]).toContain(404);
    });

    it('Assess HTTPStatusesConvenience usage', () => {
        expect(HTTPStatusesConvenience.isValid(200)).toEqual(true);
        expect(HTTPStatusesConvenience.inGroup(200, EHTTPStatusCodeGroups.CLIENTERR)).toEqual(false);
        expect(HTTPStatusesConvenience.inGroup(200, EHTTPStatusCodeGroups.SUCCESS)).toEqual(true);

        const specific = [THTTPStatuses[200].code, THTTPStatuses[204].code]
        expect(HTTPStatusesConvenience.isAmong(201, specific)).toEqual(false);
    });

});
