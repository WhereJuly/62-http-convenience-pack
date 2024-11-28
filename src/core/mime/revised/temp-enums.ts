'use strict';

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
