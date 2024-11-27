'use strict';

// NB: Will try to use to extend the essential MIME types

export enum EExtendedMIMETypes {
    // Text MIME Types
    TEXT_XML = "text/xml",
    TEXT_YAML = "text/yaml",
    TEXT_MARKDOWN = "text/markdown",
    TEXT_RICHTEXT = "text/richtext",

    // Image MIME Types
    IMAGE_BMP = "image/bmp",
    IMAGE_SVG_XML = "image/svg+xml",
    IMAGE_WEBP = "image/webp",
    IMAGE_HEIF = "image/heif",

    // Video MIME Types
    VIDEO_WEBM = "video/webm",
    VIDEO_OGG = "video/ogg",
    VIDEO_AVI = "video/avi",
    VIDEO_3GP = "video/3gpp",

    // Audio MIME Types
    AUDIO_WAV = "audio/wav",
    AUDIO_OGG = "audio/ogg",
    AUDIO_FLAC = "audio/flac",
    AUDIO_WEBM = "audio/webm",

    // Application MIME Types
    APPLICATION_PDF = "application/pdf",
    APPLICATION_ZIP = "application/zip",
    APPLICATION_GZIP = "application/gzip",
    APPLICATION_TAR = "application/x-tar",
    APPLICATION_JAR = "application/java-archive",
    APPLICATION_XHTML_XML = "application/xhtml+xml",

    // Multipart MIME Types
    MULTIPART_MIXED = "multipart/mixed",
    MULTIPART_ALTERNATIVE = "multipart/alternative",
    MULTIPART_RELATED = "multipart/related",

    // Font MIME Types
    FONT_TTF = "font/ttf",
    FONT_OTF = "font/otf",
    FONT_WOFF = "font/woff",
    FONT_WOFF2 = "font/woff2",

    // Data MIME Types
    APPLICATION_SQL = "application/sql",
    APPLICATION_XSQL = "application/x-sql",

    // JSON-LD MIME Type
    APPLICATION_JSONLD = "application/ld+json",
}

export enum EExtendedMIMEGroups {
    TEXT = "TEXT",
    IMAGE = "IMAGE",
    VIDEO = "VIDEO",
    APPLICATION = "APPLICATION",
    AUDIO = "AUDIO",
    MULTIPART = "MULTIPART",
    FONT = "FONT",
    DATA = "DATA"
}

export const GROUPED_EXTENDED_MIME_TYPES = {
    [EExtendedMIMEGroups.TEXT]: [
        EExtendedMIMETypes.TEXT_XML, EExtendedMIMETypes.TEXT_YAML, EExtendedMIMETypes.TEXT_MARKDOWN,
        EExtendedMIMETypes.TEXT_RICHTEXT,
    ],
    [EExtendedMIMEGroups.IMAGE]: [
        EExtendedMIMETypes.IMAGE_BMP, EExtendedMIMETypes.IMAGE_SVG_XML, EExtendedMIMETypes.IMAGE_WEBP,
        EExtendedMIMETypes.IMAGE_HEIF,
    ],
    [EExtendedMIMEGroups.VIDEO]: [
        EExtendedMIMETypes.VIDEO_WEBM, EExtendedMIMETypes.VIDEO_OGG, EExtendedMIMETypes.VIDEO_AVI,
        EExtendedMIMETypes.VIDEO_3GP,
    ],
    [EExtendedMIMEGroups.AUDIO]: [
        EExtendedMIMETypes.AUDIO_WAV, EExtendedMIMETypes.AUDIO_OGG, EExtendedMIMETypes.AUDIO_FLAC,
        EExtendedMIMETypes.AUDIO_WEBM,
    ],
    [EExtendedMIMEGroups.APPLICATION]: [
        EExtendedMIMETypes.APPLICATION_PDF, EExtendedMIMETypes.APPLICATION_ZIP,
        EExtendedMIMETypes.APPLICATION_GZIP, EExtendedMIMETypes.APPLICATION_TAR,
        EExtendedMIMETypes.APPLICATION_JAR, EExtendedMIMETypes.APPLICATION_XHTML_XML,
    ],
    [EExtendedMIMEGroups.MULTIPART]: [
        EExtendedMIMETypes.MULTIPART_MIXED, EExtendedMIMETypes.MULTIPART_ALTERNATIVE,
        EExtendedMIMETypes.MULTIPART_RELATED,
    ],
    [EExtendedMIMEGroups.FONT]: [
        EExtendedMIMETypes.FONT_TTF, EExtendedMIMETypes.FONT_OTF, EExtendedMIMETypes.FONT_WOFF,
        EExtendedMIMETypes.FONT_WOFF2,
    ],
    [EExtendedMIMEGroups.DATA]: [
        EExtendedMIMETypes.APPLICATION_SQL, EExtendedMIMETypes.APPLICATION_XSQL,
        EExtendedMIMETypes.APPLICATION_JSONLD,
    ],
} as const;
