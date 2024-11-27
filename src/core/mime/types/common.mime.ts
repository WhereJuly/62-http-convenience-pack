'use strict';

import { MIMExtensionInapplicable } from '../HTTPMIMETypesConvenience.js';

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
    TSV = "tsv",

    // --- Popular MIME types extensions
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
