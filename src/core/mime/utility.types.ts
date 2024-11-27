'use strict';

export type TMIMETypeEntry<GMIMEType, GMIMEExtension, GMIMEGroup> = {
    type: GMIMEType;
    extension: GMIMEExtension;
    group: GMIMEGroup;
};

export type TExtendedMIMETypes<GMIMEType extends string, GMIMEExtension, GMIMEGroup> = {
    [key in GMIMEType]: TMIMETypeEntry<GMIMEType, GMIMEExtension, GMIMEGroup>;
};
