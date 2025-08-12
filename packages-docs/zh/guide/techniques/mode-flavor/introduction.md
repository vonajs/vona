# 运行环境与Flavor

Vona 基于`多维变量`加载 Env 环境变量和 Config 配置，从而提供更加灵活的配置机制，支持更复杂的业务场景

那么，这个`多维变量`就是`运行环境`与`Flavor`

## 运行环境

Vona 提供了三个运行环境：

* test：测试环境
* dev：开发环境
* prod：生成环境

### 1. 启动运行环境

通过执行不同的命令启动相应的运行环境

``` bash
# test
$ npm run test
$ npm run cov
$ npm run db:reset
# dev
$ npm run dev
$ npm run dev:one
# prod
$ npm run start
$ npm run start:one
$ npm run start:docker
```

### 2. 如何判断当前运行环境

* 通过 Env 来判断

``` typescript
process.env.META_MODE === 'test'
process.env.META_MODE === 'dev'
process.env.META_MODE === 'prod'
```

* 通过 Config 来判断

``` typescript
app.config.meta.mode === 'test'
app.config.meta.mode === 'dev'
app.config.meta.mode === 'prod'
```

简化写法

``` typescript
app.meta.isTest
app.meta.isDev
app.meta.isProd
```
