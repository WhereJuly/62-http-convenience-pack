'use strict';

import { EHTTPMethods, MIME_TYPES_BUILTIN } from '@wherejuly/http-convenience-pack';

const method = EHTTPMethods.GET;

console.log(method);

console.log(MIME_TYPES_BUILTIN['application/gzip'].extension);

