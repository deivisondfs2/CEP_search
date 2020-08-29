# Authentication

> How is there generate an access_token?

## Steps `authorize`

- [login](#login)
- [code](#code)
- [access_token](#access_token)

### `login`

To login, access the following [URL](https://dev-deivison.us.auth0.com/authorize?client_id=PusZFvnwQQuS16XJX3JJ0w4Ixzelb6C9&scope=openid%20email%20profile%20offline_access&response_type=code&redirect_uri=http://localhost:3002/callback&state=STATE&audience=http://localhost:8080/api/)<br />

### `code` to generate access_token

When the login is successful, a parameter code will appear in the URL to generate the token.

### `access_token`

Use the GET token request within the CEP collection in the postman folder, adding the code generated in the body
