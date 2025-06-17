# Demo练习场

Vona 提供了一个 Demo 练习场的功能，允许我们非常方便、快捷的对代码做测试，对想法做验证

## 步骤

### 1. 新建demo文件

我们需要新建源码文件：`src/backend/demo/index.ts`。当前，我们并不需要手工创建此文件，而是执行以下命令，自动创建该文件：

``` bash
$ npm run demo
```

### 2. 编写测试代码

在文件`demo/index.ts`中，我们写入测试代码：

``` typescript{2}
export async function main(app: VonaApplication, _argv: IArgv) {
  console.log('server listen: ', app.config.server.listen);
}
```

### 3. 执行demo文件

``` bash
$ npm run demo
```

## 举例

### 1. 模拟请求的上下文环境ctx

``` typescript{2-4}
export async function main(app: VonaApplication, _argv: IArgv) {
  await app.bean.executor.mockCtx(async () => {
    // do something in ctx
  });
}
```

### 2. 访问Api

比如我们访问首页 Api：

``` typescript{3-4}
export async function main(app: VonaApplication, _argv: IArgv) {
  await app.bean.executor.mockCtx(async () => {
    const homeBody = await app.bean.executor.performAction('get', '//');
    console.log(homeBody); // Hello Vona!
  });
}
```

我们也可以模拟中文的 ctx，然后访问首页 Api：

``` typescript{3-5}
export async function main(app: VonaApplication, _argv: IArgv) {
  await app.bean.executor.mockCtx(async () => {
    const homeBody = await app.bean.executor.performAction('get', '//');
    console.log(homeBody); // 您好, Vona!
  }, { locale: 'zh-cn' });
}
```

### 3. 模拟登录和退出登录

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