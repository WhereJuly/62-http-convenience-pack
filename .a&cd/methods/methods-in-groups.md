## Analysis

The grouped methods implementation with enums is straightforward and based on repetitions.

Here is the shortened example.

```typescript
export enum EHTTPMethods { GET = 'GET', POST = 'POST', /* ... */ }

export enum EHTTPMethodsGroupsList { SAFE = 'safe', IDEMPOTENT = 'idempotent', /* ... */ }

export const HTTPMethodInGroups = {
    [EHTTPMethods.GET]: [EHTTPMethodsGroupsList.SAFE, EHTTPMethodsGroupsList.IDEMPOTENT, EHTTPMethodsGroupsList.CACHEABLE],
    [EHTTPMethods.HEAD]: [EHTTPMethodsGroupsList.SAFE, EHTTPMethodsGroupsList.IDEMPOTENT, EHTTPMethodsGroupsList.CACHEABLE],
    /* ... */
}
```

Could refactor to the less repeatable implementation. It would define all the HTTP Methods with attributes in the single source of truth (SSoT) array of tuples. Then use TypeScript inference and a typed constant to expose the type-safe auto-completable HTTP methods as done in HTTP Mime Types module (see [1](/src/core/mime/types.ts), [2](/src/core/mime/builtin.constants.ts)).

Could explore the combination of enums and SSoT array, like following, though it does not differ much from the straightforward approach.

```typescript
const methods = [
    [EHTTPMethods.GET, [EHTTPMethodsGroupsList.SAFE, EHTTPMethodsGroupsList.IDEMPOTENT, EHTTPMethodsGroupsList.CACHEABLE]]],
    /* ... */
] as const;
```

**Discussion**

Pro: less repetitive.

Contra: the implementation is not straightforward, complex, longer to debug, that makes efficiency (effect per time spent).

**Conclusion**

The SSoT approach does not seem to provide the justification for more time spent. It seems like the same functionality would be achievable with the straightforward approach that still is clean enough.

For now will go with more straightforward implementation. May return to SSoT approach some time later if more justifications reveals.