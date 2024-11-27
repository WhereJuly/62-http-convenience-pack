'use strict';

export enum EEssentialMIMETypes {
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

export enum EMIMEGroups {
    TEXT = "TEXT",
    IMAGE = "IMAGE",
    VIDEO = "VIDEO",
    APPLICATION = "APPLICATION",
    AUDIO = "AUDIO",
    MULTIPART = "MULTIPART"
}

export const GROUPED_MIME_TYPES = {
    [EMIMEGroups.TEXT]: [
        EEssentialMIMETypes.TEXT_PLAIN, EEssentialMIMETypes.TEXT_HTML,
        EEssentialMIMETypes.TEXT_CSS, EEssentialMIMETypes.TEXT_CSV, EEssentialMIMETypes.TEXT_TSV
    ],
    [EMIMEGroups.IMAGE]: [
        EEssentialMIMETypes.IMAGE_JPEG, EEssentialMIMETypes.IMAGE_PNG, EEssentialMIMETypes.IMAGE_GIF
    ],
    [EMIMEGroups.VIDEO]: [
        EEssentialMIMETypes.VIDEO_MP4
    ],
    [EMIMEGroups.APPLICATION]: [
        EEssentialMIMETypes.APPLICATION_JSON, EEssentialMIMETypes.APPLICATION_XML,
        EEssentialMIMETypes.APPLICATION_JAVASCRIPT
    ],
    [EMIMEGroups.AUDIO]: [
        EEssentialMIMETypes.AUDIO_MPEG
    ],
    [EMIMEGroups.MULTIPART]: [
        EEssentialMIMETypes.MULTIPART_FORM_DATA
    ]
} as const;
