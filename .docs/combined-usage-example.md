<div align="center">
  <img src="./images/banner-6.jpg" width="100%"/>
</div>

## Combined Usage Example

> NB: Create all examples in the actual typescript file to check correctness and put here.

- [Combined Usage Example](#combined-usage-example)
  - [Start on One End](#start-on-one-end)
    - [Send a request](#send-a-request)
  - [On the Other End: Request Receive and Process](#on-the-other-end-request-receive-and-process)
    - [Methods](#methods)
    - [Headers](#headers)
    - [Respond](#respond)
  - [Back to One End: Response Receive and Process](#back-to-one-end-response-receive-and-process)
  - [Conclusion](#conclusion)

---

### Start on One End

Start on your one end, e.g. front-end. Comfortably autocomplete HTTP constants. Ensure you get the reliable uniform HTTP values across your application.

#### Send a request

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

### On the Other End: Request Receive and Process

#### Methods

**On request receive** (e.g. in route or endpoint middleware) check a method is valid or allowed, normalize the method if the request came from unknown source.

```typescript
import { EHTTPMethods, HTTPMethodsConvenience as Methods } from 'http-convenience-pack';

const allowed = [EHTTPMethods.GET, EHTTPMethods.PATCH];

Methods.isValid(request.method); // true
Methods.isAmong(request.method, allowed); // true
```

**Assume** the request came for some unknown service with method `options` (as lower case).

```typescript
/**
 * Normalize (to upper case) and test against `EHTTPMethods` enum.
 */
Methods.isValid(Methods.normalize(request.method)); // true

/**
 * Same as preceding one but `normalize` is built-in into `isAmong`
 * as well as the custom `HTTPConveniencePackException` exception throw 
 * for non-strings or invalid methods, see API description
 */
Methods.isAmong(request.method); // true

/**
 * Normalize and test against `allowed` methods as inline literal or constant,
 * defined in advance for each specific endpoint or route
 */
Methods.isAmong(request.method, ['GET', 'POST']); // false
```

> Here I could implement the groups functionality like
> `Methods.inGroup(request.method, EHTTPMethodsGroups.SAFE)`
> to avoid manually listing the methods for some standard use cases

#### Headers

> This functionality has to be implemented

Now to **headers**.

Extract the header. 

> Implementation notes: This example iterates over keys in `request.headers` object, normalizes each one, finds the desired header and by default extract the token with `Bearer token` value scheme.

```typescript
const token = HTTPHeaders.extract(request.headers, HTTPHeaders.AUTHORIZATION);
```

It can extract different standard Authentication schemes and your custom ones.

If no scheme provided it detects the decode scheme based on the header actual value prefix (extracting it and trying against Bearer, Basic, Digest ones) or throws. If scheme is provided explicitly it tries to decode extract and return the respective value or throws if the scheme does not match. If scheme matches but no value is provided it returns null.

```typescript
const token = HTTPHeaders.extract(request.headers, HTTPHeaders.AUTHORIZATION,
  EHTTPAuthenticationScheme.{Bearer, Basic, Digest, Custom}, () => { // required for EHTTPAuthenticationScheme.Custom })
// Pass the token further down the middleware chain to use.
```

#### Respond

**Conveniently respond** in an endpoint handler (e.g. in Express) with **headers**, **status codes and messages**.

```typescript
import { EHTTPHeaders, EHTTPMIMETypes, THTTPStatuses } from 'http-convenience-pack';

const handler = (req: Request, res: Response): void => {
  const body = JSON.stringify({ message: 'Hello, world!' });

  res.set({
      EHTTPHeaders.CONTENT_LENGTH: Buffer.byteLength(body).toString(),
      EHTTPHeaders.CONTENT_TYPE: EHTTPMIMETypes.APPLICATION_JSON
    })
    .status(THTTPStatuses[200].code)

    /**
     * `.statusMessage` used here for brevity as the example appropriate for a custom error handler.
     * Actually here Express would set the default message ('OK') itself.
     */
    .statusMessage(THTTPStatuses[200].message)
    .send(bodyString);
};
```

### Back to One End: Response Receive and Process

**Receive the response** on your end (continue from the [top](#combined-usage-example)) and process it according to the **status code**, **headers**

```typescript
const response = await fetch(/* see at the beginning */)

const status = response.status;

/**
 * Conveniently forward the codes to their respective handlers.
 */
HTTPStatusesConvenience.inGroup(status, EHTTPStatusCodeGroups.CLIENTERR) && this.processError();
HTTPStatusesConvenience.inGroup(status, EHTTPStatusCodeGroups.SUCCESS) && this.processSuccess();

/**
 * Use convenience method `isAmong` to run the specific use cases handler.
 */
const specific = [THTTPStatuses[200].code, THTTPStatuses[204].code]
HTTPStatusesConvenience.isAmong(status, specific)) && this.processSpecific();
```

### Conclusion

This is just the basic use cases flow but you can see how expressive, simple and readable the code becomes as well as comfortable the autocomplete gets.