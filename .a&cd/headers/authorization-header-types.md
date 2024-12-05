
The `Authorization` header in HTTP requests is used to convey credentials for authenticating the client to the server. There are several types of authorization schemes, each with its own format and content. Here are the most common types of content found in the `Authorization` header:

### Summary of Common Authorization Header Content Types:

1. **Basic Authentication**: `Basic <base64-encoded credentials>`
2. **Bearer Authentication**: `Bearer <token>`
3. **Digest Authentication**: `Digest <parameters>`
4. **OAuth 1.0**: `OAuth <parameters>`
5. **OAuth 2.0**: `Bearer <token>`
6. **API Key Authentication**: `APIKey <key>`
7. **AWS Signature Version 4**: `AWS4-HMAC-SHA256 Credential=<access-key-id>/...`
8. **Bearer + Custom Authentication**: `Bearer <custom-token>`
9. **Negotiate Authentication (Kerberos)**: `Negotiate <token>`
10. **Custom Schemes**: `Authorization: <scheme> <data>`

Each scheme has its own specific format and method of extracting or validating credentials, and developers must parse or process the authorization information accordingly depending on the scheme used.

---

### **Summary of the Most Common Authorization Types:**

1. **Bearer Authentication (Token-based)** - Widely used in modern web applications, especially with OAuth 2.0 and JWT-based systems.
2. **Basic Authentication** - Simple, but less secure for production environments unless used with HTTPS.
3. **API Key Authentication** - Common for APIs and services that require access keys for authentication.
4. **OAuth 2.0 (Bearer Token)** - The go-to choice for modern, scalable authentication with delegated access.
5. **Digest Authentication** - Less common now, but still used for some legacy systems.
6. **Custom Authentication Schemes** - Tailored to specific needs, often used in enterprise systems.

In daily development, **Bearer Authentication**, **Basic Authentication**, and **API Key Authentication** are the most widely used. **OAuth 2.0** has become the standard for handling third-party integrations and user authentication in modern applications.

---

### 1. **Basic Authentication**
   - **Format**: `Authorization: Basic <base64-encoded credentials>`
   - **Content**: The `credentials` part consists of a username and password, concatenated with a colon (`:`), and then encoded in base64.
   - **Example**:
     - Value: `Basic dXNlcm5hbWU6cGFzc3dvcmQ=`
     - This represents the base64-encoded string of `username:password`.

   - **Notes**: 
     - This method sends the credentials in an easily decodable format (base64), so it is typically used over HTTPS to ensure security.

### 2. **Bearer Authentication (Token-based)**
   - **Format**: `Authorization: Bearer <token>`
   - **Content**: The `token` part is usually a string representing a bearer token (often a JWT or OAuth2 token).
   - **Example**:
     - Value: `Bearer abc123xyz456`
     - This represents a bearer token used to authenticate the request.

   - **Notes**:
     - This is commonly used in OAuth 2.0 and JWT-based authentication systems.

### 3. **Digest Authentication**
   - **Format**: `Authorization: Digest <parameters>`
   - **Content**: Digest authentication involves a set of parameters that help to authenticate requests securely, including a hash of the username, password, URL, and other factors.
   - **Example**:
     - Value: `Digest username="Mufasa", realm="testrealm@host.com", nonce="dcd98b7102dd2f0e8b11d0f600bfb0c093", uri="/dir/index.html", response="e02e8b7b8a1e12d0079b059fe6f51b23", opaque="5ccc069c403ebaf9f0171e9517f40e41`
   
   - **Notes**:
     - This method is more secure than Basic Authentication because it doesn’t send the password in plain text or base64-encoded form. Instead, it sends a hashed (digest) version.

