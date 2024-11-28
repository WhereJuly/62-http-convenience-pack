'use strict';

import HTTPMIMETypesConvenience2 from '@src/core/mime2/HTTPMIMETypesConvenience2.js';
import { BuiltInMIMETypesSource } from '@src/core/mime2/source/builtin.mime.js';

export const MIME_TYPES_BUILTIN = HTTPMIMETypesConvenience2.createMIMETypes(BuiltInMIMETypesSource);