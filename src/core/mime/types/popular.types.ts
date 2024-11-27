'use strict';

import { MIMExtensionInapplicable } from '../HTTPMIMETypesConvenience.js';
import { TMIMETypeEntry } from '../utility.types.js';

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

export enum EPopularMIMEExtensions {
    // Text MIME Types
    TEXT_XML = ".xml",
    TEXT_YAML = ".yaml",
    TEXT_MARKDOWN = ".md",
    TEXT_RICHTEXT = ".rtf",

    // Image MIME Types
    IMAGE_BMP = ".bmp",
    IMAGE_SVG_XML = ".svg",
    IMAGE_WEBP = ".webp",
    IMAGE_HEIF = ".heif",

    // Video MIME Types
    VIDEO_WEBM = ".webm",
    VIDEO_OGG = ".ogv",
    VIDEO_AVI = ".avi",
    VIDEO_3GP = ".3gp",

    // Audio MIME Types
    AUDIO_WAV = ".wav",
    AUDIO_OGG = ".ogg",
    AUDIO_FLAC = ".flac",

    /**
     * NB: Special format for duplicated enum values `number-prefix:extension` to make them unique.
     * The getters returning the the entire mime type or extension should remove the number prefix.
     */
    AUDIO_WEBM = "1:.webm",

    // Application MIME Types
    APPLICATION_PDF = ".pdf",
    APPLICATION_ZIP = ".zip",
    APPLICATION_GZIP = ".gz",
    APPLICATION_TAR = ".tar",
    APPLICATION_JAR = ".jar",
    APPLICATION_XHTML_XML = ".xhtml",

    // Multipart MIME Types
    /**
     * The getters returning the the entire mime type or extension should return null
     * where the extension is inapplicable.
     */
    MULTIPART_MIXED = `${MIMExtensionInapplicable}:1`,
    MULTIPART_ALTERNATIVE = `${MIMExtensionInapplicable}:2`,
    MULTIPART_RELATED = `${MIMExtensionInapplicable}:3`,

    // Font MIME Types
    FONT_TTF = ".ttf",
    FONT_OTF = ".otf",
    FONT_WOFF = ".woff",
    FONT_WOFF2 = ".woff2",

    // Data MIME Types
    APPLICATION_SQL = ".sql",
    APPLICATION_XSQL = "1:.sql",

    // JSON-LD MIME Type
    APPLICATION_JSONLD = ".jsonld",
}


