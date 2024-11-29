/

---

<div align="center">
  <img src="./.docs/images/banner-4.jpg" width="100%"/>
</div>

<div align="center">
  <img src="./.docs/images/banner.jpg" width="100%"/>
</div>

Type-safe, RFC-compliant, auto-completable HTTP constants and convenience functions to ensure uniform values across the stack.

> Reflect actual list of the pack's modules (methods, statuses, MIME Types, headers) in the sub-line.
> Make the banner as narrow as the initial version.

Use TypeScript type inference and IDE autocomplete functionality for the outstanding comfort and type safety in HTTP constants manipulations.

**Summary**

The small TypeScript HTTP convenience package to expose uniform standardized RFC-compliant type-safe auto-completable HTTP constants to apply across your applications' ends and services. Manipulation functionality (validate, normalize etc.) is provided as well.

The new use cases / functionality suggestions are welcome either in Discussions or as pull requests.

**Package Status**

![npm version](https://img.shields.io/npm/v/your-package-name.svg)
![Build Status](https://img.shields.io/github/workflow/status/your-username/your-repo/CI)
![Coverage](https://img.shields.io/codecov/c/github/your-username/your-repo)
![Coverage](https://img.shields.io/coveralls/your-username/your-repo.svg)
![npm downloads](https://img.shields.io/npm/dm/your-package-name.svg)
![License](https://img.shields.io/npm/l/your-package-name.svg)
![Snyk Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/your-username/your-repo.svg)
![Maintainability](https://img.shields.io/codeclimate/maintainability/your-username/your-repo.svg)
![Last Commit](https://img.shields.io/github/last-commit/your-username/your-repo.svg)

# HTTP Convenience Pack

The pack purpose is to provide uniform standardized RFC-compliant HTTP notions' values for applications across the consumer's entire TypeScript application stack.

It adds type safety and convenience of auto-complete. It as well allows to avoid string constants ambiguity, ensures you always get the same correct and uniform HTTP header name (or a MIME type, or a status code / message) sent from your one end (e.g. front) to the other (e.g. back) and / or across you services.

Where applicable for convenience use cases it has functionality (validation, normalization, etc.) that can be expanded on your proposal if new use cases are discovered.

- [Overview](#overview)
  - [Documentation](#documentation)
  - [Quick Start](#quick-start)
    - [Installation](#installation)
    - [Autocomplete Demo](#autocomplete-demo)
    - [Usage](#usage)
- [HTTP Methods](#http-methods)
- [HTTP Statuses](#http-statuses)
- [HTTP MIME Types Module](#http-mime-types-module)
  - [At a Glance](#at-a-glance)
  - [The MIME Type Object](#the-mime-type-object)
  - [Extend Built-In MIME Types](#extend-built-in-mime-types)
  - [API Reference](#api-reference)
    - [`MIME_TYPES_BUILTIN` Constant](#mime_types_builtin-constant)
    - [`GROUPED_MIME_TYPES_BUILTIN` Constant](#grouped_mime_types_builtin-constant)
    - [`MIME_TYPES_POPULAR` Constant](#mime_types_popular-constant)
    - [`EMIMEGroups` Enum](#emimegroups-enum)
- [HTTP Headers](#http-headers)
  - [Use Cases](#use-cases)
- [Contribution Guideline](#contribution-guideline)

## Overview

### Documentation

The package is carefully documented for comfortable developer experience. From the good-named identifiers in code, thought-out autocompletion with animated GIF [demo](#autocomplete-demo), hover-popup doc blocks with usage examples on enums, constants classes and methods to the detailed readme with use cases and the modules' API references.

There is a [Discussion](https://github.com/WhereJuly/62-http-convenience-pack/discussions) for specific subjects and question.

### Quick Start

#### Installation

```bash
npm install http-convenience-pack
```

#### Autocomplete Demo

> Here make and insert the GIF with all autocomplete demonstrations.
> Hide the demo under details tag not to annoy

#### Usage

**Conventions**

In the code you see I apply the following conventions with great comfort: start interface names with `I`, enums with `E`, type aliases with `T`, generics with `G`. Abbreviations are always in caps (satisfactory comfort). Hope you appreciate.

> NB: Create all examples in the actual typescript file to check correctness and put here.

Ensure the uniform methods values are used across your application.

**Send a request**

```typescript
import { EHTTPMethods, EHTTPHeaders, EHTTPMIMETypes } from 'http-convenience-pack';

const response = await fetch('https://api.example.com/data', {
 method: EHTTPMethods.GET,
 headers: {
  EHTTPHeaders.AUTHORIZATION: 'Bearer <required-token-here>',
  EHTTPHeaders.CONTENT_TYPE: EHTTPMIMETypes.APPLICATION_JSON
 }
});
```

**On request receive** (e.g. in route or endpoint middleware) check a method is valid or allowed, normalize the method if the request came from unknown source.

```typescript
import { EHTTPMethods, HTTPMethodsConvenience as Methods } from 'http-convenience-pack';

const allowed = [EHTTPMethods.GET, EHTTPMethods.PATCH];
// Assume the request came for your service above.

Methods.isValid(request.method); // true
Methods.isAllowed(request.method, allowed); // true

// Assume the request came for some unknown service with method `options` (as lower case).

// Normalize (to upper case) and test against `EHTTPMethods` enum.
Methods.isValid(Methods.normalize(request.method)); // true
// Same as preceding but normalize is built-in (as well as exception throw for non-strings or invalid methods, see API description)
Methods.isAllowed(request.method); // true
// Normalize and test against `allowed` methods.
Methods.isAllowed(request.method, allowed); // false

// This will iterate over keys in `request.headers` object,  normalize each one,
// find the desired header and by default extract the token with `Bearer token` value scheme.
const token = HTTPHeaders.extract(request.headers, HTTPHeaders.AUTHORIZATION)

// It can extract different standard Authentication schemes and your custom ones.
// If no scheme provided it detects the decode scheme based on the header
// actual value prefix (extracting it and trying against Bearer, Basic, Digest ones) or throws.
// If scheme is provided explicitly it tries to decode extract and return the respective value
// or throws if the scheme does not match. If scheme matches but no value is provided it returns null.
const token = HTTPHeaders.extract(request.headers, HTTPHeaders.AUTHORIZATION,
  EHTTPAuthenticationScheme.{Bearer, Basic, Digest, Custom}, () => { // required for EHTTPAuthenticationScheme.Custom })
// Pass the token further down the middleware chain to use.
```

**Conveniently respond** in an endpoint handler (e.g. in Express)

```typescript
import { EHTTPHeaders, EHTTPMIMETypes, THTTPStatuses } from 'http-convenience-pack';

const handler = (req: Request, res: Response): void => {
  const body = JSON.stringify({ message: 'Hello, world!' });

  res.set({
      EHTTPHeaders.CONTENT_LENGTH: Buffer.byteLength(body).toString(),
      EHTTPHeaders.CONTENT_TYPE: EHTTPMIMETypes.APPLICATION_JSON
    })
    .status(THTTPStatuses[200].code)
    // Here for brevity. May use it in custom error handler. Here Express would set the default message ('OK').
    .statusMessage(THTTPStatuses[200].message)
    .send(bodyString);
};
```
## HTTP Methods

- [documentation](.docs/methods.md)

## HTTP Statuses

- Ensure you use the latest valid status codes and messages from [RFC 9110 Status Codes](https://www.rfc-editor.org/rfc/rfc9110.html#section-15) across your application;
- Comfortably autocomplete desired status values from a typed constant like this `console.log(THTTPStatuses[200]) // { code: 200, message: 'Success' }`.
- Check the given status belongs to statuses groups ("1xx: Info", "2xx: Success" etc.)
- Check the given status is allowed for your specific use cases ("is in the list");

> Use case for isAmong for my frontend where I decide what to do depending on codes.
> Use cases for exported types: create your own types enum groups, make custom groups of Status objects
> (like subsets of standard codes with custom messages) to retrieve custom message by code,
> detect if code is valid, in group, of group with custom groups.

---

Refactor (TBC):

- no need in instance, extend as i did with Mime Types;
- add group to TStatuses, keep GROUPED_STATUS_CODES as convenient representation;
- refactor the ofGroup, inGroup with this regard;
- rename isAllowed to inList, see Mime Types `inList`;

---

TBW: API & use cases.

## HTTP MIME Types Module

- [documentation](.docs/mime-types.md)

Development: see [use cases](.docs/a&cd/mime/use-cases.md)

WRITE: The MIME Types values list, RFC 9110, uniform across your application.

---

### At a Glance

There are two predefined sets of MIME Types coming with the pack ([`MIME_TYPES_BUILTIN`](#mime_types_builtin-constant) and [`MIME_TYPES_POPULAR`](#mime_types_popular-constant)). You can add your own [custom MIME Types](#extend-built-in-mime-types) following the link. There are as well [list and describe here all the enums with links to the API Reference section]

MIME Types objects, built-in and "popular" extension supplied with the Pack.

```typescript
console.log(MIME_TYPES_BUILTIN); // All the built-in MIME Types objects

// Single MIME Type object
console.log(MIME_TYPES_BUILTIN['image/png']); // { type: 'image/png', extension: '.png', group: 'IMAGE' };
console.log(MIME_TYPES_BUILTIN['image/png'].extension); // '.png' };
console.log(EBuiltInMIMETypes); // All built-in MIME Types string constants
console.log(EBuiltInMIMETypes.AUDIO_MPEG); // 'audio/mpeg'
```

The above built-in MIME Types grouped by [`EMIMEGroups`](#emimegroups-enum)

```typescript
// Code
console.log(GROUPED_MIME_TYPES_BUILTIN);
// Output extract, shortened for brevity
{
  TEXT: [
    { type: 'text/plain', extension: '.txt', group: 'TEXT' },
    { type: 'text/html', extension: '.html', group: 'TEXT' }, /* more here */
  ],
  IMAGE: [
    { type: 'image/png', extension: '.png', group: 'IMAGE' }, /* more here */
  ]
}
```

The extension [`MIME_TYPES_POPULAR`](#mime_types_popular-constant).

```typescript
console.log(MIME_TYPES_POPULAR); // All the popular MIME Types objects
console.log(MIME_TYPES_POPULAR['application/java-archive']); // { type: 'application/gzip', extension: '.gz', group: 'APPLICATION' }
console.log(MIME_TYPES_POPULAR['application/gzip'].group); // 'APPLICATION'
console.log(EPopularMIMETypes); // All "popular" MIME Types string constants
```

### The MIME Type Object

The module provides the MIME Types as predefined typed constant - readonly objects that under the hood look like this (the part of actual `console.log(MIME_TYPES_BUILTIN)` output):

```typescript
{
  'application/json': { type: 'application/json', extension: 'json', group: 'APPLICATION' },
  'text/plain': { type: 'text/plain', extension: 'txt', group: 'TEXT' },
}
```

Here is the member of the `MIME_TYPES_BUILTIN`

```typescript
console.log(MIME_TYPES_BUILTIN['image/png']); // { type: 'image/png', extension: 'png', group: 'IMAGE' };
```

### Extend Built-In MIME Types

There is a set of predefined "popular" `MIME_TYPES_POPULAR` MIME Types you can extend the built-in ones with couples of line.

```typescript
import { MIME_TYPES_POPULAR } from 'http-convenience-pack';

HTTPMIMETypesConvenience.extend(MIME_TYPES_POPULAR);
```

Do this before first use of `HTTPMIMETypesConvenience` class. `HTTPMIMETypesConvenience.types` getter now provides `MIME_TYPES_BUILTIN` and `MIME_TYPES_POPULAR` types everywhere in the application.

> Describe: how to create the typed constant.

### API Reference

> Add the docblocks to enums and constants.

> Describe all available enums including grouped with autocomplete. Insert module-relevant autocomplete demo GIF here. Explain all the class functionality.

#### `MIME_TYPES_BUILTIN` Constant

The typed readonly constant [MIME type objects](#the-mime-type-object) with autocomplete. Contains 14 most used MIME Types ([source code](src/core/mime/types/builtin.mime.ts)) each with group and file extension.

> GIF with autocomplete demo for all the enums and nested properties.

**Usage**

```typescript
console.log(MIME_TYPES_BUILTIN); // The entire constant
console.log(MIME_TYPES_BUILTIN['image/png']); // { type: 'image/png', extension: 'png', group: 'IMAGE' };
```

#### `GROUPED_MIME_TYPES_BUILTIN` Constant

The `MIME_TYPES_BUILTIN` content grouped by `EMIMEGroups` enum.

#### `MIME_TYPES_POPULAR` Constant

Similar to `MIME_TYPES_BUILTIN`, contains 32 "popular" MIME Types ([source code](src/core/mime/types/popular.mime.ts)).

#### `EMIMEGroups` Enum

Defines ([source code](src/core/mime/types/common.mime.ts)) all the 11 MIME Types groups according to the [IANA Media Types](https://www.iana.org/assignments/media-types/media-types.xhtml) document (updated 2024-11-26).

## HTTP Headers

See [readme](src/headers/implement.md)

### Use Cases

> UPD: Will see if I need this section here or in Overview just list the use cases in natural language (like what I made in Quick Start).
> Write the basic usage docs. Describe different use cases in a separate section. Describe formal API.
> Do this first from imagined use cases. Refine it as you use it yourself.

## Contribution Guideline

New code (additional enum members, constants, functionality): accompany the new code with the use case code example and description.
