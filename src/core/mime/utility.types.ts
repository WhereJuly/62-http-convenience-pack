'use strict';

import { EMIMEExtensions, EMIMEGroups } from './types/common.mime.js';

export type TMIMETypeEntry<GMIMEType> = {
    type: GMIMEType;
    extension: EMIMEExtensions;
    group: EMIMEGroups;
};

export type TExtendedMIMETypes<GMIMEType extends string> = {
    [key in GMIMEType]: TMIMETypeEntry<GMIMEType>;
};
