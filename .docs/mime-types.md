<div align="center">
  <img src="./images/banner-4.jpg" width="100%"/>
</div>

## HTTP MIME Types Module

> Development: see [use cases](.docs/a&cd/mime/use-cases.md)
> WRITE: The MIME Types values list, RFC 9110, uniform across your application.

- [HTTP MIME Types Module](#http-mime-types-module)
  - [Autocomplete Demo](#autocomplete-demo)
  - [At a Glance](#at-a-glance)
  - [API Reference](#api-reference)
    - [`MIME_TYPES_BUILTIN` Constant](#mime_types_builtin-constant)
    - [`MIME_TYPES_GROUPS_BUILTIN` Constant](#mime_types_groups_builtin-constant)
    - [`MIME_TYPES_EXTENSIONS_BUILTIN` Constant](#mime_types_extensions_builtin-constant)
  - [Add Extended MIME Types](#add-extended-mime-types)

---

Development: see [use cases](/.docs/a&cd/mime/use-cases.md)

WRITE: The MIME Types values list, RFC 9110, uniform across your application.

> Add autocompletion GIF demo

---

### Autocomplete Demo

> GIF with autocomplete demo for all the enums and nested properties.

### At a Glance

The module contains one built-in ([source](/src/core/mime/source/builtin.mime.ts)) **MIME Types Registry** with 46 most often used MIME Types. It also allow to create an [extended](#add-extended-mime-types) Registry with your custom MIME Types and use both as one.

Each record in the Registry contains a MIME Type Object. Here is the example of couple records.

```typescript
{
  'application/json': { type: 'application/json', extension: 'json', group: 'APPLICATION' },
  'text/plain': { type: 'text/plain', extension: 'txt', group: 'TEXT' },
}
```

Use the built-in Registry via the following public [APIs](#api-reference): `MIME_TYPES_BUILTIN` constant, the Registry Types groups and extensions via `MIME_TYPES_GROUPS_BUILTIN` and `MIME_TYPES_EXTENSIONS_BUILTIN` constants respectively. All the constant provide type safety and autocompletion (TBW links on VS Code TypeScript autocompletion setup).

```typescript
// The entire built-in registry.
console.log(MIME_TYPES_BUILTIN);

// Single MIME Type object
console.log(MIME_TYPES_BUILTIN['image/png']); // { type: 'image/png', extension: '.png', group: 'IMAGE' };
console.log(MIME_TYPES_BUILTIN['image/png'].extension); // '.png' };
console.log(MIME_TYPES_GROUPS_BUILTIN.APPLICATION); // 'APPLICATION' };
console.log(MIME_TYPES_EXTENSIONS_BUILTIN['.bmp']); // '.bmp' };
```

The other public [API](#api-reference) outlet is `HTTPMIMETypesConvenience` static class. It provides convenience methods that allow adding extended MIME Types Registry, access either built-in or both registries as one (when "extended"). It provides MIME Types validation, check against a list, a group, get group, pick types by attribute (ask to submit use cases to extend the functionality).

Here is the quick overview of the class API (see the [API reference](#api-reference) for details).

Get the combined built-in and extended (if extended) Registry

```typescript
console.log(HTTPMIMETypesConvenience.types);
```

Various convenience manipulations.

```typescript
/**
 * Validate type (by default) or extension against the Types in the Registry
 */
HTTPMIMETypesConvenience.isValid('invalid-type'); // `false` for obviously invalid type

/**
 * Check type name is among Registry Types or an optional list
 */
HTTPMIMETypesConvenience.isAmong('application/gzip');

/**
 * Check the type in group
 */
HTTPMIMETypesConvenience.inGroup('application/gzip', MIME_TYPES_GROUPS_BUILTIN.APPLICATION); // 'true'

/**
 * Get the group for the given type
 */
HTTPMIMETypesConvenience.ofGroup('application/gzip'); // MIME_TYPES_GROUPS_BUILTIN.APPLICATION string value

// Pick types by attribute. Awaits use cases confirmation.
HTTPMIMETypesConvenience.pickBy();
```

Add the extended Registry (should be created in advance)

```typescript
HTTPMIMETypesConvenience.extend(MIME_TYPES_EXTENDED); // Extend;
HTTPMIMETypesConvenience.isExtended; // true; After having extended;
HTTPMIMETypesConvenience.reset(); // Reset to initial built-in Registry
```

### API Reference

> Describe all available enums including grouped with autocomplete. Insert module-relevant autocomplete demo GIF here. Explain all the class functionality.

#### `MIME_TYPES_BUILTIN` Constant

The typed readonly constant [MIME type objects](#the-mime-type-object) with autocomplete. Contains 14 most used MIME Types ([source code](src/core/mime/types/builtin.mime.ts)) each with group and file extension.


**Usage**

```typescript
console.log(MIME_TYPES_BUILTIN); // The entire constant
console.log(MIME_TYPES_BUILTIN['image/png']); // { type: 'image/png', extension: 'png', group: 'IMAGE' };
```

#### `MIME_TYPES_GROUPS_BUILTIN` Constant

The MIME Types groups.

Defines all the 11 MIME Types groups according to the [IANA Media Types](https://www.iana.org/assignments/media-types/media-types.xhtml) document (updated 2024-11-26).

**Usage**

```typescript
console.log(MIME_TYPES_GROUPS_BUILTIN); // { APPLICATION = "APPLICATION", AUDIO = "AUDIO" ... }
console.log(MIME_TYPES_GROUPS_BUILTIN.AUDIO); // 'AUDIO'
```

Duplicated with spare `EMIMEGroups` (see [source code](/src/core/mime/source/source.enums.ts)) enum so far not exported from the package.

#### `MIME_TYPES_EXTENSIONS_BUILTIN` Constant

The MIME Types extensions.

### Add Extended MIME Types

1. Prepare the source array of triples like this:

```typescript
const ExtendedMIMETypesSource = [
 ['custom/json', 'CUSTOM', '.json'],
 ['custom/plain', 'CUSTOM', '.txt']
] as const;
```

Note the triple structure is `[mime-type-name, 'GROUP', '.extension']`.

2. Then call the Registry and other factories providing them with `ExtendedMIMETypesSource`.

```typescript
import { MIMEExtensionsFactory, MIMEGroupsFactory, MIMETypesGenericRegistryFactory } from 'http-convenience-pack';

export const MIME_TYPES_EXTENDED = MIMETypesGenericRegistryFactory<typeof ExtendedMIMETypesSource>(ExtendedMIMETypesSource);
export const MIME_TYPES_GROUPS_EXTENDED = MIMEGroupsFactory(ExtendedMIMETypesSource);
export const MIME_TYPES_EXTENSIONS_EXTENDED = MIMEExtensionsFactory(ExtendedMIMETypesSource);
```

> As an entire example of built-in Registry source of MIME Types creation see its [array of triples](/src/core/mime/source/builtin.mime.ts) and the creation of Registry `MIME_TYPES_BUILTIN`, groups `MIME_TYPES_GROUPS_BUILTIN` and extensions `MIME_TYPES_EXTENSIONS_BUILTIN` constants [source code](/src/core/mime/builtin.constants.ts)

3. Call `HTTPMIMETypesConvenience.extend(MIME_TYPES_EXTENDED)`

This is it. After that call `HTTPMIMETypesConvenience` will hold and operate on both the built-in and extended Registries as one. Call `HTTPMIMETypesConvenience.reset()` to restore to only built-in Registry.
