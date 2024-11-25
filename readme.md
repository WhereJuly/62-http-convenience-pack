<div align="center">
  <img src="./.docs/banner.jpg" width="100%"/>
</div>

The small TypeScript HTTP convenience package to expose uniform standardized RFC-compliant type-safe auto-completable HTTP constants to apply across your applications' ends and services. Manipulation functionality (validate, normalize etc.) is provided as well.

The new use cases / functionality suggestions are welcome either in Discussions or as pull requests.

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
  - [Quick Start](#quick-start)
  - [HTTP Methods](#http-methods)
  - [HTTP Statuses](#http-statuses)
  - [HTTP MIME Types](#http-mime-types)
  - [HTTP Headers](#http-headers)
- [Installation](#installation)
- [Usage](#usage)
  - [Basic](#basic)
  - [Add Custom methods](#add-custom-methods)

## Overview

### Quick Start

Install the package.

```bash
npm install http-convenience-pack
```

> NB: Create all examples in the actual typescript file to check correctness and put here.

Ensure the uniform methods values are used across your application.

Send a request:

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

On request receive (e.g. in route or endpoint middleware) check a method is valid or allowed, normalize the method if the request came from unknown source.

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
```

Conveniently respond in an endpoint handler (e.g. in Express)

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

### HTTP Methods

- Ensure the valid ([RFC 9110 Methods](https://www.rfc-editor.org/rfc/rfc9110.html#section-9)) uniform methods values are used across your application;
- Check if the given method(s) valid;
- Normalize given method(s) to uniform value (throwing and non-throwing)
- Check given methods are allowed for your specific use cases ("is in the list");

### HTTP Statuses

- Ensure you use the latest valid status codes and messages from [RFC 9110 Status Codes](https://www.rfc-editor.org/rfc/rfc9110.html#section-15) across your application;
- Comfortably autocomplete desired status values from a typed constant like this `console.log(THTTPStatuses[200]) // { code: 200, message: 'Success' }`.
- Check the given status belongs to statuses groups ("1xx: Info", "2xx: Success" etc.)
- Check the given status is allowed for your specific use cases ("is in the list");

### HTTP MIME Types

WRITE:

The MIME types values list, RFC 9110, uniform across your application. Get the type (via `mime/lite` package).

### HTTP Headers

See [readme](src/headers/implement.md)

## Installation

To install this package:

```bash
npm install http-convenience-pack
```

## Usage

> Write the basic usage docs. Describe different use cases in a separate section. Describe formal API.
> Do this first from imagined use cases. Refine it as you use it yourself.

### Basic

Ensure the uniform methods values are used across your application.

```typescript
import { EHTTPMethods } from './src/methods/methods.ts';

// Browser or Node
const response = await fetch('https://api.example.com/data', {
 method: EHTTPMethods.GET
});
```

Check a method or a list of methods is valid.

```typescript
import HTTPmethodsConvenience from './src/methods/methods.ts';

HTTPmethodsConvenience.isValid('some'); // false
HTTPmethodsConvenience.isValid(['some', 'other']); // false
HTTPmethodsConvenience.isValid('GET'); // true
HTTPmethodsConvenience.isValid(['GET', 'PUT']); // true
HTTPmethodsConvenience.isValid(['GET', 'PUT', 'some']); // false
```

### Add Custom methods
