'use strict';

// NB: Will try to use to extend the essential MIME types

export enum EPopularMIMETypes {
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

export enum EPopularMIMEGroups {
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
    [EPopularMIMEGroups.TEXT]: [
        EPopularMIMETypes.TEXT_XML, EPopularMIMETypes.TEXT_YAML, EPopularMIMETypes.TEXT_MARKDOWN,
        EPopularMIMETypes.TEXT_RICHTEXT,
    ],
    [EPopularMIMEGroups.IMAGE]: [
        EPopularMIMETypes.IMAGE_BMP, EPopularMIMETypes.IMAGE_SVG_XML, EPopularMIMETypes.IMAGE_WEBP,
        EPopularMIMETypes.IMAGE_HEIF,
    ],
    [EPopularMIMEGroups.VIDEO]: [
        EPopularMIMETypes.VIDEO_WEBM, EPopularMIMETypes.VIDEO_OGG, EPopularMIMETypes.VIDEO_AVI,
        EPopularMIMETypes.VIDEO_3GP,
    ],
    [EPopularMIMEGroups.AUDIO]: [
        EPopularMIMETypes.AUDIO_WAV, EPopularMIMETypes.AUDIO_OGG, EPopularMIMETypes.AUDIO_FLAC,
        EPopularMIMETypes.AUDIO_WEBM,
    ],
    [EPopularMIMEGroups.APPLICATION]: [
        EPopularMIMETypes.APPLICATION_PDF, EPopularMIMETypes.APPLICATION_ZIP,
        EPopularMIMETypes.APPLICATION_GZIP, EPopularMIMETypes.APPLICATION_TAR,
        EPopularMIMETypes.APPLICATION_JAR, EPopularMIMETypes.APPLICATION_XHTML_XML,
    ],
    [EPopularMIMEGroups.MULTIPART]: [
        EPopularMIMETypes.MULTIPART_MIXED, EPopularMIMETypes.MULTIPART_ALTERNATIVE,
        EPopularMIMETypes.MULTIPART_RELATED,
    ],
    [EPopularMIMEGroups.FONT]: [
        EPopularMIMETypes.FONT_TTF, EPopularMIMETypes.FONT_OTF, EPopularMIMETypes.FONT_WOFF,
        EPopularMIMETypes.FONT_WOFF2,
    ],
    [EPopularMIMEGroups.DATA]: [
        EPopularMIMETypes.APPLICATION_SQL, EPopularMIMETypes.APPLICATION_XSQL,
        EPopularMIMETypes.APPLICATION_JSONLD,
    ],
} as const;
