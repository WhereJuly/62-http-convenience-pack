'use strict';

import { MIMEExtensionsFactory, MIMEGroupsFactory, MIMETypesGenericRegistryFactory } from '@src/core/mime2/factories.js';
import { BuiltInMIMETypesSource } from '@src/core/mime2/source/builtin.mime.js';

/**
 * NB: Including all the IANA MIME Types would still not remove the necessity for custom set of
 * MIME Types. Thus I will still have to implement a way to create extended sets with generics.
 * 
 * @see {@link TMIMETypeArray}
 */
export const MIME_TYPES_BUILTIN = MIMETypesGenericRegistryFactory<typeof BuiltInMIMETypesSource>(BuiltInMIMETypesSource);
export const MIME_TYPES_GROUPS_BUILTIN = MIMEGroupsFactory(BuiltInMIMETypesSource);
export const MIME_TYPES_EXTENSIONS_BUILTIN = MIMEExtensionsFactory(BuiltInMIMETypesSource);