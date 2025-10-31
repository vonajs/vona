# 验证码体系

模块`a-captcha`提供了通用的验证码体系，使用`Provider机制`支持各种验证码方式，并且使用`Scene机制`支持不同场景的验证码使用策略

## 特性

* `Provider`：使用`Provider机制`支持各种验证码方式，如：文字图形验证码、短信验证码，等等
* `Scene`：使用`Scene机制`支持不同场景的验证码使用策略。比如，在某个场景下，可以在多个验证码 Provider 中进行轮替，或者根据用户状态使用不同难度的验证码 Provider，等等
* `立即验证`：前端可以对用户输入的验证码进行立即验证。`立即验证`之后在提交表单时仍然要进行`二次验证`
* `表单验证`：前端可以将用户输入的验证码与表单数据一起发往后端验证

## bean.captcha

模块`a-captcha`提供了全局 Bean `bean.captcha`，可以通过统一的方式使用所有 Provider/Scene 提供的验证码能力

模块`a-captchasimple`提供了一个 Provider `a-captchasimple:imageText`，基于[svg-captcha](https://github.com/produck/svg-captcha)实现文字图片的验证码能力

模块`a-captchasimple`提供了一个 Scene `a-captchasimple:simple`。该 Scene 只使用一个 Provider，即`a-captchasimple:imageText`

下面演示如何使用模块`a-captchasimple`提供的验证码能力

### 1. create

``` typescript
// create captcha
const captcha = await this.bean.captcha.create('a-captchasimple:simple');
```

* 返回值类型：`ICaptchaData`

``` typescript
export interface ICaptchaData {
  id: string;
  provider: keyof ICaptchaProviderRecord;
  token?: unknown;
  payload: unknown;
}
```

|名称|说明|
|--|--|
|id|本次验证码数据的id标识|
|provider|本次验证码所使用的Provider名称|
|token|本次验证码数据的token，用于比对用户输入值|
|payload|本次验证码的负载内容，不同的Provider有不同的payload类型|

### 2. refresh

``` typescript
// refresh captcha
const captchaNew = await this.bean.captcha.refresh(captchaId, 'a-captchasimple:simple');
```

- 如果一个 Scene 配置了多个 Provider，那么在刷新 capthca 时可以基于策略选取不同的 Provider

### 3. verify

``` typescript
// verify captcha
const passed = await this.bean.captcha.verify(captchaId, '1234', 'a-captchasimple:simple');
```

### 4. verifyImmediate

前端可以对用户输入的验证码进行`立即验证`。`立即验证`之后在提交表单时仍然要进行`二次验证`

``` typescript
// verifyImmediate captcha
const tokenOrFalse = await this.bean.captcha.verifyImmediate(captchaId, '1234');
```

- 如果立即验证失败，返回`false`
- 如果立即验证成功，返回一个新 token
- 前端需要将新 token 与表单数据一起发往后端进行`二次验证`

## interceptor.captchaVerify

模块`a-captcha`提供了一个局部拦截器`a-captcha:captchaVerify`，可以针对 API 启用验证码校验

`src/suite/a-home/modules/home-user/src/controller/passport.ts`

``` diff
import { Core } from 'vona-module-a-core';

class ControllerPassport {
  @Web.post('login')
+ @Core.captchaVerify({ scene: 'a-captchasimple:simple' })
  async login(@Arg.body() data) {}
}  
```

- `@Core.captchaVerify`: 用于使用局部拦截器`a-captcha:captchaVerify`，传入需要使用的 Scene 名称
- 该拦截器支持`表单验证`和`二次验证`

## Captcha API

模块`a-captcha`提供了一组`开箱即用`的 Captcha API，对`bean.captcha`的能力进行了封装

`src/suite-vendor/a-vona/modules/a-captcha/src/controller/captcha.ts`

|名称|说明|
|--|--|
|create||
|refresh||
|verifyImmediate||

::: tip
为何没有提供`verify`API？

因为`verify`用于被局部拦截器`a-captcha:captchaVerify`调用
:::

## 参数配置

可以在 App Config 中修改模块`a-captcha`的参数配置

``

``` typescript
```