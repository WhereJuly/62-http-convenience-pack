'use strict';

import { MIMExtensionInapplicable } from '@src/core/mime/HTTPMIMETypesConvenience.js';

export enum EMIMETypes {
    // TEXT Group
    TEXT_PLAIN = "text/plain",
    TEXT_HTML = "text/html",
    TEXT_CSS = "text/css",
    TEXT_CSV = "text/csv",
    TEXT_TSV = "text/tab-separated-values",
    TEXT_XML = "text/xml",
    TEXT_YAML = "text/yaml",
    TEXT_MARKDOWN = "text/markdown",
    TEXT_RICHTEXT = "text/richtext",

    // IMAGE Group
    IMAGE_PNG = "image/png",
    IMAGE_JPEG = "image/jpeg",
    IMAGE_GIF = "image/gif",
    IMAGE_BMP = "image/bmp",
    IMAGE_SVG_XML = "image/svg+xml",
    IMAGE_WEBP = "image/webp",
    IMAGE_HEIF = "image/heif",

    // VIDEO Group
    VIDEO_MP4 = "video/mp4",
    VIDEO_WEBM = "video/webm",
    VIDEO_OGG = "video/ogg",
    VIDEO_AVI = "video/avi",
    VIDEO_3GP = "video/3gpp",

    // AUDIO Group
    AUDIO_MPEG = "audio/mpeg",
    AUDIO_WAV = "audio/wav",
    AUDIO_OGG = "audio/ogg",
    AUDIO_FLAC = "audio/flac",
    AUDIO_WEBM = "audio/webm",

    // APPLICATION Group
    APPLICATION_JSON = "application/json",
    APPLICATION_XML = "application/xml",
    APPLICATION_JAVASCRIPT = "application/javascript",
    APPLICATION_PDF = "application/pdf",
    APPLICATION_ZIP = "application/zip",
    APPLICATION_GZIP = "application/gzip",
    APPLICATION_TAR = "application/x-tar",
    APPLICATION_JAR = "application/java-archive",
    APPLICATION_XHTML_XML = "application/xhtml+xml",
    APPLICATION_SQL = "application/sql",
    APPLICATION_XSQL = "application/x-sql",
    APPLICATION_JSONLD = "application/ld+json",

    // MULTIPART Group
    MULTIPART_FORM_DATA = "multipart/form-data",
    MULTIPART_MIXED = "multipart/mixed",
    MULTIPART_ALTERNATIVE = "multipart/alternative",
    MULTIPART_RELATED = "multipart/related",

    // FONT Group
    FONT_TTF = "font/ttf",
    FONT_OTF = "font/otf",
    FONT_WOFF = "font/woff",
    FONT_WOFF2 = "font/woff2",
}

export enum EMIMEGroups {
    APPLICATION = "APPLICATION",
    AUDIO = "AUDIO",
    EXAMPLE = "EXAMPLE",
    FONT = "FONT",
    HAPTICS = "HAPTICS",
    IMAGE = "IMAGE",
    MESSAGE = "MESSAGE",
    MODEL = "MODEL",
    MULTIPART = "MULTIPART",
    TEXT = "TEXT",
    VIDEO = "VIDEO"
}

export enum EMIMEExtensions {
    // --- Essential MIME types extensions
    JSON = ".json",
    TXT = ".txt",
    HTML = ".html",
    CSS = ".css",
    PNG = ".png",
    JPEG = ".jpeg",
    GIF = ".gif",
    MP4 = ".mp4",
    MP3 = ".mp3",
    MULTIPART = ".multipart",
    XML = ".xml",
    JS = ".js",
    CSV = ".csv",
    TSV = ".tsv",

    // --- Popular MIME types extensions
    // Text MIME Types
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
    APPLICATION_SQL = ".sql",
    APPLICATION_XSQL = "1:.sql",

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

    // JSON-LD MIME Type
    APPLICATION_JSONLD = ".jsonld",
}
