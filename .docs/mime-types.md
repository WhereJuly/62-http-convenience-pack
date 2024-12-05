<div align="center">
  <img src="./images/banner-6-w1200.jpg" width="100%"/>
</div>

## HTTP MIME Types Module

- [HTTP MIME Types Module](#http-mime-types-module)
  - [Autocomplete Demo](#autocomplete-demo)
  - [At a Glance](#at-a-glance)
  - [API Reference](#api-reference)
    - [Constants](#constants)
      - [`MIME_TYPES_BUILTIN` Constant](#mime_types_builtin-constant)
      - [`MIME_TYPES_GROUPS_BUILTIN` Constant](#mime_types_groups_builtin-constant)
      - [`MIME_TYPES_EXTENSIONS_BUILTIN` Constant](#mime_types_extensions_builtin-constant)
    - [`HTTPMIMETypesConvenience` Class](#httpmimetypesconvenience-class)
      - [`.types` Getter](#types-getter)
      - [`.isValid()` Method](#isvalid-method)
      - [`.isAmong()` Method](#isamong-method)
      - [`.inGroup()` Method](#ingroup-method)
      - [`.ofGroup()` Method](#ofgroup-method)
      - [`.extend()` Method](#extend-method)
      - [`.isExtended` Getter](#isextended-getter)
      - [`.reset()` Method](#reset-method)
  - [Add Extended MIME Types](#add-extended-mime-types)

---

### Autocomplete Demo

> GIF with autocomplete demo for all the enums and nested properties.

### At a Glance

The module contains one built-in ([source](/src/core/mime/source/builtin.mime.ts)) **MIME Types Registry** with 46 most often used MIME Types. It also allows to create an [extended](#add-extended-mime-types) Registry with your custom MIME Types and use both as one.

Each record in the Registry contains a MIME Type Object. Here is the example of couple records.

```typescript
{
  'application/json': { type: 'application/json', extension: 'json', group: 'APPLICATION' },
  'text/plain': { type: 'text/plain', extension: 'txt', group: 'TEXT' },
}
```

Use the built-in Registry via the following public [APIs](#api-reference): `MIME_TYPES_BUILTIN` constant, the Registry Types groups and extensions via `MIME_TYPES_GROUPS_BUILTIN` and `MIME_TYPES_EXTENSIONS_BUILTIN` constants respectively. All the constant provide type safety and autocompletion (e.g. VS Code [setup](https://code.visualstudio.com/Docs/languages/typescript)).

```typescript
// The entire built-in registry.
console.log(MIME_TYPES_BUILTIN);

// Single MIME Type object
console.log(MIME_TYPES_BUILTIN['image/png']); // { type: 'image/png', extension: '.png', group: 'IMAGE' };
console.log(MIME_TYPES_BUILTIN['image/png'].extension); // '.png' };
console.log(MIME_TYPES_GROUPS_BUILTIN.APPLICATION); // 'APPLICATION' };
console.log(MIME_TYPES_EXTENSIONS_BUILTIN['.bmp']); // '.bmp' };
```

The other public [API](#httpmimetypesconvenience-class) outlet is `HTTPMIMETypesConvenience` static class. It provides convenience methods that allow adding extended MIME Types Registry, access either built-in or both registries as one (when "extended"). It provides MIME Types validation, check against a list, a group, get group.

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
HTTPMIMETypesConvenience.isValid('invalid-type'); // false; for obviously invalid type

/**
 * Check type name is among Registry Types or an optional list
 */
HTTPMIMETypesConvenience.isAmong('application/gzip');

/**
 * Check the type in group
 */
HTTPMIMETypesConvenience.inGroup('application/gzip', MIME_TYPES_GROUPS_BUILTIN.APPLICATION); // true

/**
 * Get the group for the given type
 */
HTTPMIMETypesConvenience.ofGroup('application/gzip'); // MIME_TYPES_GROUPS_BUILTIN.APPLICATION string value
```

Add the extended Registry (should be created in advance)

```typescript
HTTPMIMETypesConvenience.extend(MIME_TYPES_EXTENDED); // Extend;
HTTPMIMETypesConvenience.isExtended; // true; After having extended;
HTTPMIMETypesConvenience.reset(); // Reset to initial built-in Registry
```

### API Reference

#### Constants

##### `MIME_TYPES_BUILTIN` Constant

The typed readonly constant [MIME type objects](#at-a-glance) with autocomplete. Contains 46 most used MIME Types (see in [source code](/src/core/mime/source/builtin.mime.ts)) each with group and file extension.

**Usage**

```typescript
console.log(MIME_TYPES_BUILTIN); // See example in "At a Glance" section.
console.log(MIME_TYPES_BUILTIN['image/png']); // { type: 'image/png', extension: 'png', group: 'IMAGE' };
```

##### `MIME_TYPES_GROUPS_BUILTIN` Constant

The MIME Types groups.

Defines all the 11 MIME Types groups according to the [IANA Media Types](https://www.iana.org/assignments/media-types/media-types.xhtml) document (updated 2024-11-26).

**Usage**

```typescript
console.log(MIME_TYPES_GROUPS_BUILTIN); // { APPLICATION = "APPLICATION", AUDIO = "AUDIO" ... }
console.log(MIME_TYPES_GROUPS_BUILTIN.AUDIO); // 'AUDIO'
```

Duplicated with spare `EMIMEGroups` (see [source code](/src/core/mime/source/source.enums.ts)) enum so far not exported from the package.

##### `MIME_TYPES_EXTENSIONS_BUILTIN` Constant

The MIME Types extensions.

Contains all the extensions from [MIME_TYPES_BUILTIN](#mime_types_builtin-constant).

**Usage**

```typescript
console.log(MIME_TYPES_EXTENSIONS_BUILTIN); // { '.txt': '.txt', '.html': '.html', ... }
console.log(MIME_TYPES_EXTENSIONS_BUILTIN['.3gp']); // '.3gp'
```

#### `HTTPMIMETypesConvenience` Class

The static class that provides the HTTP MIME Types Registry and the convenience methods for MIME types manipulations.

##### `.types` Getter

Provides the single point access to the HTTP MIME Types Registry. The Registry either contains built-in MIME Types Registry ([`MIME_TYPES_BUILTIN`](#mime_types_builtin-constant) constant) or built-in and extended Types (if [`.extend()`](#extend-method) was applied).

Signature: `public static get types(): TMIMETypesRegistryGeneric`

**Usage**

```typescript
import HTTPMIMETypesConvenience from 'http-convenience-pack';

const types = HTTPMIMETypesConvenience.types;
```

##### `.isValid()` Method

The method validates the provided MIME Type attribute value against the values from [`HTTPMIMETypesConvenience.type`](#types-getter) getter.

Signature: `public static isValid(value: string, attribute?: EIsValidAttributes): boolean`

```typescript
import HTTPMIMETypesConvenience from 'http-convenience-pack';

/**
 * Validate the built-in MIME Type name
 */
HTTPMIMETypesConvenience.isValid('application/json'); // true
HTTPMIMETypesConvenience.isValid('application/json', EIsValidAttributes.TYPE); // true; Equivalent to preceding;

/**
 * Not a built-in neither extend MIME Type.
 */
HTTPMIMETypesConvenience.isValid('bacnet-xdd+zip'); // false

/**
 * Validate the built-in MIME Type extension.
 */
HTTPMIMETypesConvenience.isValid('.json', EIsValidAttributes.EXTENSION); // true
HTTPMIMETypesConvenience.isValid('json', EIsValidAttributes.EXTENSION); // true
```

##### `.isAmong()` Method

Checks if a given MIME Type name is among an optional custom list of type names. By default check if a type name is among the Registry types (`typeNames` omitted, similar to [`.isValid()`](#isvalid-method)).

Signature: `public static isAmong(typeNameToFind: string, typeNames?: string[]): boolean`

**Usage**

May use to check against the specific MIME Types lists. For checking against a MIME Types group use [`.inGroup()`](#ingroup-method).

```typescript
import HTTPMIMETypesConvenience from 'http-convenience-pack';

HTTPMIMETypesConvenience.isAmong('application/json'); // true
HTTPMIMETypesConvenience.isAmong('text/html', ['application/xml', 'text/html']); // true
```

##### `.inGroup()` Method

Determines if a given MIME type exists in the registry and belongs to a provided group.

Signature: `public static inGroup(typeName: string, group: string): boolean`

**Usage**

```typescript
import HTTPMIMETypesConvenience from 'http-convenience-pack';

HTTPMIMETypesConvenience.inGroup('application/json', MIME_TYPES_GROUPS_BUILTIN.APPLICATION); // true
HTTPMIMETypesConvenience.inGroup('application/json', MIME_TYPES_GROUPS_BUILTIN.AUDIO); // false
```

##### `.ofGroup()` Method

Retrieves the group for a given MIME type from the Registry.

Signature: `public static ofGroup(typeName: string): string | null`

**Usage**

```typescript
import HTTPMIMETypesConvenience from 'http-convenience-pack';

HTTPMIMETypesConvenience.ofGroup('application/json'); // 'APPLICATION'
HTTPMIMETypesConvenience.ofGroup('bacnet-xdd+zip'); // null
```

##### `.extend()` Method

Extends the MIME Types Registry with custom MIME types.

Signature: `public static extend<T extends readonly TSource[]>(types: TMIMETypesRegistryGeneric<T>): void`

**Usage**

See the [complete extension example](#add-extended-mime-types).

##### `.isExtended` Getter

Indicates whether the MIME Types Registry has been extended with custom types.

Signature: `public static get isExtended(): boolean`

##### `.reset()` Method

Resets the MIME Types Registry to its built-in state.

Signature: `public static reset(): void`

### Add Extended MIME Types

Here is the full example.

1. Prepare the source array of triples like this:

```typescript
/**
 * Note the 'triple tuple' structure is used to provide the MIME Types values.
 * Here is the example `[mime-type-name, 'GROUP', '.extension']`.
 */
const ExtendedMIMETypesSource = [
 ['custom/json', 'CUSTOM', '.json'],
 ['custom/plain', 'CUSTOM', '.txt']
] as const;
```

2. Then call the Registry and other factories providing them with `ExtendedMIMETypesSource`.

```typescript
import { MIMEExtensionsFactory, MIMEGroupsFactory, MIMETypesGenericRegistryFactory } from 'http-convenience-pack';

export const MIME_TYPES_EXTENDED = MIMETypesGenericRegistryFactory<typeof ExtendedMIMETypesSource>(ExtendedMIMETypesSource);
```

> As an entire example of built-in Registry source of MIME Types creation see its [array of triples](/src/core/mime/source/builtin.mime.ts) and the creation of Registry `MIME_TYPES_BUILTIN` in [source code](/src/core/mime/builtin.constants.ts)

1. Call `HTTPMIMETypesConvenience.extend(MIME_TYPES_EXTENDED)`

This is it.

After that call `HTTPMIMETypesConvenience` will hold and operate on both the built-in and extended Registries as one.

Call `HTTPMIMETypesConvenience.reset()` to restore to only built-in Registry.

Note the _extended_ files' extensions will be available at the Registry but not auto-completable via `.types` getter. Use your respective `MIME_TYPES_EXTENDED` constant as point of autocomplete.

> Alternatively if you feel your extension use case looks widespread, feel free to request me to put te entire new MIME Type into built-ins via GitHub Issues or Discussions, or make a pull request. In either case provide the use case description and your reasoning on the changes value.

---
