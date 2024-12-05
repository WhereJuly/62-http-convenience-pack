<div align="center">
  <img src="./images/banner-6.jpg" width="100%"/>
</div>

## HTTP Methods Module

- [HTTP Methods Module](#http-methods-module)
  - [At a Glance](#at-a-glance)
  - [A Basic Use Case](#a-basic-use-case)
  - [API Reference](#api-reference)
    - [`EHTTPMethods` Enum](#ehttpmethods-enum)
    - [`EHTTPMethodsGroupsList` Enum](#ehttpmethodsgroupslist-enum)
    - [`HTTPMethodInGroups` Typed Constant](#httpmethodingroups-typed-constant)
    - [`HTTPMethodsConvenience` Class](#httpmethodsconvenience-class)
      - [`.methods` Getter](#methods-getter)
      - [`.isValid()` Method](#isvalid-method)
      - [`.isAmong()` Method](#isamong-method)
      - [`.inGroup()` Method](#ingroup-method)
      - [`.ofGroups()` Method](#ofgroups-method)
      - [`.normalize()` Method](#normalize-method)
      - [`.extend()` Method](#extend-method)
      - [`.reset()` Method](#reset-method)
      - [`.isExtended` Getter](#isextended-getter)
      - [`.values` Getter](#values-getter)
    - [`THTTPMethodsConstraint` Type](#thttpmethodsconstraint-type)
    - [`HTTPConveniencePackException` Exception](#httpconveniencepackexception-exception)
  - [Potentially Useful Functionality](#potentially-useful-functionality)

---

### At a Glance

The module contains all the standard HTTP methods according to [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110#methods) as built-ins. It allows to type-safely autocomplete, validate, check against the list, normalize, [extend](#extend-method) with custom HTTP Methods and manipulate with built-in and extended HTTP Methods (if any) as one.

The module contains the following public [API](#api-reference): the enum `EHTTPMethods` and the class `HTTPMethodsConvenience`. The class allows the access to the HTTP Registry via `HTTPMethodsConvenience.methods`

### A Basic Use Case

Ensure the uniform methods values are used across your application.

```typescript
import { EHTTPMethods } from 'http-convenience-pack';

// Browser or Node
const response = await fetch('https://api.example.com/data', { method: EHTTPMethods.GET });
```

Check a method or a list of methods is valid, check against the list, group, normalize a method.

```typescript
import HTTPmethodsConvenience from 'http-convenience-pack';

/**
 * Validate
 */
HTTPmethodsConvenience.isValid('GET'); // true; Accept `string[]` as well;

/**
 * Check against the optional list (resorts to the HTTP Registry if omitted)
 */
HTTPmethodsConvenience.isAmong('GET', [EHTTPMethods.PUT, EHTTPMethods.POST]); // false; Autocomplete;

/**
 * Check against the specific method group
 */
HTTPmethodsConvenience.inGroup('GET', EHTTPMethodsGroupsList.NON_IDEMPOTENT); // false; Autocomplete;

/**
 * Normalize
 */
HTTPmethodsConvenience.normalize('get'); // 'GET'; Throws for non-strings and invalid methods;
```

### API Reference

#### `EHTTPMethods` Enum

The standard HTTP methods built-in enum that is the module built-in. Complies with [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110#methods) published in June 2022. Contains HTTP methods `GET`, `POST`, `PUT`, `DELETE`, `PATCH`, `OPTIONS`, `HEAD`, `TRACE`, `CONNECT`. Type-safe, autocomplete-able.

**Usage**

```typescript
import { EHTTPMethods } from 'http-convenience-pack';

EHTTPMethods.GET; // 'GET', Autocomplete;
```

#### `EHTTPMethodsGroupsList` Enum

The standard HTTP methods groups built-in enum. Complies with the [RFC](https://www.rfc-editor.org/rfc/rfc9110#methods). Contains `SAFE`, `IDEMPOTENT`, `NON_IDEMPOTENT`, `CACHEABLE`, `PREFLIGHT`, `SPECIAL`. Type-safe, autocomplete-able.

**Usage**

```typescript
import { EHTTPMethodsGroupsList } from 'http-convenience-pack';

console.log(EHTTPMethodsGroupsList.CACHEABLE); // 'cacheable'; As EHTTPMethodsGroupsList enum member. Autocomplete;
```

#### `HTTPMethodInGroups` Typed Constant

The list of HTTP methods with their respective groups. Type-safe, autocomplete-able. 

See the methods belonging to groups in [the code](/src/core/methods/methods.types.ts).

**Usage**

```typescript
import { HTTPMethodInGroups } from 'http-convenience-pack';

console.log(HTTPMethodInGroups[EHTTPMethods.GET]); // readonly [EHTTPMethodsGroupsList.SAFE, EHTTPMethodsGroupsList.IDEMPOTENT, ...]
```

#### `HTTPMethodsConvenience` Class

The static class that provides the HTTP Methods Registry and the convenience methods for the methods manipulations.

##### `.methods` Getter

Provides the single point access to the HTTP Methods Registry. The Registry either contains built-in methods or built-in and extended (if [`HTTPMethodsConvenience.extend()`](#extend-method) was applied)

Signature: `public static get methods(): THTTPMethodsConstraint`

**Usage**

```typescript
import HTTPMethodsConvenience from 'http-convenience-pack';

const allTheMethodsIncludingExtendedIfAny = HTTPMethodsConvenience.methods;
```

##### `.isValid()` Method

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

##### `.isAmong()` Method

Check if a given HTTP method is among methods in the Registry, or on the optional list of methods either as as string, `string`, [`THTTPMethodsConstraint`](#thttpmethodsconstraint-type) object or `string[]`.

Signature: `public static isAmong(given: string | string[], allowed?: string | THTTPMethodsConstraint | string[]): boolean`

The `given` vales are case-insensitive (always converted to uppercase). The `allowed` argument values must be uppercase. See [`.extend`](#extend-method).

**Usage**

```typescript
import HTTPMethodsConvenience from 'http-convenience-pack';

console.log(HTTPMethodsConvenience.isAmong('GET')); // true
console.log(HTTPMethodsConvenience.isAmong('GET', EHTTPMethods.GET)); // true
console.log(HTTPMethodsConvenience.isAmong(['GET', 'pOST'])); // true
console.log(HTTPMethodsConvenience.isAmong(['get', 'POST', 'LINK'])); // true for the Registry extended with 'LINK' method;

/**
 * Here check the method against the custom list of allowed methods.
 * Use `.inGroup()` to check against the standard groups.
 */
console.log(HTTPMethodsConvenience.isAmong('patch', ['GET', 'POST'])); // false
```

##### `.inGroup()` Method

Checks if a given HTTP method belongs to a specified single [`EHTTPMethodsGroupsList`](#ehttpmethodsgroupslist-enum)
or multiple `EHTTPMethodsGroupsList[]` groups. Checks against [`HTTPMethodInGroups`](#httpmethodingroups-typed-constant) typed constant(s).

By default, it checks if the method belongs to **at least one** of the groups (logical OR). Passing `false` for the optional `all` parameter, will make it check the method belongs to **every** group (logical AND).

Signature: `public static inGroup(given: string, groups: EHTTPMethodsGroupsList | EHTTPMethodsGroupsList[], all: boolean = false): boolean`

The method throws for invalid `given` HTTP method (see [.normalize](#normalize-method)).

**Usage**

```typescript
import HTTPMethodsConvenience from 'http-convenience-pack';

console.log(HTTPMethodsConvenience.inGroup('get', EHTTPMethodsGroupsList.CACHEABLE)); // true
console.log(HTTPMethodsConvenience.inGroup('GET', [EHTTPMethodsGroupsList.CACHEABLE, EHTTPMethodsGroupsList.SAFE])); // true
console.log(HTTPMethodsConvenience.inGroup('CONNECT', [EHTTPMethodsGroupsList.IDEMPOTENT, EHTTPMethodsGroupsList.CACHEABLE])); // false
console.log(HTTPMethodsConvenience.inGroup('GET', [EHTTPMethodsGroupsList.IDEMPOTENT, EHTTPMethodsGroupsList.CACHEABLE], true)); // true
console.log(HTTPMethodsConvenience.inGroup('POST', [EHTTPMethodsGroupsList.IDEMPOTENT, EHTTPMethodsGroupsList.CACHEABLE], true)); // false
```

**Use Cases**

```typescript
/**
 * Permit some operations for admins only.
 */
HTTPMethodsConvenience.inGroup(request.method, EHTTPMethodsGroupsList.NON_IDEMPOTENT) && isAdmin && this.processAdminTasks();

/**
 * Process cache only for cacheable methods.
 */
HTTPMethodsConvenience.inGroup(request.method, EHTTPMethodsGroupsList.CACHEABLE) && this.processCache();

/**
 * Monitor only non-idempotent requests.
 */
HTTPMethodsConvenience.inGroup(request.method, EHTTPMethodsGroupsList.NON_IDEMPOTENT) && this.logRequest();
```

##### `.ofGroups()` Method

Retrieves the groups associated with a given HTTP method from [`HTTPMethodInGroups`](#httpmethodingroups-typed-constant) for the valid method, otherwise  returns an empty array.

Signature: `public static ofGroups(maybeMethod: string): readonly EHTTPMethodsGroupsList[]`

The method throws for invalid `maybeMethod` HTTP method (see [.normalize](#normalize-method)).

**Usage**

```typescript
import HTTPMethodsConvenience from 'http-convenience-pack';

console.log(HTTPMethodsConvenience.ofGroups('get')); // HTTPMethodInGroups[EHTTPMethods.GET] as array;
console.log(HTTPMethodsConvenience.ofGroups('invalid')); // throws HTTPConveniencePackException
```

##### `.normalize()` Method

Normalize a given string to an uppercase standard or custom HTTP method. Throws [`HTTPConveniencePackException`](#httpconveniencepackexception-exception) for `maybeMethod` parameter is either not a string or not a valid HTTP method.

Signature: `public static normalize(maybeMethod: string): keyof THTTPMethodsConstraint`.

The method throws for invalid `maybeMethod` HTTP method. The design assumption is that external input strings are always expected to be the valid HTTP methods. 

**Usage**

```typescript
// Normalize a valid HTTP method
console.log(HTTPMethodsConvenience.normalize('get')); // 'GET'
console.log(HTTPMethodsConvenience.normalize('link')); // Uncaught throw for non-extended Registry

// Attempt to normalize an invalid HTTP method, catch the throw
try {
  HTTPMethodsConvenience.normalize('invalidMethod');
} catch (e) {
  // "maybeMethod" argument when transformed to upper case should be a valid HTTP built-in or extended  method, "invalidMethod" given.`
  console.error(e.message);
}
```

##### `.extend()` Method

Extends the HTTP Methods Registry with custom methods.

Signature: `public static extend(methods: THTTPMethodsConstraint): void`

**Usage**

This use case should be pretty rare, nevertheless the package provides it for simplicity.

> Note the extension enum values must be upper case (RFC-compliant) for validation (`isValid`, `isAmong`) functionality to work as expected.

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

##### `.reset()` Method

Resets the HTTP Methods Registry to its built-in state.

Signature: `public static reset(): void`

**Usage**

```typescript
import HTTPMethodsConvenience from 'http-convenience-pack';

HTTPMethodsConvenience.reset();
console.log(HTTPMethodsConvenience.isExtended); // true
```

##### `.isExtended` Getter

Checks if the HTTP Methods Registry has been extended with custom methods.

Signature: `public static get isExtended(): boolean`

**Usage**

```typescript
import HTTPMethodsConvenience from 'http-convenience-pack';

console.log(HTTPMethodsConvenience.isExtended); // false
```

##### `.values` Getter

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

[^2]: As opposed to the value that is already returned combined;
