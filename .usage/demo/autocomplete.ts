'use strict';

import { ECacheControlServer, EHTTPHeaders, EHTTPMethods, EHTTPMethodsGroupsList, EMakerTokenSchemes, GROUPED_STATUS_CODES, HTTP_STATUSES, HTTPHeadersConvenience, HTTPMethodInGroups, HTTPMethodsConvenience, HTTPStatusesConvenience, MIME_TYPES_BUILTIN } from '@wherejuly/http-convenience-pack';

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

const _response = await fetch('https://api.example.com/data', {
    /**
     * Make or autocomplete the correct headers and mime types from the list provided.
     */
    headers: {
        // Make the Authorization header.
        ...HTTPHeadersConvenience.make(EHTTPHeaders.Authorization, EMakerTokenSchemes.Bearer, 'myBearerToken'),

        // Set no special treatment header with autocomplete using enums and constants
        [EHTTPHeaders.Accept]: MIME_TYPES_BUILTIN['image/png'].type,
        [EHTTPHeaders.ContentType]: MIME_TYPES_BUILTIN['text/event-stream'].type,
        [EHTTPHeaders.CacheControl]: ECacheControlServer.NoCache
    }
});