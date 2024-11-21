<div align="center">
  <img src="./.docs/banner.jpg" width="100%"/>
</div>

# HTTP Convenience Pack

- [Overview](#overview)
  - [HTTP Methods](#http-methods)
  - [HTTP Statuses](#http-statuses)
  - [MIME Types](#mime-types)
- [Usage](#usage)
  - [Basic](#basic)
  - [Add Custom methods](#add-custom-methods)

## Overview

The small TypeScript HTTP convenience package to validate, normalize and apply uniform HTTP methods, statuses and MIME types across your application HTTP requests and responses.

**Namely:**

### HTTP Methods

- Ensure the valid ([RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html#section-9)) uniform methods values are used across your application;
- Check if the given method(s) valid;
- Normalize given method(s) to uniform value (throwing and non-throwing)
- Check given methods are allowed for your specific use cases;

### HTTP Statuses

- Ensure you use the latest valid status codes and messages from [RFC 9110] across your application;(d:\dev\oth\60-dcoupld-oas\packages\adapters\generic\tsconfig.json);
- Comfortably take desired status values from a typed constant like this `THTTPStatuses[200] // {code: 200, message: 'Success'}`.
- Check the given status belongs to statuses groups ("1xx: Info", "2xx: Success" etc.)
- Check the given status is allowed for your specific use cases;

### MIME Types

WRITE:

The MIME types values list, RFC 9110, uniform across your application. Get the type (via `mime/lite` package).

## Usage

### Basic

Ensure the uniform methods values are used across your application.

```typescript
import { EHTTPmethods } from './src/methods/methods.ts';

// Browser or Node
const response = await fetch('https://api.example.com/data', {
 method: EHTTPmethods.GET
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
