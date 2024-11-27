'use strict';

import { TMIMETypeEntry } from '../utility.types.js';


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

export enum EMIMEExtensions {
    JSON = "json",
    TXT = "txt",
    HTML = "html",
    CSS = "css",
    PNG = "png",
    JPEG = "jpeg",
    GIF = "gif",
    MP4 = "mp4",
    MP3 = "mp3",
    MULTIPART = "multipart",
    XML = "xml",
    JS = "js",
    CSV = "csv",
    TSV = "tsv"
}

export const MIME_TYPES_ESSENTIAL: {
    [key in EEssentialMIMETypes]: TMIMETypeEntry<EEssentialMIMETypes, EMIMEExtensions, EMIMEGroups>
} = {
    [EEssentialMIMETypes.APPLICATION_JSON]: {
        type: EEssentialMIMETypes.APPLICATION_JSON, extension: EMIMEExtensions.JSON, group: EMIMEGroups.APPLICATION
    },
    [EEssentialMIMETypes.TEXT_PLAIN]: {
        type: EEssentialMIMETypes.TEXT_PLAIN, extension: EMIMEExtensions.TXT, group: EMIMEGroups.TEXT
    },
    [EEssentialMIMETypes.TEXT_HTML]: {
        type: EEssentialMIMETypes.TEXT_HTML, extension: EMIMEExtensions.HTML, group: EMIMEGroups.TEXT
    },
    [EEssentialMIMETypes.TEXT_CSS]: {
        type: EEssentialMIMETypes.TEXT_CSS, extension: EMIMEExtensions.CSS, group: EMIMEGroups.TEXT
    },
    [EEssentialMIMETypes.IMAGE_PNG]: {
        type: EEssentialMIMETypes.IMAGE_PNG, extension: EMIMEExtensions.PNG, group: EMIMEGroups.IMAGE
    },
    [EEssentialMIMETypes.IMAGE_JPEG]: {
        type: EEssentialMIMETypes.IMAGE_JPEG, extension: EMIMEExtensions.JPEG, group: EMIMEGroups.IMAGE
    },
    [EEssentialMIMETypes.IMAGE_GIF]: {
        type: EEssentialMIMETypes.IMAGE_GIF, extension: EMIMEExtensions.GIF, group: EMIMEGroups.IMAGE
    },
    [EEssentialMIMETypes.VIDEO_MP4]: {
        type: EEssentialMIMETypes.VIDEO_MP4, extension: EMIMEExtensions.MP4, group: EMIMEGroups.VIDEO
    },
    [EEssentialMIMETypes.AUDIO_MPEG]: {
        type: EEssentialMIMETypes.AUDIO_MPEG, extension: EMIMEExtensions.MP3, group: EMIMEGroups.AUDIO
    },
    [EEssentialMIMETypes.MULTIPART_FORM_DATA]: {
        type: EEssentialMIMETypes.MULTIPART_FORM_DATA, extension: EMIMEExtensions.MULTIPART, group: EMIMEGroups.MULTIPART
    },
    [EEssentialMIMETypes.APPLICATION_XML]: {
        type: EEssentialMIMETypes.APPLICATION_XML, extension: EMIMEExtensions.XML, group: EMIMEGroups.APPLICATION
    },
    [EEssentialMIMETypes.APPLICATION_JAVASCRIPT]: {
        type: EEssentialMIMETypes.APPLICATION_JAVASCRIPT, extension: EMIMEExtensions.JS, group: EMIMEGroups.APPLICATION
    },
    [EEssentialMIMETypes.TEXT_CSV]: {
        type: EEssentialMIMETypes.TEXT_CSV, extension: EMIMEExtensions.CSV, group: EMIMEGroups.TEXT
    },
    [EEssentialMIMETypes.TEXT_TSV]: {
        type: EEssentialMIMETypes.TEXT_TSV, extension: EMIMEExtensions.TSV, group: EMIMEGroups.TEXT
    }
};

