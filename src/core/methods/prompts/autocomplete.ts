namespace _Prompt {

    // Assume I have two enums EHTTPMethods and ECustomHTTPMethods
    export enum EHTTPMethods {
        GET = 'GET',
        POST = 'POST',
        PUT = 'PUT',
        DELETE = 'DELETE',
        PATCH = 'PATCH',
        OPTIONS = 'OPTIONS',
        HEAD = 'HEAD',
        TRACE = 'TRACE',
    }

    enum ECustomHTTPMethods {
        LINK = 'LINK',
        UNLINK = 'UNLINK',
    }

    // Can i get the single type and / or a constant from both of these that would
    // provide me an autocomplete for all the methods contained in both enums?

    // I would not like to manually defined all the methods in the single enum, the ECustomHTTPMethods
    // is not known in advance.

    // I need to be able to get autocomplete suggestions for all the methods from both enums
    // in one constant like this:

    // @ts-expect-error ...
    console.log(COMBINED.GET); // 'GET'

    // Is this possible?

    const COMBINED = Object.freeze({
        ...EHTTPMethods,
        ...ECustomHTTPMethods,
    } as const);

    // Now you can use COMBINED with autocomplete
    console.log(COMBINED.GET); // 'GET'
    console.log(COMBINED.LINK); // 'LINK'
    console.log(COMBINED.OPTIONS);

    
}