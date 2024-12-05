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

<!-- WARNING: Update headers when implemented. -->
<!-- WARNING: Update MIME Types example from dedicated docs. -->

```typescript
import { EHTTPMethods, EHTTPHeaders, EHTTPMIMETypes } from 'http-convenience-pack';

const response = await fetch('https://api.example.com/data', {

  /**
   * Conveniently and reliably autocomplete the method, no need to use string literals.
   */
  method: EHTTPMethods.GET,

  /**
   * Autocomplete the correct headers and mime types from the list provided.
   */
  headers: {
    ...HTTPHeadersConvenience.make(EHTTPHeaders.Authorization, EMakerTokenSchemes.Bearer, 'myBearerToken'),
    // Set no special treatment header with autocomplete using enums and constants
    EHTTPHeaders.CONTENT_TYPE: MIME_TYPES_BUILTIN['image/png'].type
  }
});
```

### On the Other End: Request Receive and Process

#### Methods

**On request receive** (e.g. in route or endpoint middleware) check a method is valid or allowed, normalize the method if the request came from unknown source.

```typescript
/**
 * Use aliased imports to make long identifiers shorter.
 */
import { EHTTPMethods, HTTPMethodsConvenience as Methods } from 'http-convenience-pack';

/**
 * Receive requests and validate the methods, ensure same values are used on both ends.
 */
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
 * defined in advance for each specific endpoint or route with either `isAmong`
 * or `inGroup` method.
 */
Methods.isAmong(request.method, [EHTTPMethods.GET, EHTTPMethods.POST]); // false
Methods.inGroup(request.method, EHTTPMethodsGroupsList.CACHEABLE); // true; For cacheable methods;
```

#### Headers

Now to **headers**.

Extract the headers. It can extract different standard Authentication schemes and your custom ones.

```typescript
const token = HTTPHeadersConvenience.extract(headers, EHTTPHeaders.Authorization, BuiltInExtractors.token); // 'myBearerToken'
const contentType = HTTPHeadersConvenience.extract(headers, EHTTPHeaders.ContentType); // 'image/png'
// Process the values according to your application needs.
```


#### Respond

**Conveniently respond** in an endpoint handler (e.g. in Express) with **headers**, **status codes and messages**.

```typescript
import { EHTTPHeaders, EHTTPMIMETypes, THTTPStatuses } from 'http-convenience-pack';

const handler = (req: Request, res: Response): void => {
  const body = JSON.stringify({ message: 'Hello, world!' });

  /**
   * Conveniently set the auto-completable headers on response.
   */
  res.set({
      EHTTPHeaders.CONTENT_LENGTH: Buffer.byteLength(body).toString(),
      EHTTPHeaders.CONTENT_TYPE: EHTTPMIMETypes.APPLICATION_JSON
    })

    /**
     * Set the desired status from the auto-completable list.
     */
    .status(THTTPStatuses[200].code)

    /**
     * Set the status message. Used here for brevity as the example appropriate for a custom error
     * handler. Actually here Express would set the default message ('OK') itself.
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

---
