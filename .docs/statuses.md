## HTTP Statuses

- Ensure you use the latest valid status codes and messages from [RFC 9110 Status Codes](https://www.rfc-editor.org/rfc/rfc9110.html#section-15) across your application;
- Comfortably autocomplete desired status values from a typed constant like this `console.log(THTTPStatuses[200]) // { code: 200, message: 'Success' }`.
- Check the given status belongs to statuses groups ("1xx: Info", "2xx: Success" etc.)
- Check the given status is allowed for your specific use cases ("is in the list");

> Use case for isAmong for my frontend where I decide what to do depending on codes.
> Use cases for exported types: create your own types enum groups, make custom groups of Status objects
> (like subsets of standard codes with custom messages) to retrieve custom message by code,
> detect if code is valid, in group, of group with custom groups.

TBW: API & use cases.