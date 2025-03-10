<div align="center">
  <img src="./images/banner-6-w1200.jpg" width="100%"/>
</div>

## HTTP Headers Module

- [HTTP Headers Module](#http-headers-module)
  - [At a Glance](#at-a-glance)
  - [A Basic Use Case](#a-basic-use-case)
  - [API Reference](#api-reference)
    - [`EHTTPHeaders` Enum](#ehttpheaders-enum)
    - [`HTTPHeadersConvenience` Class](#httpheadersconvenience-class)
      - [`.make()` Method](#make-method)
      - [`.extract()` Method](#extract-method)
      - [`.hasValue()` Method](#hasvalue-method)
      - [`.toKeyValue()` Method](#tokeyvalue-method)
      - [`.normalize()` Method](#normalize-method)
    - [`BuiltInExtractors` Class](#builtinextractors-class)
      - [`ETokenSchemes` Enum](#etokenschemes-enum)
      - [`.array()` Method](#array-method)
      - [`.date()` Method](#date-method)
      - [`.b64()` Method](#b64-method)
      - [`.token()` Method](#token-method)
  - [Header Value Extractors](#header-value-extractors)

### At a Glance

The module contains the enum of selected HTTP headers frequently used by custom web applications from [IANA](https://www.iana.org/assignments/http-fields/http-fields.xhtml) list.

As other modules in the Pack it allows for uniformity, type-safely and autocompletion. It as well provides a number of convenience methods for headers making, extraction, validation. See [the basic use case](#a-basic-use-case), the [combined usage example](./combined-usage-example.md) and the public [API reference](#api-reference).

### A Basic Use Case

Start with setting the headers on front-end's request.

```typescript
import { HTTPHeadersConvenience, EHTTPHeaders, EHTTPMIMETypes } from 'http-convenience-pack';

const response = await fetch('https://api.example.com/data', {
 /**
  * Make or autocomplete the correct headers and mime types from the list provided.
  */
 headers: {
  // Make the Authorization header.
  ...HTTPHeadersConvenience.make(EHTTPHeaders.Authorization, EMakerTokenSchemes.Bearer, 'myBearerToken'),

  // Set no special treatment header with autocomplete using enums and constants
  [EHTTPHeaders.ContentType]: MIME_TYPES_BUILTIN['image/png'].type
 }
});
```

Receive request on the backend and process headers.

```typescript
import { HTTPHeadersConvenience, EHTTPHeaders, EHTTPMIMETypes, BuiltInExtractors } from 'http-convenience-pack';

const token = HTTPHeadersConvenience.extract(headers, EHTTPHeaders.Authorization, BuiltInExtractors.token); // 'myBearerToken'
const contentType = HTTPHeadersConvenience.extract(headers, EHTTPHeaders.ContentType); // 'image/png'
// Process the values according to your application needs.
```

### API Reference

#### `EHTTPHeaders` Enum

The enum of headers frequently used in custom web applications. See the list in [the code](/src/core/headers/headers.types.ts).

consider extending proposals via GitHub Discussion.

#### `HTTPHeadersConvenience` Class

The static class that provides the HTTP Headers convenience methods for the headers manipulations. Implements case-insensitive comparisons for header names according to the RFC.

##### `.make()` Method

Generates an HTTP Authorization header object `TAuthorizationHeaderObject` for authorization based on the specified token scheme {@link EMakerTokenSchemes}. So far only `Authorization` header with `Bearer` and `Basic` schemes implemented.

Signature: `public static make(header: EHTTPHeaders.Authorization, scheme: EMakerTokenSchemes, token: TAuthorizationTokenValue, _maker?: unknown): TAuthorizationHeaderObject`

```typescript
import HTTPMethodsConvenience from 'http-convenience-pack';

/**
 * Make a Bearer token Authorization header.
 */
HTTPHeadersConvenience.make(EHTTPHeaders.Authorization, EMakerTokenSchemes.Bearer, 'myBearerToken'); // { Authorization: "Bearer myBearerToken" }

/**
 * Make a Basic token Authorization header.
 */
HTTPHeadersConvenience.make(EHTTPHeaders.Authorization, EMakerTokenSchemes.Basic, ['username', 'password']); // { Authorization: "Basic dXNlcm5hbWU6cGFzc3dvcmQ=" }
```

Request additional implementation if you observe valuable use cases in GitHub [Discussions](https://github.com/WhereJuly/62-http-convenience-pack/discussions).

##### `.extract()` Method

Extracts a header value from the provided headers object. By default returns plain string value of the header. Can return the header value transformed with built-in or custom extractor into string, token, number, array, date (all are [built-in](#builtinextractors-class)), or object etc. (custom).

Signature: `public static extract<GExtractorReturns = string>(headersObject: THeadersObject, headerName: EHTTPHeaders | string, extractor_?: TExtractorFunction<GExtractorReturns>): string | GExtractorReturns | null`

**Usage**

```typescript
import HTTPMethodsConvenience from 'http-convenience-pack';

/**
 * Basic usage.
 */
const headers = { 'Content-Type': 'application/json' };
console.log(HTTPHeadersConvenience.extract(headers, EHTTPHeaders.ContentType)); // 'application/json'

/**
 * Custom extractor with string return value type, transforms value to upper case.
 */
const extractor = (value) => value.toUpperCase();
console.log(HTTPHeadersConvenience.extract(headers, EHTTPHeaders.ContentType, extractor)); // 'APPLICATION/JSON'

/**
 * Custom extractor with custom return value type, array of strings.
 */
const headers = { 'Content-Type': 'application/json', 'Accept-Language': 'en-US,fr-CA' };
const extractor = (value) => value.split(',');
console.log(HTTPHeadersConvenience.extract<string[]>(headers, EHTTPHeaders.AcceptLanguage, extractor)); // ['en-US', 'fr-CA']

/**
 * Similar to the above using the built-in (see `BuiltInExtractors` class) convenience array extractor.
 */
const headers = { 'Content-Type': 'application/json', 'Accept-Language': 'en-US,fr-CA' };
console.log(HTTPHeadersConvenience.extract<string[]>(headers, EHTTPHeaders.AcceptLanguage, BuiltInExtractors.array)); // ['en-US', 'fr-CA']

/**
 * Use `BuiltInExtractors.token` to extract Basic authorization token
 * and transform to `[login, password]` tuple (see `BuiltInExtractors` class).
 */
const headers = { Authorization: 'Basic dXNlcm5hbWU6cGFzc3dvcmQ=' };
console.log(HTTPHeadersConvenience.extract<string[]>(headers, EHTTPHeaders.Authorization, BuiltInExtractors.token)); // ['username', 'password']
```

##### `.hasValue()` Method

Checks if the value of a specific header contains the `expected` content. Uses [`HTTPHeadersConvenience.extract`](#extract-method) under the hood to extract the header value then compares to the `expected` value. The `expected` value should match **the extracted and transformed value**.

Convenient replacement for `.extract(...) === 'header-value` use cases.

Signature: `public static hasValue<GExtractorReturns = string>(headersObject: THeadersObject, headerName: EHTTPHeaders | string, contains: string | string[], extractor?: TExtractorFunction<GExtractorReturns>): boolean`

**Usage**

```typescript
import HTTPMethodsConvenience from 'http-convenience-pack';

/**
 * Check plain string header values presence.
 */

const headers = { 'Content-Type': 'application/json' };
HTTPHeadersConvenience.hasValue(headers, EHTTPHeaders.ContentType, MIME_TYPES_BUILTIN['application/json'].type); // true

/**
 * Check Basic authorization `[login, password]` scheme value.
 */
const headers = { Authorization: 'Basic dXNlcm5hbWU6cGFzc3dvcmQ=' };
HTTPHeadersConvenience.hasValue<string[]>(headers, EHTTPHeaders.Authorization, ['username', 'password'], BuiltInExtractors.token); // true
```

##### `.toKeyValue()` Method

Finds the key-value pair in a headers object where the key matches the normalized header name. If not found `[string, string]` tuple, returns null. Merely an advanced helper method.

Signature: `public static toKeyValue(headersObject: THeadersObject, headerName: EHTTPHeaders | string): [string, string] | null`

**Usage**

```typescript
import HTTPMethodsConvenience from 'http-convenience-pack';

HTTPHeadersConvenience.toKeyValue(headers, EHTTPHeaders.ContentType); // ['Content-Type', 'application/json']
```

##### `.normalize()` Method

Normalizes the given HTTP header name by converting it to lowercase. Merely for an internal use cases.

Signature: `public static normalize(header: EHTTPHeaders | string): string`

**Usage**

```typescript
import HTTPMethodsConvenience from 'http-convenience-pack';

HTTPHeadersConvenience.normalize('Content-Type'); // 'content-type'
HTTPHeadersConvenience.normalize(EHTTPHeaders.Authorization); // 'authorization'
```

#### `BuiltInExtractors` Class

##### `ETokenSchemes` Enum

The built-in Authorization header token value schemes for auto-detected value extraction, namely `Bearer`, `Basic`, `APIKey`. Merely for internal use.

##### `.array()` Method

Extracts the array from a string. By default uses `,` delimiter, optionally allows using a specified delimiter.

Signature: `public static array(maybeString: string, by: string = ','): string[]`

**Usage**

```typescript
import BuiltInExtractors from 'http-convenience-pack';

BuiltInExtractors.array('a,b,c'); // ['a', 'b', 'c']
BuiltInExtractors.array('login:password', ':'); // ['login', 'password']
BuiltInExtractors.array(''); // ['']
BuiltInExtractors.array(null); // []; Not an array;
```

##### `.date()` Method

Parses a string into a `Date` object. If the string is invalid, returns `null`.

Signature: `public static date(maybeDateString: string): Date | null`

**Usage**

```typescript
import BuiltInExtractors from 'http-convenience-pack';

BuiltInExtractors.date('2024-12-03'); // 2024-12-03T00:00:00.000Z
BuiltInExtractors.date(123 as any); // null; Invalid date string or not a string
```

##### `.b64()` Method

Decodes a Base64-encoded string into a UTF-8 string. Returns an empty string if the input is not a valid Base64 string.

Signature: `public static b64(maybeBase64String: string): string`

**Usage**

```typescript
import BuiltInExtractors from 'http-convenience-pack';

BuiltInExtractors.b64('dXNlcjpwYXNz'); // 'user:pass' (valid Base64)
BuiltInExtractors.b64('invalid'); // '' (not a valid Base64 string)
BuiltInExtractors.b64(123 as unknown as any); // '' (not a string)
```

##### `.token()` Method

Extracts and returns the Authorization header token value. Automatically detects the token data scheme among built-in schemes [`ETokenSchemes`](#etokenschemes-enum).

Signature: `public static token(maybeToken: string): string | string[]`

**Usage**

```typescript
import BuiltInExtractors from 'http-convenience-pack';

/**
 * The Basic scheme extracts the `[login, password]` type tuple.
 */
BuiltInExtractors.token('Basic dXNlcm5hbWU6cGFzc3dvcmQ='); // ['username', 'password']

/**
 * Bearer scheme extracts the token value removing `Bearer ` prefix.
 */
BuiltInExtractors.token('Bearer abc123'); // 'abc123'

/**
 * APIKey scheme: same as Bearer scheme
 */
BuiltInExtractors.token('APIKey xyz456'); // 'xyz456'

/**
 * Unknown scheme return the Authorization header value as is.
 */
BuiltInExtractors.token('unknown scheme'); // 'unknown scheme'
```

### Header Value Extractors

There are multiple types os header values content that may be useful to extract and parse / transform. Several extractors are implemented in the Headers module. Others implementations are pending your requests with use cases description & value justification.

The implemented extractors:

- Value: return the header value, a default extractor used for unknown value types;
- Array: optionally with custom separator; Used in headers like `Accept`, `Accept-Encoding` etc.;
- Date object: for `Date`, `Expires`, or `Last-Modified` etc.;
- Base64 string: extract the Base64 string and decode it to an UTF-8 string;`
- Authorization header token: auto-detect the built-in known token scheme (Basic, Bearer, APIKey) and extract the value.
  All the extractors here remove the scheme part and either return transformed or "as is" value of the token. E.g. the `Basic` scheme extractor decodes the Base64 value to UTF-8 then parses it to a tuple of `[login, password]` type.

What potentially could be implemented:

- `Cache-Control` can have values like `"no-cache"`, `"no-store"`, or `"must-revalidate"`. Probably useful to be extracted as a built-in enum;
- `Content-Type` with content like `application/json; charset=UTF-8` could be extracted to `MIME_TYPES_BUILTIN['application/json'].type`. What to do with `charset=UTF-8` is still TBD;
- Authorization header tokens (can reconsider implementation myself or accept pull requests):
  - Digest scheme: was left out for rare usage nowadays;
  - OAuth1 scheme: left out due to being inferior to OAuth2;

---
