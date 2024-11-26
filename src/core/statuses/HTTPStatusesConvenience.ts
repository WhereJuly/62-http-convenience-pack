'use strict';

import { EHTTPCodeTypes, THTTPStatuses } from '@src/core/statuses/statuses.types.js';

export class HTTPStatusesConvenience {

    public static type(code: keyof typeof THTTPStatuses): EHTTPCodeTypes {
        if (code >= 100 && code < 200) return EHTTPCodeTypes.INFO;
        if (code >= 200 && code < 300) return EHTTPCodeTypes.SUCCESS;
        if (code >= 300 && code < 400) return EHTTPCodeTypes.REDIRECT;
        if (code >= 400 && code < 500) return EHTTPCodeTypes.CLIENTERR;
        if (code >= 500 && code < 600) return EHTTPCodeTypes.SERVERERR;

        throw new Error(`Unknown HTTP status code ${code}`);
    }

    public static isValid(given: number | string): boolean {
        const code = typeof given === 'string' ? parseInt(given, 10) : given;
        
        return Object.keys(THTTPStatuses).includes(code.toString());
    }

    public static message(code: number): string | undefined {
        return THTTPStatuses[code as keyof typeof THTTPStatuses]?.message;
    }

}
