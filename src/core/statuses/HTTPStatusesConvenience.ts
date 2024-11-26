'use strict';

import { EHTTPStatusCodeGroups, GROUPED_STATUS_CODES, THTTPStatuses } from '@src/core/statuses/statuses.types.js';

export class HTTPStatusesConvenience {

    public static type(code: keyof typeof THTTPStatuses): EHTTPStatusCodeGroups {
        if (code >= 100 && code < 200) return EHTTPStatusCodeGroups.INFO;
        if (code >= 200 && code < 300) return EHTTPStatusCodeGroups.SUCCESS;
        if (code >= 300 && code < 400) return EHTTPStatusCodeGroups.REDIRECT;
        if (code >= 400 && code < 500) return EHTTPStatusCodeGroups.CLIENTERR;
        if (code >= 500 && code < 600) return EHTTPStatusCodeGroups.SERVERERR;

        throw new Error(`Unknown HTTP status code ${code}`);
    }

    public static isValid(given: number | string): boolean {
        const code = HTTPStatusesConvenience.normalizeCodeInput(given);

        return Object.keys(THTTPStatuses).includes(code.toString());
    }

    // inGroup function to check if a status code is in the specified group
    public static inGroup(given: number | string, type: EHTTPStatusCodeGroups): boolean {
        const code = HTTPStatusesConvenience.normalizeCodeInput(given);

        return (GROUPED_STATUS_CODES[type] as readonly number[]).includes(code);
    }

    public static ofGroup(given: number): EHTTPStatusCodeGroups | null {
        const code = HTTPStatusesConvenience.normalizeCodeInput(given);
        const entries = Object.entries(GROUPED_STATUS_CODES) as [EHTTPStatusCodeGroups, readonly number[]][];
        const found = entries.find(([_type, codes]) => { return codes.includes(code); });

        return found ? found[0] : null;
    }

    public static message(code: number): string | undefined {
        return THTTPStatuses[code as keyof typeof THTTPStatuses]?.message;
    }

    private static normalizeCodeInput(input: number | string): number {
        return typeof input === 'string' ? parseInt(input, 10) : input;
    }

}