export const MIME_TYPES_POPULAR: {
    [key in EPopularMIMETypes]: TMIMETypeEntry<EPopularMIMETypes, EPopularMIMEExtensions, EPopularMIMEGroups>;
} = {
    [EPopularMIMETypes.TEXT_XML]: {
        type: EPopularMIMETypes.TEXT_XML,
        extension: EPopularMIMEExtensions.TEXT_XML,
        group: EPopularMIMEGroups.TEXT,
    },
    [EPopularMIMETypes.TEXT_YAML]: {
        type: EPopularMIMETypes.TEXT_YAML,
        extension: EPopularMIMEExtensions.TEXT_YAML,
        group: EPopularMIMEGroups.TEXT,
    },
    [EPopularMIMETypes.TEXT_MARKDOWN]: {
        type: EPopularMIMETypes.TEXT_MARKDOWN,
        extension: EPopularMIMEExtensions.TEXT_MARKDOWN,
        group: EPopularMIMEGroups.TEXT,
    },
    [EPopularMIMETypes.TEXT_RICHTEXT]: {
        type: EPopularMIMETypes.TEXT_RICHTEXT,
        extension: EPopularMIMEExtensions.TEXT_RICHTEXT,
        group: EPopularMIMEGroups.TEXT,
    },
    [EPopularMIMETypes.IMAGE_BMP]: {
        type: EPopularMIMETypes.IMAGE_BMP,
        extension: EPopularMIMEExtensions.IMAGE_BMP,
        group: EPopularMIMEGroups.IMAGE,
    },
    [EPopularMIMETypes.IMAGE_SVG_XML]: {
        type: EPopularMIMETypes.IMAGE_SVG_XML,
        extension: EPopularMIMEExtensions.IMAGE_SVG_XML,
        group: EPopularMIMEGroups.IMAGE,
    },
    [EPopularMIMETypes.IMAGE_WEBP]: {
        type: EPopularMIMETypes.IMAGE_WEBP,
        extension: EPopularMIMEExtensions.IMAGE_WEBP,
        group: EPopularMIMEGroups.IMAGE,
    },
    [EPopularMIMETypes.IMAGE_HEIF]: {
        type: EPopularMIMETypes.IMAGE_HEIF,
        extension: EPopularMIMEExtensions.IMAGE_HEIF,
        group: EPopularMIMEGroups.IMAGE,
    },
    [EPopularMIMETypes.VIDEO_WEBM]: {
        type: EPopularMIMETypes.VIDEO_WEBM,
        extension: EPopularMIMEExtensions.VIDEO_WEBM,
        group: EPopularMIMEGroups.VIDEO,
    },
    [EPopularMIMETypes.VIDEO_OGG]: {
        type: EPopularMIMETypes.VIDEO_OGG,
        extension: EPopularMIMEExtensions.VIDEO_OGG,
        group: EPopularMIMEGroups.VIDEO,
    },
    [EPopularMIMETypes.VIDEO_AVI]: {
        type: EPopularMIMETypes.VIDEO_AVI,
        extension: EPopularMIMEExtensions.VIDEO_AVI,
        group: EPopularMIMEGroups.VIDEO,
    },
    [EPopularMIMETypes.VIDEO_3GP]: {
        type: EPopularMIMETypes.VIDEO_3GP,
        extension: EPopularMIMEExtensions.VIDEO_3GP,
        group: EPopularMIMEGroups.VIDEO,
    },
    [EPopularMIMETypes.AUDIO_WAV]: {
        type: EPopularMIMETypes.AUDIO_WAV,
        extension: EPopularMIMEExtensions.AUDIO_WAV,
        group: EPopularMIMEGroups.AUDIO,
    },
    [EPopularMIMETypes.AUDIO_OGG]: {
        type: EPopularMIMETypes.AUDIO_OGG,
        extension: EPopularMIMEExtensions.AUDIO_OGG,
        group: EPopularMIMEGroups.AUDIO,
    },
    [EPopularMIMETypes.AUDIO_FLAC]: {
        type: EPopularMIMETypes.AUDIO_FLAC,
        extension: EPopularMIMEExtensions.AUDIO_FLAC,
        group: EPopularMIMEGroups.AUDIO,
    },
    [EPopularMIMETypes.AUDIO_WEBM]: {
        type: EPopularMIMETypes.AUDIO_WEBM,
        extension: EPopularMIMEExtensions.AUDIO_WEBM,
        group: EPopularMIMEGroups.AUDIO,
    },
    [EPopularMIMETypes.APPLICATION_PDF]: {
        type: EPopularMIMETypes.APPLICATION_PDF,
        extension: EPopularMIMEExtensions.APPLICATION_PDF,
        group: EPopularMIMEGroups.APPLICATION,
    },
    [EPopularMIMETypes.APPLICATION_ZIP]: {
        type: EPopularMIMETypes.APPLICATION_ZIP,
        extension: EPopularMIMEExtensions.APPLICATION_ZIP,
        group: EPopularMIMEGroups.APPLICATION,
    },
    [EPopularMIMETypes.APPLICATION_GZIP]: {
        type: EPopularMIMETypes.APPLICATION_GZIP,
        extension: EPopularMIMEExtensions.APPLICATION_GZIP,
        group: EPopularMIMEGroups.APPLICATION,
    },
    [EPopularMIMETypes.APPLICATION_TAR]: {
        type: EPopularMIMETypes.APPLICATION_TAR,
        extension: EPopularMIMEExtensions.APPLICATION_TAR,
        group: EPopularMIMEGroups.APPLICATION,
    },
    [EPopularMIMETypes.APPLICATION_JAR]: {
        type: EPopularMIMETypes.APPLICATION_JAR,
        extension: EPopularMIMEExtensions.APPLICATION_JAR,
        group: EPopularMIMEGroups.APPLICATION,
    },
    [EPopularMIMETypes.APPLICATION_XHTML_XML]: {
        type: EPopularMIMETypes.APPLICATION_XHTML_XML,
        extension: EPopularMIMEExtensions.APPLICATION_XHTML_XML,
        group: EPopularMIMEGroups.APPLICATION,
    },
    [EPopularMIMETypes.MULTIPART_MIXED]: {
        type: EPopularMIMETypes.MULTIPART_MIXED,
        extension: EPopularMIMEExtensions.MULTIPART_MIXED,
        group: EPopularMIMEGroups.MULTIPART,
    },
    [EPopularMIMETypes.MULTIPART_ALTERNATIVE]: {
        type: EPopularMIMETypes.MULTIPART_ALTERNATIVE,
        extension: EPopularMIMEExtensions.MULTIPART_ALTERNATIVE,
        group: EPopularMIMEGroups.MULTIPART,
    },
    [EPopularMIMETypes.MULTIPART_RELATED]: {
        type: EPopularMIMETypes.MULTIPART_RELATED,
        extension: EPopularMIMEExtensions.MULTIPART_RELATED,
        group: EPopularMIMEGroups.MULTIPART,
    },
    [EPopularMIMETypes.FONT_TTF]: {
        type: EPopularMIMETypes.FONT_TTF,
        extension: EPopularMIMEExtensions.FONT_TTF,
        group: EPopularMIMEGroups.FONT,
    },
    [EPopularMIMETypes.FONT_OTF]: {
        type: EPopularMIMETypes.FONT_OTF,
        extension: EPopularMIMEExtensions.FONT_OTF,
        group: EPopularMIMEGroups.FONT,
    },
    [EPopularMIMETypes.FONT_WOFF]: {
        type: EPopularMIMETypes.FONT_WOFF,
        extension: EPopularMIMEExtensions.FONT_WOFF,
        group: EPopularMIMEGroups.FONT,
    },
    [EPopularMIMETypes.FONT_WOFF2]: {
        type: EPopularMIMETypes.FONT_WOFF2,
        extension: EPopularMIMEExtensions.FONT_WOFF2,
        group: EPopularMIMEGroups.FONT,
    },
    [EPopularMIMETypes.APPLICATION_SQL]: {
        type: EPopularMIMETypes.APPLICATION_SQL,
        extension: EPopularMIMEExtensions.APPLICATION_SQL,
        group: EPopularMIMEGroups.DATA,
    },
    [EPopularMIMETypes.APPLICATION_XSQL]: {
        type: EPopularMIMETypes.APPLICATION_XSQL,
        extension: EPopularMIMEExtensions.APPLICATION_XSQL,
        group: EPopularMIMEGroups.DATA,
    },
    [EPopularMIMETypes.APPLICATION_JSONLD]: {
        type: EPopularMIMETypes.APPLICATION_JSONLD,
        extension: EPopularMIMEExtensions.APPLICATION_JSONLD,
        group: EPopularMIMEGroups.APPLICATION,
    },
} as const;
