<div align="center">
  <img src="./images/banner-6.jpg" width="100%"/>
</div>

## HTTP Statuses Module

- [HTTP Statuses Module](#http-statuses-module)
  - [Autocomplete Demo](#autocomplete-demo)
  - [At a Glance](#at-a-glance)
  - [API Reference](#api-reference)
    - [Enums and Constant](#enums-and-constant)
      - [`HTTP_STATUSES` Typed Constant](#http_statuses-typed-constant)
      - [`EHTTPStatusCodeGroups` Enum](#ehttpstatuscodegroups-enum)
      - [`GROUPED_STATUS_CODES` Typed Constant](#grouped_status_codes-typed-constant)
    - [`HTTPStatusesConvenience` Class](#httpstatusesconvenience-class)
      - [`.isValid()` Method](#isvalid-method)
      - [`.inGroup()` Method](#ingroup-method)
      - [`.ofGroup()` Method](#ofgroup-method)
      - [`.isAmong()` Method](#isamong-method)
      - [`.message()` Method](#message-method)
      - [`.normalize()` Method](#normalize-method)

---

### Autocomplete Demo

> GIF with autocomplete demo for all the enums and nested properties.

### At a Glance

The module contains the latest valid status codes and messages from [RFC 9110 Status Codes](https://www.rfc-editor.org/rfc/rfc9110.html#section-15). It allows a comfortable error-free autocomplete of the desired statuses or messages from a typed constant, validate, manipulate grouped codes, check status code is in group or among list.

The public [API](#api-reference) exposes a number of useful elements. Namely `HTTP_STATUSES` typed constant with status code objects containing all the codes from `1xx` to `5xx`, `EHTTPStatusCodeGroups` enum defining code groups like "INFO", "SUCCESS", "CLIENTERR" etc., `GROUPED_STATUS_CODES` that allows accessing grouped status codes, the convenience class `HTTPStatusesConvenience` providing `isValid`, `inGroup`, `ofGroup`, `isAmong`, `message`, `normalize` methods.

There is a number of good use cases for this functionality. See the [combined usage example](./combined-usage-example.md) and the [API Reference](#api-reference). It is pretty intuitive to recognize the use cases in your concrete context.

### API Reference

#### Enums and Constant

##### `HTTP_STATUSES` Typed Constant

The typed auto-completable constant containing the list HTTP status objects describing standard [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html#section-15) status codes from `1xx` to `5xx` .

The objects has the following shape:

```typescript
{
    100: { code: 100, message: 'Continue' },
    101: { code: 101, message: 'Switching Protocols' }
    /* remaining objects */
}
```

**Usage**

```typescript
import { HTTP_STATUSES } from 'http-convenience-pack';

console.log(HTTP_STATUSES); // { 100: { code: 100, message: 'Continue' } ... }

/**
 * Autocomplete codes and messages from list.
 */
console.log(HTTP_STATUSES[100].code); // 100
console.log(HTTP_STATUSES[100].message); // 'Continue'
```

##### `EHTTPStatusCodeGroups` Enum

Enum contains 5 groups of HTTP status codes according to the mentioned [RFC](https://www.rfc-editor.org/rfc/rfc9110.html#section-15), namely "INFO", "CLIENTERR", "SERVERERR", "SUCCESS", "REDIRECT".

**Usage**

```typescript
import { EHTTPStatusCodeGroups } from 'http-convenience-pack';

console.log(EHTTPStatusCodeGroups); // { INFO = 'info', CLIENTERR = 'clienterr', ... }

/**
 * Autocomplete groups from list.
 */
console.log(EHTTPStatusCodeGroups.INFO); // 'info'
```

##### `GROUPED_STATUS_CODES` Typed Constant

The list of allowed HTTP status codes grouped by HTTP status code group.

**Usage**

```typescript
import { GROUPED_STATUS_CODES } from 'http-convenience-pack';

console.log(GROUPED_STATUS_CODES); // { info: [ 100, 101, 102, 103 ], success: [ 200, 201, ... ] }

/**
 * Access the desired group status codes.
 */
console.log(GROUPED_STATUS_CODES[EHTTPStatusCodeGroups.CLIENTERR]); // [ 400, 401, 402, ... ]
```

#### `HTTPStatusesConvenience` Class

The static class that provides the convenience methods for HTTP codes manipulation.

##### `.isValid()` Method

Checks if the given status code is a valid HTTP status code against the [`HTTP_STATUSES`](#http_statuses-typed-constant) constant. Accepts string or number.

Signature: `public static isValid(given: number | string): boolean`

**Usage**

```typescript
import { HTTPStatusesConvenience } from 'http-convenience-pack';

console.log(HTTPStatusesConvenience.isValid(300)); // true
console.log(HTTPStatusesConvenience.isValid('300')); // true
console.log(HTTPStatusesConvenience.isValid('600')); // false
```

##### `.inGroup()` Method

Checks if a given status code belongs to a specified HTTP status code group. Accepts string or number.

Signature: `public static inGroup(given: number | string, group: EHTTPStatusCodeGroups): boolean`

**Usage**

```typescript
import { HTTPStatusesConvenience } from 'http-convenience-pack';

console.log(HTTPStatusesConvenience.inGroup(404, EHTTPStatusCodeGroups.CLIENTERR)); // true
console.log(HTTPStatusesConvenience.inGroup('404', EHTTPStatusCodeGroups.CLIENTERR)); // true
console.log(HTTPStatusesConvenience.inGroup('404', EHTTPStatusCodeGroups.SUCCESS)); // false
```

##### `.ofGroup()` Method

Retrieves the HTTP status code group for a given status code. Accepts string or number.

Signature: `public static ofGroup(given: number | string): EHTTPStatusCodeGroups | null`

**Usage**

```typescript
import { HTTPStatusesConvenience } from 'http-convenience-pack';

console.log(HTTPStatusesConvenience.ofGroup(200)); // 'success'; The value of enum EHTTPStatusCodeGroups.SUCCESS
console.log(HTTPStatusesConvenience.ofGroup('200') === EHTTPStatusCodeGroups.SUCCESS); // true
```

##### `.isAmong()` Method

Checks if a given status code is among a specified (custom) list of status codes. Accepts string or number for `given` parameter and `number[]` or a concrete `GROUPED_STATUS_CODES` group value for `list` parameter.

Signature: `public static isAmong(given: number | string, list: number[] | TGroupsList): boolean`

**Usage**

```typescript
import { HTTPStatusesConvenience } from 'http-convenience-pack';

/**
 * Use list as inlined array literal.
 */
console.log(HTTPStatusesConvenience.isAmong(200, [200, 201, 202])); // true

/**
 * Define the list in advance via autocompleted statuses.
 */
const specific = [HTTP_STATUSES[200].code, HTTP_STATUSES[204].code];
console.log(HTTPStatusesConvenience.isAmong(200, specific)); // true

/**
 * Check against the entire group.
 */
console.log(HTTPStatusesConvenience.isAmong(200, GROUPED_STATUS_CODES[EHTTPStatusCodeGroups.SUCCESS])); // true

/**
 * That would be same as the following.
 */
console.log(HTTPStatusesConvenience.ofGroup(200, EHTTPStatusCodeGroups.SUCCESS)); // true

```

##### `.message()` Method

Retrieves the message associated with a given HTTP status code.

Signature: `public static message(code: number): string | undefined`

**Usage**

```typescript
import { HTTPStatusesConvenience } from 'http-convenience-pack';

console.log(HTTPStatusesConvenience.message(200)); // "OK"
```

##### `.normalize()` Method

Normalizes the code input to a numeric value.

Signature: `public static normalize(input: number | string): number`

**Usage**

```typescript
import { HTTPStatusesConvenience } from 'http-convenience-pack';

console.log(HTTPStatusesConvenience.normalize('404')); // 404
console.log(HTTPStatusesConvenience.normalize(404)); // 404
```

---