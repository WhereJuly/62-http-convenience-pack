<div align="center">
  <img src="./images/banner-4.jpg" width="100%"/>
</div>

## HTTP Methods

- [HTTP Methods](#http-methods)
  - [At a Glance](#at-a-glance)
    - [Documentation](#documentation)
  - [A Basic Use Case](#a-basic-use-case)
  - [API Reference](#api-reference)
    - [`EHTTPMethods` Enum](#ehttpmethods-enum)
    - [`HTTPMethodsConvenience` Class](#httpmethodsconvenience-class)
      - [`HTTPMethodsConvenience.methods` Getter](#httpmethodsconveniencemethods-getter)
      - [`HTTPMethodsConvenience.isValid` Method](#httpmethodsconvenienceisvalid-method)
      - [`HTTPMethodsConvenience.isValid` Method](#httpmethodsconvenienceisvalid-method-1)
      - [`HTTPMethodsConvenience.normalize` Method](#httpmethodsconveniencenormalize-method)
      - [`HTTPMethodsConvenience.extend` Method](#httpmethodsconvenienceextend-method)
      - [`HTTPMethodsConvenience.reset` Method](#httpmethodsconveniencereset-method)
      - [`HTTPMethodsConvenience.isExtended` Getter](#httpmethodsconvenienceisextended-getter)
      - [`HTTPMethodsConvenience.values` Getter](#httpmethodsconveniencevalues-getter)
    - [`THTTPMethodsConstraint` Type](#thttpmethodsconstraint-type)
    - [`HTTPConveniencePackException` Exception](#httpconveniencepackexception-exception)
  - [Potentially Useful Functionality](#potentially-useful-functionality)

---

### At a Glance

The module contains all the standard HTTP methods according to [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110#methods) as built-ins. It allows to type-safely autocomplete, validate, check against the list, normalize, [extend](#httpmethodsconvenienceextend-method) with custom HTTP Methods and manipulate with built-in and extended HTTP Methods (if any) as one.

The module contains the following public [API](#api-reference): the enum `EHTTPMethods` and the class `HTTPMethodsConvenience`. The class allows the access to the HTTP Registry via `HTTPMethodsConvenience.methods`

#### Documentation

On top of the [readme](/readme.md) and the dedicated documentation (you are reading) the codebase is carefully documented with doc blocks. It contains usage examples accessible with hover-over or `Ctrl-Left-click` ('Goto Definition') [^1].

### A Basic Use Case

Ensure the uniform methods values are used across your application.

```typescript
import { EHTTPMethods } from 'http-convenience-pack';

// Browser or Node
const response = await fetch('https://api.example.com/data', { method: EHTTPMethods.GET });
```

Check a method or a list of methods is valid, check against the list, normalize a method.

```typescript
import HTTPmethodsConvenience from 'http-convenience-pack';

// Validate
HTTPmethodsConvenience.isValid('GET'); // true; Accept `string[]` as well;
// Check against the optional list (resorts to the HTTP Registry if omitted)
HTTPmethodsConvenience.isAmong('GET', [EHTTPMethods.PUT, EHTTPMethods.POST]); // false; Autocomplete;
// Normalize
HTTPmethodsConvenience.normalize('get'); // 'GET'; Throws for non-strings and invalid methods;
```

### API Reference

#### `EHTTPMethods` Enum

The standard HTTP methods enum that is the module built-in. Complies with [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110#methods) published in June 2022. Contains methods `GET`, `POST`, `PUT`, `DELETE`, `PATCH`, `OPTIONS`, `HEAD`, `TRACE`, `CONNECT`. Type-safe, autocomplete-able.

**Usage**

```typescript
import { EHTTPMethods } from 'http-convenience-pack';

EHTTPMethods.GET; // 'GET', Autocomplete;
```

#### `HTTPMethodsConvenience` Class

The static class that provides the HTTP Methods Registry and the convenience methods for the methods manipulations.

##### `HTTPMethodsConvenience.methods` Getter

Provides the single point access to the HTTP Methods Registry. The Registry either contains built-in methods or built-in and extended (if [`HTTPMethodsConvenience.extend()`](#httpmethodsconvenienceextend-method) was applied)

Signature: `public static get methods(): THTTPMethodsConstraint`

**Usage**

```typescript
import HTTPMethodsConvenience from 'http-convenience-pack';

const allTheMethodsIncludingExtendedIfAny = HTTPMethodsConvenience.methods;
```

##### `HTTPMethodsConvenience.isValid` Method

Check if the given HTTP method(s) are valid against the Methods Registry (either built-in or extended).

Signature: `public static isValid(maybeMethod: string | string[]): boolean`

**Usage**

```typescript
import HTTPMethodsConvenience from 'http-convenience-pack';

HTTPmethodsConvenience.isValid('GET'); // true
HTTPmethodsConvenience.isValid('UNLINK'); // false
HTTPmethodsConvenience.isValid(['GET', 'POST']); // true; Accept `string[]` as well;
HTTPmethodsConvenience.isValid(['GET', 'post']); // true; Automated normalize before validation
HTTPmethodsConvenience.isValid(['GET', 'link']); // false;
```

##### `HTTPMethodsConvenience.isValid` Method

Check if a given HTTP method is allowed based on a methods in the Registry or on the optional list of allowed methods either as [`THTTPMethodsConstraint`](#thttpmethodsconstraint-type) object or `string[]`.

Signature: `public static isAmong(given: string | string[], allowed?: THTTPMethodsConstraint | string[]): boolean`

**Usage**

```typescript
import HTTPMethodsConvenience from 'http-convenience-pack';

console.log(HTTPMethodsConvenience.isAmong('GET')); // true
console.log(HTTPMethodsConvenience.isAmong(['GET', 'POST'])); // true
console.log(HTTPMethodsConvenience.isAmong(['GET', 'POST', 'LINK'])); // true for the Registry extended with 'LINK' method;
console.log(HTTPMethodsConvenience.isAmong('PATCH', ['GET', 'POST'])); // false
```

##### `HTTPMethodsConvenience.normalize` Method

Normalize a given string to an uppercase standard or custom HTTP method. Throws [`HTTPConveniencePackException`](#httpconveniencepackexception-exception) for `maybeMethod` parameter is either not a string or not a valid HTTP method.

Signature: `public static normalize(maybeMethod: string): keyof THTTPMethodsConstraint`

**Usage**

```typescript
// Normalize a valid HTTP method
console.log(HTTPMethodsConvenience.normalize('get')); // 'GET'
console.log(HTTPMethodsConvenience.normalize('link')); // Uncaught throw for non-extended Registry

// Attempt to normalize an invalid HTTP method, catch the throw
try {
  HTTPMethodsConvenience.normalize('invalidMethod');
} catch (e) {
  // "maybeMethod" argument when transformed to upper case should be a valid HTTP built-in or extended method, "invalidMethod" given.`
  console.error(e.message);
}
```

##### `HTTPMethodsConvenience.extend` Method

Extends the HTTP Methods Registry with custom methods.

Signature: `public static extend(methods: THTTPMethodsConstraint): void`

**Usage**

This use case should be pretty rare, nevertheless the package provides it for simplicity.

```typescript
import HTTPmethodsConvenience, { EHTTPMethods } from 'http-convenience-pack';

export enum ECustomHTTPMethods {
 LINK = 'LINK',
 UNLINK = 'UNLINK'
}

// From that point in code the Registry contains both built-in and extended methods.
HTTPMethodsConvenience.extend(ECustomHTTPMethods);

// --- Use
console.log(ECustomHTTPMethods.LINK); // LINK;  Autocomplete;
```

In addition if you would like to combine autocomplete from both enums in a single variable, make this:

```typescript
import { EHTTPMethods } from 'http-convenience-pack';

// Create the constant
export const CombinedHTTPMethods = Object.freeze({ ...EHTTPMethods, ...ECustomHTTPMethods } as const);

// --- Use it
console.log(CombinedHTTPMethods.GET); // GET;  Autocomplete;
console.log(CombinedHTTPMethods.LINK); // LINK;  Autocomplete;
```

##### `HTTPMethodsConvenience.reset` Method

Resets the HTTP Methods Registry to its built-in state.

Signature: `public static reset(): void`

**Usage**

```typescript
import HTTPMethodsConvenience from 'http-convenience-pack';

HTTPMethodsConvenience.reset();
console.log(HTTPMethodsConvenience.isExtended); // true
```

##### `HTTPMethodsConvenience.isExtended` Getter

Checks if the HTTP Methods Registry has been extended with custom methods.

Signature: `public static get isExtended(): boolean`

**Usage**

```typescript
import HTTPMethodsConvenience from 'http-convenience-pack';

console.log(HTTPMethodsConvenience.isExtended); // false
```

##### `HTTPMethodsConvenience.values` Getter

Return the Registry methods as array.

Signature: `public static get values(): string[]`

**Usage**

```typescript
import HTTPMethodsConvenience from 'http-convenience-pack';

console.log(HTTPMethodsConvenience.values); // ['GET`, 'PUT', ...]
```

#### `THTTPMethodsConstraint` Type

The HTTP methods enums supertype to type custom HTTP methods enums. Merely for advanced use.

#### `HTTPConveniencePackException` Exception

HTTP Convenience Pack custom exception.

### Potentially Useful Functionality

These are the potentially useful features. To justify the implementation I yet have to see the demand, a good number of use cases. Proposals in the [GitHub Discussions](https://github.com/WhereJuly/62-http-convenience-pack/discussions) are welcome.

**Return autocomplete-able type from `HTTPMethodsConvenience.methods`.**

It could be possible to make `HTTPMethodsConvenience.methods` to return **the type** [^2] that allows for autocomplete from assigned constants (e.g. const `methods = HTTPMethodsConvenience.methods; console.log(methods.LINK); // 'LINK'`). But the extension use case looks very rare to me to justify add complexity to the existing implementation.

**Provide "group" manipulations for methods**

The methods could be grouped into some logical groups like `safe`, `idempotent` etc. Like

```typescript
console.log(HTTPMethodsConvenience.inGroup('GET', EHTTPGroups.SAFE)); // true
console.log(HTTPMethodsConvenience.ofGroup('GET') === EHTTPGroups.SAFE); // true
```

[^1]: As for VS Code. Depends on your IDE.
[^2]: As opposed to the value that is already returned combined;
