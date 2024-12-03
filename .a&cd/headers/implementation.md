#### Rough Description

- Ensure the headers are uniform across your applications.
- Could provide the headers enum and the convenience operations with it.
- Like get header name from the list. Or extract bearer token from headers object.

Usage

```typescript
// When making requests
fetch(EHTTPMethods.GET, 'https://some.url', { EHTTPHeaders.AUTHORIZATION: 'Bearer token' });

// Validate headers in middleware:
// optionally throwing if the header is no present
// return null if value does not match
// Polymorphic
HTTPHeadersConvenience.extractIfPresent(request, EHTTPHeaders.AUTHORIZATION) //

// Extract and compare against the expected
HTTPHeadersConvenience.isValid(request, {EHTTPHeaders.AUTHORIZATION: expected}) //

// Set headers in responses
response.set(EHTTPHeaders.CONTENT_TYPE, EMIMETypes.APPLICATION_JSON)

```

> See [combined usage example](.docs/combined-usage-example.md)
