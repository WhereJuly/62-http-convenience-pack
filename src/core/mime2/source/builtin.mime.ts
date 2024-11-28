'use strict';

import { MIMExtensionInapplicable } from '@src/core/mime2/HTTPMIMETypesConvenience2.js';

/**
 * IMPORTANT: This is the read-only single source of truth for built-in MIME types.
 */
export const BuiltInMIMETypesSource = [
    // Text
    ['text/plain', 'TEXT', '.txt'],
    ['text/html', 'TEXT', '.html'],
    ['text/css', 'TEXT', '.css'],
    ['text/csv', 'TEXT', '.csv'],
    ['text/tab-separated-values', 'TEXT', '.tsv'],
    ['text/xml', 'TEXT', '.xml'],
    ['text/yaml', 'TEXT', '.yaml'],
    ['text/markdown', 'TEXT', '.md'],
    ['text/richtext', 'TEXT', '.rtf'],

    // Image
    ['image/png', 'IMAGE', '.png'],
    ['image/jpeg', 'IMAGE', '.jpeg'],
    ['image/gif', 'IMAGE', '.gif'],
    ['image/bmp', 'IMAGE', '.bmp'],
    ['image/svg+xml', 'IMAGE', '.svg'],
    ['image/webp', 'IMAGE', '.webp'],
    ['image/heif', 'IMAGE', '.heif'],

    // Video
    ['video/mp4', 'VIDEO', '.mp4'],
    ['video/webm', 'VIDEO', '.webm'],
    ['video/ogg', 'VIDEO', '.ogv'],
    ['video/avi', 'VIDEO', '.avi'],
    ['video/3gpp', 'VIDEO', '.3gp'],

    // Audio
    ['audio/mpeg', 'AUDIO', '.mp3'],
    ['audio/wav', 'AUDIO', '.wav'],
    ['audio/ogg', 'AUDIO', '.ogg'],
    ['audio/flac', 'AUDIO', '.flac'],
    ['audio/webm', 'AUDIO', '.webm'],

    // Application
    ['application/json', 'APPLICATION', '.json'],
    ['application/xml', 'APPLICATION', '.xml'],
    ['application/javascript', 'APPLICATION', '.js'],
    ['application/pdf', 'APPLICATION', '.pdf'],
    ['application/zip', 'APPLICATION', '.zip'],
    ['application/gzip', 'APPLICATION', '.gz'],
    ['application/x-tar', 'APPLICATION', '.tar'],
    ['application/java-archive', 'APPLICATION', '.jar'],
    ['application/xhtml+xml', 'APPLICATION', '.xhtml'],
    ['application/sql', 'APPLICATION', '.sql'],
    ['application/x-sql', 'APPLICATION', '.sql'],
    ['application/ld+json', 'APPLICATION', '.jsonld'],

    // Multipart
    ['multipart/form-data', 'MULTIPART', MIMExtensionInapplicable],
    ['multipart/mixed', 'MULTIPART', MIMExtensionInapplicable],
    ['multipart/alternative', 'MULTIPART', MIMExtensionInapplicable],
    ['multipart/related', 'MULTIPART', MIMExtensionInapplicable],

    // Font
    ['font/ttf', 'FONT', '.ttf'],
    ['font/otf', 'FONT', '.otf'],
    ['font/woff', 'FONT', '.woff'],
    ['font/woff2', 'FONT', '.woff2'],
] as const;
