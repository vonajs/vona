# Bean Scene

Vona 提供了一组装饰器函数，用于声明 Bean Class 是可注入的，不同的装饰器函数代表不同的使用场景

| 名称                 | 说明                     | Scene               | 归属模块        |
| -------------------- | ------------------------ | ------------------- | --------------- |
| @Bean                | Global Service Bean      | bean                | a-bean          |
| @Service             | Service Bean             | service             | a-bean          |
| @SocketConnection    | SocketConnection Bean    | socketConnection    | a-socket        |
| @SocketNamespace     | SocketNamespace Bean     | socketNamespace     | a-socket        |
| @SocketPacket        | SocketPacket Bean        | socketPacket        | a-socket        |
| @SsrMenu             | SsrMenu Bean             | ssrMenu             | a-ssr           |
| @SsrMenuGroup        | SsrMenuGroup Bean        | ssrMenuGroup        | a-ssr           |
| @SsrSite             | SsrSite Bean             | ssrSite             | a-ssr           |
| @CaptchaProvider     | CaptchaProvider Bean     | captchaProvider     | a-captcha       |
| @CaptchaScene        | CaptchaScene Bean        | captchaScene        | a-captcha       |
| @Aop                 | Aop Bean                 | aop                 | a-aspect        |
| @AopMethod           | AopMethod Bean           | aopMethod           | a-aspect        |
| @Filter              | Filter Bean              | filter              | a-aspect        |
| @Guard               | Guard Bean               | guard               | a-aspect        |
| @Interceptor         | Interceptor Bean         | interceptor         | a-aspect        |
| @Middleware          | Middleware Bean          | middleware          | a-aspect        |
| @MiddlewareSystem    | MiddlewareSystem Bean    | middlewareSystem    | a-aspect        |
| @Pipe                | Pipe Bean                | pipe                | a-aspect        |
| @Broadcast           | Broadcast Bean           | broadcast           | a-broadcast     |
| @CacheMem            | CacheMem Bean            | cacheMem            | a-cache         |
| @CacheRedis          | CacheRedis Bean          | cacheRedis          | a-cache         |
| @Event               | Event Bean               | event               | a-event         |
| @EventListener       | EventListener Bean       | eventListener       | a-event         |
| @Hmr                 | Hmr Bean                 | hmr                 | a-hmrbase       |
| @Meta                | Meta Bean                | meta                | a-meta          |
| @DatabaseDialect     | DatabaseDialect Bean     | databaseDialect     | a-orm           |
| @Entity              | Entity Bean              | entity              | a-orm           |
| @Model               | Model Bean               | model               | a-orm           |
| @Queue               | Queue Bean               | queue               | a-queue         |
| @Schedule            | Schedule Bean            | schedule            | a-schedule      |
| @SerializerTransform | SerializerTransform Bean | serializerTransform | a-serialization |
| @Startup             | Startup Bean             | startup             | a-startup       |

- a-action

| 名称    | 说明        | Scene  | 默认注入范围 |
| ------- | ----------- | ------ | ------------ |
| @Action | Action Bean | action | sys          |

- a-api

| 名称       | 说明           | Scene     | 默认注入范围 |
| ---------- | -------------- | --------- | ------------ |
| @Api       | Api Bean       | api       | app          |
| @ApiMeta   | ApiMeta Bean   | apiMeta   | app          |
| @ApiSchema | ApiSchema Bean | apiSchema | app          |

- a-behavior

| 名称      | 说明          | Scene    | 默认注入范围 |
| --------- | ------------- | -------- | ------------ |
| @Behavior | Behavior Bean | behavior | new          |

- a-fetch

| 名称         | 说明             | Scene       | 默认注入范围 |
| ------------ | ---------------- | ----------- | ------------ |
| @Interceptor | Interceptor Bean | interceptor | new          |

- a-meta

| 名称  | 说明      | Scene | 默认注入范围 |
| ----- | --------- | ----- | ------------ |
| @Meta | Meta Bean | meta  | app          |

- a-model

| 名称   | 说明                                                 | Scene | 默认注入范围 |
| ------ | ---------------------------------------------------- | ----- | ------------ |
| @Model | [Model Bean](../../techniques/model/introduction.md) | model | ctx          |

- a-style

| 名称   | 说明                                              | Scene | 默认注入范围 |
| ------ | ------------------------------------------------- | ----- | ------------ |
| @Css   | [Css Bean](../../techniques/css-in-js/css.md)     | css   | app          |
| @Theme | [Theme Bean](../../techniques/css-in-js/theme.md) | theme | app          |

- a-table

| 名称       | 说明           | Scene     | 默认注入范围 |
| ---------- | -------------- | --------- | ------------ |
| @TableCell | TableCell Bean | tableCell | sys          |
