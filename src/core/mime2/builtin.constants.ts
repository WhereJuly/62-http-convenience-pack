'use strict';

import { MIMETypesRegistryFactory } from '@src/core/mime2/factories.js';
import { BuiltInMIMETypesSource } from '@src/core/mime2/source/builtin.mime.js';

export const MIME_TYPES_BUILTIN = MIMETypesRegistryFactory(BuiltInMIMETypesSource);