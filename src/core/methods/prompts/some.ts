/* eslint-disable @typescript-eslint/no-empty-object-type */

// Assume I have a static class HTTPMethodsConvenience and the enum `EHTTPMethods`.

// To isolate from the actual code.
namespace _Prompts {

    export enum EHTTPMethods {
        GET = 'GET',
        PUT = 'PUT',
    }

    export class HTTPMethodsConvenience {

        private static extended: unknown | null;

        public static methods(): unknown {
            return HTTPMethodsConvenience.extended ?
                EHTTPMethods :
                // NB: here `as {}` To clear TS error in the example
                { ...EHTTPMethods, ...HTTPMethodsConvenience.extended as {} };
        }

        public static extend(methods: unknown): void {
            HTTPMethodsConvenience.extended = methods;
        }

    }

}

// Now I want to 1) create the custom enum of the same shape as EHTTPMethods (2)there must
// be a common supertype for all such enums) 3) put it into `extended` property
// and 4) return either built-in EHTTPMethods if no extended methods were added or
// a combination of both. So I need to type `extended` property, parameters and return types of
// `extend` methods and return type of `methods` method to accommodate both EHTTPMethods and custom
// `extended` one. Is this possible?
