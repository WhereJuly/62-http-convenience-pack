'use strict';

import { EHTTPMethods, EHTTPMethodsGroupsList, GROUPED_STATUS_CODES, HTTP_STATUSES, HTTPMethodInGroups, HTTPMethodsConvenience, HTTPStatusesConvenience } from '@wherejuly/http-convenience-pack';

/**
 * NB: Autocomplete Demo
 */

// ---
const method = EHTTPMethods.HEAD;

HTTPMethodsConvenience.inGroup(method, EHTTPMethodsGroupsList.PREFLIGHT); // true

console.log(HTTPMethodInGroups.PATCH); // [EHTTPMethodsGroupsList.IDEMPOTENT]

// ---

const success = HTTP_STATUSES[200].code;

console.log(GROUPED_STATUS_CODES.clienterr);

HTTPStatusesConvenience.isAmong(success, [100]); // true

