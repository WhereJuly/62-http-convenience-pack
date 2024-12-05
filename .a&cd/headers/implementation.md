#### Rough Description

- Ensure the headers are uniform across your applications.
- Could provide the headers enum and the convenience operations with it.
- Like get header name from the list. Or extract bearer token from headers object.

Usage

```typescript
// When making requests
fetch(EHTTPMethods.GET, 'https://some.url', { EHTTPHeaders.AUTHORIZATION: 'Bearer token' });
// For the above use case I could make the Authorization header value
// based on its desired type / scheme: E.g. by default prepend `Bearer ` prefix.

// So far implement only for `EHTTPHeaders.AUTHORIZATION` header
// 'token' is just value;
// `EHTTPHeaderSchemes.Bearer` optional, use this one by default.
HTTPHeadersConvenience.make(EHTTPHeaders.AUTHORIZATION, 'token', EHTTPHeaderSchemes.Bearer)

// Validate headers in middleware:
// optionally throwing if the header is no present
// return null if value does not match
// Polymorphic
HTTPHeadersConvenience.extract(request, EHTTPHeaders.AUTHORIZATION)

// Extract and compare against the expected value
// `expected` could be array?
HTTPHeadersConvenience.hasExpected(request.headers, EHTTPHeaders.AUTHORIZATION, expected) //

// Set headers in responses
response.set(EHTTPHeaders.CONTENT_TYPE, EMIMETypes.APPLICATION_JSON)

```

> See [combined usage example](/.docs/combined-usage-example.md)
