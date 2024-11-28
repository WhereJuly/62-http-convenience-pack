'use strict';

import { MIMEExtensionsFactory, MIMEGroupsFactory, MIMETypesGenericRegistryFactory } from '@src/core/mime2/factories.js';
import { BuiltInMIMETypesSource } from '@src/core/mime2/source/builtin.mime.js';

/**
 * The built-in MIME Types Registry `MIME_TYPES_BUILTIN` constant
 * made from {@link BuiltInMIMETypesSource}  with the respective 
 * `MIME_TYPES_GROUPS_BUILTIN` and `MIME_TYPES_EXTENSIONS_BUILTIN`.
 */
export const MIME_TYPES_BUILTIN = MIMETypesGenericRegistryFactory<typeof BuiltInMIMETypesSource>(BuiltInMIMETypesSource);
export const MIME_TYPES_GROUPS_BUILTIN = MIMEGroupsFactory(BuiltInMIMETypesSource);
export const MIME_TYPES_EXTENSIONS_BUILTIN = MIMEExtensionsFactory(BuiltInMIMETypesSource);