#### Combined Usage Example

> NB: Create all examples in the actual typescript file to check correctness and put here.

Comfortably autocomplete HTTP constants and ensure the uniform HTTP values are used across your application.

**Send a request**

```typescript
import { EHTTPMethods, EHTTPHeaders, EHTTPMIMETypes } from 'http-convenience-pack';

const response = await fetch('https://api.example.com/data', {
 method: EHTTPMethods.GET,
 headers: {
  EHTTPHeaders.AUTHORIZATION: 'Bearer <required-token-here>',
  EHTTPHeaders.CONTENT_TYPE: EHTTPMIMETypes.APPLICATION_JSON
 }
});
```

**On request receive** (e.g. in route or endpoint middleware) check a method is valid or allowed, normalize the method if the request came from unknown source.

```typescript
import { EHTTPMethods, HTTPMethodsConvenience as Methods } from 'http-convenience-pack';

const allowed = [EHTTPMethods.GET, EHTTPMethods.PATCH];
// Assume the request came for your service above.

Methods.isValid(request.method); // true
Methods.isAmong(request.method, allowed); // true
```

**Assume** the request came for some unknown service with method `options` (as lower case).

```typescript
// Normalize (to upper case) and test against `EHTTPMethods` enum.
Methods.isValid(Methods.normalize(request.method)); // true

// Same as preceding but normalize is built-in (as well as exception throw for non-strings or invalid methods, see API description)
Methods.isAmong(request.method); // true

// Normalize and test against `allowed` methods as inline literal 
// or constant, defined in advance for each specific endpoint or route  
Methods.isAmong(request.method, ['GET', 'POST']); // false
```

> Here I could implement the groups functionality like
> `Methods.inGroup(request.method, EHTTPMethodsGroups.SAFE)`
> to avoid manually listing the methods for some standard use cases

Now to **headers**.

This example iterates over keys in `request.headers` object, normalizes each one, finds the desired header and by default extract the token with `Bearer token` value scheme.

```typescript
const token = HTTPHeaders.extract(request.headers, HTTPHeaders.AUTHORIZATION)
```

It can extract different standard Authentication schemes and your custom ones.

If no scheme provided it detects the decode scheme based on the header actual value prefix (extracting it and trying against Bearer, Basic, Digest ones) or throws. If scheme is provided explicitly it tries to decode extract and return the respective value or throws if the scheme does not match. If scheme matches but no value is provided it returns null.

```typescript
const token = HTTPHeaders.extract(request.headers, HTTPHeaders.AUTHORIZATION,
  EHTTPAuthenticationScheme.{Bearer, Basic, Digest, Custom}, () => { // required for EHTTPAuthenticationScheme.Custom })
// Pass the token further down the middleware chain to use.
```

**Conveniently respond** in an endpoint handler (e.g. in Express)

```typescript
import { EHTTPHeaders, EHTTPMIMETypes, THTTPStatuses } from 'http-convenience-pack';

const handler = (req: Request, res: Response): void => {
  const body = JSON.stringify({ message: 'Hello, world!' });

  res.set({
      EHTTPHeaders.CONTENT_LENGTH: Buffer.byteLength(body).toString(),
      EHTTPHeaders.CONTENT_TYPE: EHTTPMIMETypes.APPLICATION_JSON
    })
    .status(THTTPStatuses[200].code)
    // Here for brevity. May use it in custom error handler. Here Express would set the default message ('OK').
    .statusMessage(THTTPStatuses[200].message)
    .send(bodyString);
};
```