### 4. **OAuth 1.0**
   - **Format**: `Authorization: OAuth <parameters>`
   - **Content**: The `OAuth` scheme includes several parameters such as `oauth_consumer_key`, `oauth_token`, `oauth_signature_method`, `oauth_signature`, and others.
   - **Example**:
     - Value: `OAuth oauth_consumer_key="xvz1evFS4wEEPTjF5", oauth_token="kY1t4j8Jc1hHqg3F1w7E", oauth_signature_method="HMAC-SHA1", oauth_signature="tnnFqbhY%2FsaT%2FqKn9mVg%3D"`
   
   - **Notes**:
     - OAuth 1.0 uses a complex signature system to authenticate API requests, ensuring both the authenticity and integrity of the request.

### 5. **OAuth 2.0**
   - **Format**: `Authorization: Bearer <token>`
   - **Content**: Similar to Bearer Authentication, OAuth 2.0 uses a bearer token for authorization, often obtained through a prior OAuth flow (e.g., authorization code flow).
   - **Example**:
     - Value: `Bearer ya29.a0AfH6SMCpq7bdwPbOSdF1ymzSXXlQgdpIzHYTbBHH-YFexd31lPfshzzDAN4wmrZjFwzz59Dl8Uh5ZVjeDRdhhA5XrsTcG0pEwdF4od8uS58lY3pFW`
   
   - **Notes**:
     - OAuth 2.0 is widely used for authorization in web apps, mobile apps, and APIs, as it enables delegated access to resources without sharing user credentials.

### 6. **API Key Authentication**
   - **Format**: `Authorization: APIKey <key>`
   - **Content**: The `key` part is a unique API key used to authenticate the request. While not a formalized scheme in the HTTP standard, many APIs use this format for simplicity.
   - **Example**:
     - Value: `APIKey abcd1234apikey5678`
   
   - **Notes**:
     - This is a simple and common form of API key-based authentication where the key is passed directly in the header.

### 7. **AWS Signature Version 4**
   - **Format**: `Authorization: AWS4-HMAC-SHA256 Credential=<access-key-id>/.../aws4_request, SignedHeaders=<headers>, Signature=<signature>`
   - **Content**: The value contains several parameters like `Credential`, `SignedHeaders`, and `Signature` to authenticate AWS requests based on the AWS Signature V4.
   - **Example**:
     - Value: `Authorization: AWS4-HMAC-SHA256 Credential=AKIDEXAMPLE/20211201/us-west-2/s3/aws4_request, SignedHeaders=host;x-amz-date, Signature=fe4bc70312c9a61d59fdfe3f0bc1b9ff10e21fca`
   
   - **Notes**:
     - This is a complex authentication scheme used by AWS services, where each request is signed with a computed signature.

### 8. **Bearer + Custom Authentication (e.g., for custom auth systems)**
   - **Format**: `Authorization: Bearer <custom-token>`
   - **Content**: Similar to the Bearer Authentication, but using custom token formats (e.g., a token issued by a third-party service or your own authentication system).
   - **Example**:
     - Value: `Bearer mycustomtoken1234`
   
   - **Notes**:
     - Some applications use a custom token system with the Bearer scheme for specific use cases.

### 9. **Negotiate Authentication (Kerberos)**
   - **Format**: `Authorization: Negotiate <token>`
   - **Content**: Used by systems that implement Kerberos authentication. The `token` is a security token generated by the Kerberos server.
   - **Example**:
     - Value: `Negotiate YIICGgYJKoZIhvcNAQcCoIICIzCCAj8CAQExggE0MIIBDQIBATCB7jCB6zCBgKCBaIYC29mbYwG0wKzc=`
   
   - **Notes**:
     - This is commonly used in enterprise environments where Kerberos authentication is in place.

### 10. **Custom Schemes**
   - **Format**: `Authorization: <scheme> <data>`
   - **Content**: Some systems or applications may define their own custom schemes for authentication. The `scheme` could be any string (e.g., `CustomAuth`), and the `data` could be any token or string required for authentication.
   - **Example**:
     - Value: `Authorization: CustomAuth customtoken12345`
   
   - **Notes**:
     - This is an application-specific scheme that can be used when the standard schemes (like Basic or Bearer) do not meet the needs of a specific application.

---

