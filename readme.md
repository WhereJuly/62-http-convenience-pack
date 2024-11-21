<div align="center">
  <img src="./.docs/banner.jpg" width="100%"/>
</div>

The small TypeScript HTTP convenience package to validate, normalize and apply uniform HTTP methods, statuses and MIME types across your application HTTP requests and responses.

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

- [Overview](#overview)
  - [HTTP Methods](#http-methods)
  - [HTTP Statuses](#http-statuses)
  - [MIME Types](#mime-types)
- [Installation](#installation)
- [Usage](#usage)
  - [Basic](#basic)
  - [Add Custom methods](#add-custom-methods)

## Overview

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

### MIME Types

WRITE:

The MIME types values list, RFC 9110, uniform across your application. Get the type (via `mime/lite` package).

## Installation

To install this package:

```bash
npm install http-convenience-pack
```

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
