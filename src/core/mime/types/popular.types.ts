'use strict';

import { TMIMETypeEntry } from '../utility.types.js';
import { EMIMEExtensions, EMIMEGroups } from './common.mime.js';

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

export const MIME_TYPES_POPULAR: {
    [key in EPopularMIMETypes]: TMIMETypeEntry<EPopularMIMETypes>;
} = {
    [EPopularMIMETypes.TEXT_XML]: {
        type: EPopularMIMETypes.TEXT_XML,
        extension: EMIMEExtensions.TEXT_XML,
        group: EMIMEGroups.TEXT,
    },
    [EPopularMIMETypes.TEXT_YAML]: {
        type: EPopularMIMETypes.TEXT_YAML,
        extension: EMIMEExtensions.TEXT_YAML,
        group: EMIMEGroups.TEXT,
    },
    [EPopularMIMETypes.TEXT_MARKDOWN]: {
        type: EPopularMIMETypes.TEXT_MARKDOWN,
        extension: EMIMEExtensions.TEXT_MARKDOWN,
        group: EMIMEGroups.TEXT,
    },
    [EPopularMIMETypes.TEXT_RICHTEXT]: {
        type: EPopularMIMETypes.TEXT_RICHTEXT,
        extension: EMIMEExtensions.TEXT_RICHTEXT,
        group: EMIMEGroups.TEXT,
    },
    [EPopularMIMETypes.IMAGE_BMP]: {
        type: EPopularMIMETypes.IMAGE_BMP,
        extension: EMIMEExtensions.IMAGE_BMP,
        group: EMIMEGroups.IMAGE,
    },
    [EPopularMIMETypes.IMAGE_SVG_XML]: {
        type: EPopularMIMETypes.IMAGE_SVG_XML,
        extension: EMIMEExtensions.IMAGE_SVG_XML,
        group: EMIMEGroups.IMAGE,
    },
    [EPopularMIMETypes.IMAGE_WEBP]: {
        type: EPopularMIMETypes.IMAGE_WEBP,
        extension: EMIMEExtensions.IMAGE_WEBP,
        group: EMIMEGroups.IMAGE,
    },
    [EPopularMIMETypes.IMAGE_HEIF]: {
        type: EPopularMIMETypes.IMAGE_HEIF,
        extension: EMIMEExtensions.IMAGE_HEIF,
        group: EMIMEGroups.IMAGE,
    },
    [EPopularMIMETypes.VIDEO_WEBM]: {
        type: EPopularMIMETypes.VIDEO_WEBM,
        extension: EMIMEExtensions.VIDEO_WEBM,
        group: EMIMEGroups.VIDEO,
    },
    [EPopularMIMETypes.VIDEO_OGG]: {
        type: EPopularMIMETypes.VIDEO_OGG,
        extension: EMIMEExtensions.VIDEO_OGG,
        group: EMIMEGroups.VIDEO,
    },
    [EPopularMIMETypes.VIDEO_AVI]: {
        type: EPopularMIMETypes.VIDEO_AVI,
        extension: EMIMEExtensions.VIDEO_AVI,
        group: EMIMEGroups.VIDEO,
    },
    [EPopularMIMETypes.VIDEO_3GP]: {
        type: EPopularMIMETypes.VIDEO_3GP,
        extension: EMIMEExtensions.VIDEO_3GP,
        group: EMIMEGroups.VIDEO,
    },
    [EPopularMIMETypes.AUDIO_WAV]: {
        type: EPopularMIMETypes.AUDIO_WAV,
        extension: EMIMEExtensions.AUDIO_WAV,
        group: EMIMEGroups.AUDIO,
    },
    [EPopularMIMETypes.AUDIO_OGG]: {
        type: EPopularMIMETypes.AUDIO_OGG,
        extension: EMIMEExtensions.AUDIO_OGG,
        group: EMIMEGroups.AUDIO,
    },
    [EPopularMIMETypes.AUDIO_FLAC]: {
        type: EPopularMIMETypes.AUDIO_FLAC,
        extension: EMIMEExtensions.AUDIO_FLAC,
        group: EMIMEGroups.AUDIO,
    },
    [EPopularMIMETypes.AUDIO_WEBM]: {
        type: EPopularMIMETypes.AUDIO_WEBM,
        extension: EMIMEExtensions.AUDIO_WEBM,
        group: EMIMEGroups.AUDIO,
    },
    [EPopularMIMETypes.APPLICATION_PDF]: {
        type: EPopularMIMETypes.APPLICATION_PDF,
        extension: EMIMEExtensions.APPLICATION_PDF,
        group: EMIMEGroups.APPLICATION,
    },
    [EPopularMIMETypes.APPLICATION_ZIP]: {
        type: EPopularMIMETypes.APPLICATION_ZIP,
        extension: EMIMEExtensions.APPLICATION_ZIP,
        group: EMIMEGroups.APPLICATION,
    },
    [EPopularMIMETypes.APPLICATION_GZIP]: {
        type: EPopularMIMETypes.APPLICATION_GZIP,
        extension: EMIMEExtensions.APPLICATION_GZIP,
        group: EMIMEGroups.APPLICATION,
    },
    [EPopularMIMETypes.APPLICATION_TAR]: {
        type: EPopularMIMETypes.APPLICATION_TAR,
        extension: EMIMEExtensions.APPLICATION_TAR,
        group: EMIMEGroups.APPLICATION,
    },
    [EPopularMIMETypes.APPLICATION_JAR]: {
        type: EPopularMIMETypes.APPLICATION_JAR,
        extension: EMIMEExtensions.APPLICATION_JAR,
        group: EMIMEGroups.APPLICATION,
    },
    [EPopularMIMETypes.APPLICATION_XHTML_XML]: {
        type: EPopularMIMETypes.APPLICATION_XHTML_XML,
        extension: EMIMEExtensions.APPLICATION_XHTML_XML,
        group: EMIMEGroups.APPLICATION,
    },
    [EPopularMIMETypes.MULTIPART_MIXED]: {
        type: EPopularMIMETypes.MULTIPART_MIXED,
        extension: EMIMEExtensions.MULTIPART_MIXED,
        group: EMIMEGroups.MULTIPART,
    },
    [EPopularMIMETypes.MULTIPART_ALTERNATIVE]: {
        type: EPopularMIMETypes.MULTIPART_ALTERNATIVE,
        extension: EMIMEExtensions.MULTIPART_ALTERNATIVE,
        group: EMIMEGroups.MULTIPART,
    },
    [EPopularMIMETypes.MULTIPART_RELATED]: {
        type: EPopularMIMETypes.MULTIPART_RELATED,
        extension: EMIMEExtensions.MULTIPART_RELATED,
        group: EMIMEGroups.MULTIPART,
    },
    [EPopularMIMETypes.FONT_TTF]: {
        type: EPopularMIMETypes.FONT_TTF,
        extension: EMIMEExtensions.FONT_TTF,
        group: EMIMEGroups.FONT,
    },
    [EPopularMIMETypes.FONT_OTF]: {
        type: EPopularMIMETypes.FONT_OTF,
        extension: EMIMEExtensions.FONT_OTF,
        group: EMIMEGroups.FONT,
    },
    [EPopularMIMETypes.FONT_WOFF]: {
        type: EPopularMIMETypes.FONT_WOFF,
        extension: EMIMEExtensions.FONT_WOFF,
        group: EMIMEGroups.FONT,
    },
    [EPopularMIMETypes.FONT_WOFF2]: {
        type: EPopularMIMETypes.FONT_WOFF2,
        extension: EMIMEExtensions.FONT_WOFF2,
        group: EMIMEGroups.FONT,
    },
    [EPopularMIMETypes.APPLICATION_SQL]: {
        type: EPopularMIMETypes.APPLICATION_SQL,
        extension: EMIMEExtensions.APPLICATION_SQL,
        group: EMIMEGroups.APPLICATION,
    },
    [EPopularMIMETypes.APPLICATION_XSQL]: {
        type: EPopularMIMETypes.APPLICATION_XSQL,
        extension: EMIMEExtensions.APPLICATION_XSQL,
        group: EMIMEGroups.APPLICATION,
    },
    [EPopularMIMETypes.APPLICATION_JSONLD]: {
        type: EPopularMIMETypes.APPLICATION_JSONLD,
        extension: EMIMEExtensions.APPLICATION_JSONLD,
        group: EMIMEGroups.APPLICATION,
    },
} as const;
