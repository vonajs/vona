# Demo Playground

Vona provides a Demo Playground, which allows us to test the code and verify the ideas very conveniently and quickly

## Steps

### 1. Create a new demo file

We need to create a new source code file: `src/backend/demo/index.ts`. Currently, we do not need to create this file manually, but execute the following command to automatically create the file:

``` bash
$ npm run demo
```

### 2. Write test code

In the file `demo/index.ts`, we write the test code:

``` typescript{2}
export async function main(app: VonaApplication, _argv: IArgv) {
  console.log('server listen: ', app.config.server.listen);
}
```

### 3. Execute demo file

``` bash
$ npm run demo
```

## Example

### 1. Simulate the context object of the request

``` typescript{2-4}
export async function main(app: VonaApplication, _argv: IArgv) {
  await app.bean.executor.mockCtx(async () => {
    // do something in ctx
  });
}
```

### 2. Access the API

For example, we access the home API:

``` typescript{3-4}
export async function main(app: VonaApplication, _argv: IArgv) {
  await app.bean.executor.mockCtx(async () => {
    const homeBody = await app.bean.executor.performAction('get', '//');
    console.log(homeBody); // Hello Vona!
  });
}
```

We can also simulate Chinese ctx and then access the home API:

``` typescript{3-5}
export async function main(app: VonaApplication, _argv: IArgv) {
  await app.bean.executor.mockCtx(async () => {
    const homeBody = await app.bean.executor.performAction('get', '//');
    console.log(homeBody);
  }, { locale: 'zh-cn' }); // 您好, Vona!
}
```

### 3. Simulate signin and signout

``` typescript{3-6}
export async function main(app: VonaApplication, _argv: IArgv) {
  await app.bean.executor.mockCtx(async () => {
    // signin as user: admin
    await app.bean.passport.signinMock();
    // signout
    await app.bean.passport.signout();
  });
}
```