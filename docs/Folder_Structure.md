# Folder structure
> How does our folder structure work on this project?


## Folder `src`

* [controllers](#controllers)
* [docs](#docs)
* [lib](#lib)
* [helper](#helper)
* [service](#service)
* [routes](#routes)
* [app.js](#app)

## Folder `test`

* [integration](#integration)

## Folder `src`

### `controllers`
Contains all controllers subdivided by folder containing their respective validation.<br />

### `docs` to access /api-docs
Have a Swagger structure.

### `lib`
Our custom libraries. 

### `helper`
Our shared libraries.

### `service`
Responsible for exposing all services.

### `routes`
Contains all routes. [Reference](https://martinfowler.com/articles/richardsonMaturityModel.html#level2)

### `app.js`
Expose our express, middleware, routes....

## Folder `test`

### `integration`
All of our integration tests must be in the integration folder and be instantiated within the api.test.js.
It is responsible for mocking an access token generation for each of our tests.

```
For example I have run a test of user:


describe('API', () => {
  beforeEach(() => {
    AuthServer.start();
  });

  afterEach(() => {
    AuthServer.stop();
  });  
  require('./cep');
});

```
