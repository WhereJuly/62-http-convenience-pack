<hr>

<div align="center">
  <img src="./.docs/images/banner-6.jpg" width="100%"/>
</div>

Type-safe, RFC-compliant, auto-completable HTTP constants and convenience functions to ensure standardized uniform values conveniently manipulated across your applications and services.

Use TypeScript type inference and IDE autocomplete functionality for comfort and type safety in HTTP constants manipulations.

**Summary**

The small dependency-free TypeScript HTTP convenience package to expose uniform standardized RFC-compliant type-safe auto-completable HTTP constants to apply across your applications' ends and services. Manipulation functionality (validate, normalize, transform, is among, of group, in group etc.) is provided as well.

The new use cases / functionality suggestions are welcome either in [Discussions](https://github.com/WhereJuly/62-http-convenience-pack/discussions) or as [pull requests](#contribution).

**Package Status**

![Build Status](https://github.com/WhereJuly/62-http-convenience-pack/actions/workflows/deliver.yml/badge.svg)
[![codecov](https://codecov.io/gh/WhereJuly/62-http-convenience-pack/graph/badge.svg?token=N7W0Q11DRL)](https://codecov.io/gh/WhereJuly/62-http-convenience-pack)

<!-- WRITE: Will implement the badges at their time. -->
<!-- [![Dependencies](https://img.shields.io/librariesio/release/npm/package-name)](https://libraries.io/npm/package-name)
![npm version](https://img.shields.io/npm/v/http-convenience-pack.svg)
![npm downloads](https://img.shields.io/npm/dm/http-convenience-pack.svg)
![Snyk Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/your-username/your-repo.svg)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fusername%2Frepo.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fusername%2Frepo?ref=badge_shield)
![Last Commit](https://img.shields.io/github/last-commit/WhereJuly/62-http-convenience-pack.svg)
![License](https://img.shields.io/npm/l/http-convenience-pack.svg) -->

The package is in final state, no pending functionality. It is actively maintained. It moves to production-ready `>= v1.0.0` as the initial usage feedback confirms it has no major missing use cases.

# HTTP Convenience Pack

The pack purpose is to provide uniform standardized RFC-compliant HTTP constants' values for applications across the consumer's entire TypeScript application stack.

It adds the type safety and convenience of auto-complete. It allows to avoid string constants ambiguity, ensures you always get the same correct and uniform HTTP header name (or a MIME type, or a status code / message) sent from your one end (e.g. front) to the other (e.g. back) and / or across you services.

On top it has convenience manipulation functionality.

---

**Table of Contents**

- [Overview](#overview)
  - [Documentation](#documentation)
  - [Quick Start](#quick-start)
    - [Installation](#installation)
    - [Autocomplete Demo](#autocomplete-demo)
    - [Combined Usage Example](#combined-usage-example)
- [HTTP Methods](#http-methods)
- [HTTP Statuses](#http-statuses)
- [HTTP MIME Types Module](#http-mime-types-module)
- [HTTP Headers](#http-headers)
- [Maintenance](#maintenance)
  - [Changelog](#changelog)
  - [Contribution](#contribution)
  - [License](#license)

## Overview

### Documentation

The package is carefully documented for comfortable developer experience integrated with your IDE (e.g. see [VS Code](https://code.visualstudio.com/Docs/languages/typescript) TypeScript setup).

From the good-named identifiers in code, thought-out autocompletion (see animated GIF [demo](#autocomplete-demo)), hover-popup doc blocks with usage examples on enums, constants classes and methods to the detailed readme with use cases and the modules' API references.

There is a GitHub [Discussion](https://github.com/WhereJuly/62-http-convenience-pack/discussions) available for question, as the usual GitHub [Issues](https://github.com/WhereJuly/62-http-convenience-pack/issues) for bug reporting.

**Code Conventions**

To easy the readability and autocomplete I apply the following conventions: start interface names with `I`, enums with `E`, type aliases with `T`, generics with `G`. Abbreviations are always in caps (satisfactory comfort). The domain-respective public API contain `HTTP` prefix to namespace the package members, constants contain the module name like `Statuses`, `Methods`, `MIME` etc.

As the names may feel rather long you can apply the imports aliasing like this:

```typescript
import { EHTTPMethods as EMethods, HTTPMethodsConvenience as Methods } from 'http-convenience-pack';
```

Hope you appreciate.

### Quick Start

#### Installation

```bash
npm install http-convenience-pack
```

#### Autocomplete Demo

> Here make and insert the GIF with all autocomplete demonstrations.
> Hide the demo under details tag not to annoy

#### [Combined Usage Example](.docs/combined-usage-example.md)

## [HTTP Methods](.docs/methods.md)

## [HTTP Statuses](.docs/statuses.md)

## [HTTP MIME Types Module](.docs/mime-types.md)

## HTTP Headers

> See: [Combined Usage Example](./.docs/combined-usage-example.md)
> Development: [readme](./src/core/headers/implement.md)

## Maintenance

### Changelog

### Contribution

Development: so far will develop myself. If there is contribution, would manually approve and update in `integration` branch.

New code (additional enum members, constants, functionality): accompany the new code with the use case code example and description.

### License
