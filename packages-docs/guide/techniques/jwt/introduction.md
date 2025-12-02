# JWT

VonaJS provides a powerful and flexible JWT based on [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)

## App Config

JWT configuration can be modified in the App Config:

`src/backend/config/config/config.ts`

``` typescript
// modules
config.modules = {
  'a-jwt': {
    tempAuthToken: {
      signOptions: { expiresIn: 5 * 60 },
    },
    base: {
      secret: undefined,
      signOptions: { issuer: env.APP_NAME },
      verifyOptions: { issuer: env.APP_NAME },
    },
    clients: {
      access: {
        signOptions: { expiresIn: 2 * 60 * 60 },
      },
      refresh: {
        signOptions: { expiresIn: 7 * 24 * 60 * 60 },
      },
    },
  },
};
```

|Name|Description|
|--|--|
|tempAuthToken|Configuration for temporary accessToken|
|base|Basic configuration, providing common base settings for all Clients|
|clients|Configures multiple Clients. The system provides built-in `access/refresh` Clients for generating `accessToken/refreshToken`|

- `signOptions`: see: [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)

