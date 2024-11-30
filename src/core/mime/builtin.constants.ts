'use strict';

import { MIMEExtensionsFactory, MIMEGroupsFactory, MIMETypesGenericRegistryFactory } from '@src/core/mime/factories.js';
import { BuiltInMIMETypesSource } from '@src/core/mime/source/builtin.mime.js';

/**
 * The built-in MIME Types Registry `MIME_TYPES_BUILTIN` constant
 * made from {@link BuiltInMIMETypesSource}  with the respective 
 * `MIME_TYPES_GROUPS_BUILTIN` and `MIME_TYPES_EXTENSIONS_BUILTIN`.
 * 
 * @example
 * ```typescript
 * console.log(MIME_TYPES_BUILTIN['application/gzip']); // { type: 'application/gzip', group: 'APPLICATION', extensions: '.gz' }
 * ```
 * 
 * @see {@link BuiltInMIMETypesSource}
 */
export const MIME_TYPES_BUILTIN = MIMETypesGenericRegistryFactory<typeof BuiltInMIMETypesSource>(BuiltInMIMETypesSource);

/**
 * The built-in MIME Types Groups.
 * 
 * @example
 * 
 * ```typescript
 * console.log(MIME_TYPES_GROUPS_BUILTIN['APPLICATION']); // 'APPLICATION'
 * ```
 * 
 * @see {@link BuiltInMIMETypesSource}
 */
export const MIME_TYPES_GROUPS_BUILTIN = MIMEGroupsFactory(BuiltInMIMETypesSource);

/**
 * The built-in MIME Types Extensions `MIME_TYPES_EXTENSIONS_BUILTIN`
 * 
 * @example
 * 
 * ```typescript
 * console.log(MIME_TYPES_EXTENSIONS_BUILTIN['.gz']); // '.gz'
 * ```
 * 
 * @see {@link BuiltInMIMETypesSource}
 */
export const MIME_TYPES_EXTENSIONS_BUILTIN = MIMEExtensionsFactory(BuiltInMIMETypesSource);
