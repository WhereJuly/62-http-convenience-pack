'use strict';

import { TMIMETypeEntry } from '../utility.types.js';
import { EMIMEExtensions, EMIMEGroups } from './common.mime.js';

export enum EBuiltInMIMETypes {
    APPLICATION_JSON = "application/json",
    TEXT_PLAIN = "text/plain",
    TEXT_HTML = "text/html",
    TEXT_CSS = "text/css",
    IMAGE_PNG = "image/png",
    IMAGE_JPEG = "image/jpeg",
    IMAGE_GIF = "image/gif",
    VIDEO_MP4 = "video/mp4",
    AUDIO_MPEG = "audio/mpeg",
    MULTIPART_FORM_DATA = "multipart/form-data",
    APPLICATION_XML = "application/xml",
    APPLICATION_JAVASCRIPT = "application/javascript",
    TEXT_CSV = "text/csv",
    TEXT_TSV = "text/tab-separated-values",
}

export const MIME_TYPES_BUILTIN: {
    [key in EBuiltInMIMETypes]: TMIMETypeEntry<EBuiltInMIMETypes>
} = {
    [EBuiltInMIMETypes.APPLICATION_JSON]: {
        type: EBuiltInMIMETypes.APPLICATION_JSON, extension: EMIMEExtensions.JSON, group: EMIMEGroups.APPLICATION
    },
    [EBuiltInMIMETypes.TEXT_PLAIN]: {
        type: EBuiltInMIMETypes.TEXT_PLAIN, extension: EMIMEExtensions.TXT, group: EMIMEGroups.TEXT
    },
    [EBuiltInMIMETypes.TEXT_HTML]: {
        type: EBuiltInMIMETypes.TEXT_HTML, extension: EMIMEExtensions.HTML, group: EMIMEGroups.TEXT
    },
    [EBuiltInMIMETypes.TEXT_CSS]: {
        type: EBuiltInMIMETypes.TEXT_CSS, extension: EMIMEExtensions.CSS, group: EMIMEGroups.TEXT
    },
    [EBuiltInMIMETypes.IMAGE_PNG]: {
        type: EBuiltInMIMETypes.IMAGE_PNG, extension: EMIMEExtensions.PNG, group: EMIMEGroups.IMAGE
    },
    [EBuiltInMIMETypes.IMAGE_JPEG]: {
        type: EBuiltInMIMETypes.IMAGE_JPEG, extension: EMIMEExtensions.JPEG, group: EMIMEGroups.IMAGE
    },
    [EBuiltInMIMETypes.IMAGE_GIF]: {
        type: EBuiltInMIMETypes.IMAGE_GIF, extension: EMIMEExtensions.GIF, group: EMIMEGroups.IMAGE
    },
    [EBuiltInMIMETypes.VIDEO_MP4]: {
        type: EBuiltInMIMETypes.VIDEO_MP4, extension: EMIMEExtensions.MP4, group: EMIMEGroups.VIDEO
    },
    [EBuiltInMIMETypes.AUDIO_MPEG]: {
        type: EBuiltInMIMETypes.AUDIO_MPEG, extension: EMIMEExtensions.MP3, group: EMIMEGroups.AUDIO
    },
    [EBuiltInMIMETypes.MULTIPART_FORM_DATA]: {
        type: EBuiltInMIMETypes.MULTIPART_FORM_DATA, extension: EMIMEExtensions.MULTIPART, group: EMIMEGroups.MULTIPART
    },
    [EBuiltInMIMETypes.APPLICATION_XML]: {
        type: EBuiltInMIMETypes.APPLICATION_XML, extension: EMIMEExtensions.XML, group: EMIMEGroups.APPLICATION
    },
    [EBuiltInMIMETypes.APPLICATION_JAVASCRIPT]: {
        type: EBuiltInMIMETypes.APPLICATION_JAVASCRIPT, extension: EMIMEExtensions.JS, group: EMIMEGroups.APPLICATION
    },
    [EBuiltInMIMETypes.TEXT_CSV]: {
        type: EBuiltInMIMETypes.TEXT_CSV, extension: EMIMEExtensions.CSV, group: EMIMEGroups.TEXT
    },
    [EBuiltInMIMETypes.TEXT_TSV]: {
        type: EBuiltInMIMETypes.TEXT_TSV, extension: EMIMEExtensions.TSV, group: EMIMEGroups.TEXT
    }
} as const;

export const GROUPED_MIME_TYPES_BUILTIN = {
    [EMIMEGroups.TEXT]: [{
        type: EBuiltInMIMETypes.TEXT_PLAIN, extension: EMIMEExtensions.TXT, group: EMIMEGroups.TEXT
    },
    {
        type: EBuiltInMIMETypes.TEXT_HTML, extension: EMIMEExtensions.HTML, group: EMIMEGroups.TEXT
    },
    {
        type: EBuiltInMIMETypes.TEXT_CSS, extension: EMIMEExtensions.CSS, group: EMIMEGroups.TEXT
    },
    {
        type: EBuiltInMIMETypes.TEXT_CSV, extension: EMIMEExtensions.CSV, group: EMIMEGroups.TEXT
    },
    {
        type: EBuiltInMIMETypes.TEXT_TSV, extension: EMIMEExtensions.TSV, group: EMIMEGroups.TEXT
    }
    ],
    [EMIMEGroups.IMAGE]: [{
        type: EBuiltInMIMETypes.IMAGE_PNG, extension: EMIMEExtensions.PNG, group: EMIMEGroups.IMAGE
    },
    {
        type: EBuiltInMIMETypes.IMAGE_JPEG, extension: EMIMEExtensions.JPEG, group: EMIMEGroups.IMAGE
    },
    {
        type: EBuiltInMIMETypes.IMAGE_GIF, extension: EMIMEExtensions.GIF, group: EMIMEGroups.IMAGE
    }
    ],
    [EMIMEGroups.VIDEO]: [{
        type: EBuiltInMIMETypes.VIDEO_MP4, extension: EMIMEExtensions.MP4, group: EMIMEGroups.VIDEO
    }
    ],
    [EMIMEGroups.AUDIO]: [{
        type: EBuiltInMIMETypes.AUDIO_MPEG, extension: EMIMEExtensions.MP3, group: EMIMEGroups.AUDIO
    }
    ],
    [EMIMEGroups.MULTIPART]: [{
        type: EBuiltInMIMETypes.MULTIPART_FORM_DATA, extension: EMIMEExtensions.MULTIPART, group: EMIMEGroups.MULTIPART
    }
    ],
    [EMIMEGroups.APPLICATION]: [{
        type: EBuiltInMIMETypes.APPLICATION_JSON, extension: EMIMEExtensions.JSON, group: EMIMEGroups.APPLICATION
    },
    {
        type: EBuiltInMIMETypes.APPLICATION_XML, extension: EMIMEExtensions.XML, group: EMIMEGroups.APPLICATION
    },
    {
        type: EBuiltInMIMETypes.APPLICATION_JAVASCRIPT, extension: EMIMEExtensions.JS, group: EMIMEGroups.APPLICATION
    }
    ]
} as const;
