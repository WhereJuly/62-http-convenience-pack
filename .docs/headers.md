## Headers

#### Header Value Extractors

There are multiple types os header values content that may be useful to extract and parse / transform. Several extractors are implemented in the Headers module. Others implementations are pending your requests with use cases description & value justification.

The implemented extractors: 

- Value: return the header value, a default extractor used for unknown value types;
- Array: optionally with custom separator; Used in headers like `Accept`, `Accept-Encoding` etc.;
- Date object: for `Date`, `Expires`, or `Last-Modified` etc.;
- Base64 string: extract the Base64 string and decode it to an UTF-8 string;`
- Authorization header token: auto-detect the built-in known token scheme (Basic, Bearer, APIKey) and extract the value. 
  All the extractors here remove the scheme part and either return transformed or "as is" value of the token. E.g. the `Basic` scheme extractor decodes the Base64 value to UTF-8 then parses it to a tuple of `[login, password]` type.

What potentially could be implemented:

- `Cache-Control` can have values like `"no-cache"`, `"no-store"`, or `"must-revalidate"`. Probably useful to be extracted as a built-in enum;
- `Content-Type` with content like `application/json; charset=UTF-8` could be extracted to `MIME_TYPES_BUILTIN['application/json'].type`. What to do with `charset=UTF-8` is still TBD;
- Authorization header tokens (can reconsider implementation): 
  - Digest scheme: was left out for rare usage nowadays;
  - OAuth1 scheme: left out due to being inferior to OAuth2;