# Env环境变量

Vona 通过`process.env`暴露环境变量

Vona 基于多维变量加载环境文件，从而提供更加灵活的配置机制，支持更复杂的业务场景

## meta与.env文件

Zova 使用[dotenv](https://github.com/motdotla/dotenv)从`env`目录中加载下列文件中的环境变量：

```txt
.env                # 所有情况下都会加载
.env.[meta]         # 只在指定条件下加载
.env.mine           # 所有情况下都会加载，但会被 git 忽略
.env.[meta].mine    # 只在指定条件下加载，但会被 git 忽略
```

- `[meta]`可以是以下两个字段值的`任意组合`，从而支持基于多维变量的加载机制

| 名称    | 类型                                                                                 |
| ------- | ------------------------------------------------------------------------------------ |
| mode    | 'test' \|'dev' \| 'prod'                                             |
| flavor  | 'normal' \|'docker' \| 'ci' \| keyof VonaMetaFlavorExtend                                                    |

## npm scripts

与多维变量相对应，命令行与脚本对应关系如下：

```bash
$ npm run test
$ npm run dev
$ npm run build
$ npm run build:docker
```

``` json
"scripts": {
  "test": "vona :bin:test --flavor=normal",
  "dev": "vona :bin:dev --flavor=normal",
  "build": "vona :bin:build --flavor=normal",
  "build:docker": "vona :bin:build --flavor=docker", 
}
```

### 举例

在命令行执行`npm run dev`，那么，对应的 meta 变量值是：

| 名称    | 值            |
| ------- | ------------- |
| mode    | 'dev' |
| flavor  | 'normal'       |

系统就会自动依次加载下列文件中的环境变量，并进行合并:

```txt
.env
.env.normal
.env.normal.dev
.env.mine
.env.normal.mine
.env.normal.dev.mine
```

## 内置环境变量

为了进一步实现开箱即用的效果，Vona 提供了若干内置的环境变量：

### meta

| 名称          | 说明          |
| ------------- | ------------- |
| META_MODE     | mode          |
| META_FLAVOR   | flavor        |
| NODE_ENV      | 等于META_MODE |

### 应用

| 名称            | 说明                                                                                     |
| --------------- | ---------------------------------------------------------------------------------------- |
| APP_NAME        | 应用名称                                                                                 |
| APP_TITLE       | 应用标题                                                                                 |
| APP_VERSION     | 应用版本                                                                                 |

### 构建

| 名称          | 说明             |
| ------------- | ---------------- |
| BUILD_OUTDIR  | 指定输出目录     |
|BUILD_SOURCEMAP| Sourcemap|
| BUILD_MINIFY  | 是否最小化       |
|BUILD_COPY_DIST|将dist拷贝至指定目录|
|BUILD_COPY_RELEASE|将dist-releases拷贝至指定目录|

### 套件/模块

| 名称                     | 说明           |
| ------------------------ | -------------- |
| PROJECT_DISABLED_MODULES | 禁用的模块清单 |
| PROJECT_DISABLED_SUITES  | 禁用的套件清单 |

### database

Vona 支持多数据库。为了开箱即用，提供了两个数据源的定义：`pg`/`mysql`，默认数据源是`pg`

| 名称                     | 说明           |
| ------------------------ | -------------- |
| DATABASE_DEFAULT_CLIENT | 默认使用的数据源 |

* pg 配置

| 名称                     | 说明           |
| ------------------------ | -------------- |
| DATABASE_CLIENT_PG_HOST  |  |
| DATABASE_CLIENT_PG_PORT |  |
| DATABASE_CLIENT_PG_USER  |  |
| DATABASE_CLIENT_PG_PASSWORD |  |
| DATABASE_CLIENT_PG_DATABASE  |  |

* mysql 配置

| 名称                     | 说明           |
| ------------------------ | -------------- |
| DATABASE_CLIENT_MYSQL_HOST |  |
|  DATABASE_CLIENT_MYSQL_PORT |  |
| DATABASE_CLIENT_MYSQL_USER |  |
|  DATABASE_CLIENT_MYSQL_PASSWORD |  |
| DATABASE_CLIENT_MYSQL_DATABASE |  |

### redis

| 名称                     | 说明           |
| ------------------------ | -------------- |
|REDIS_DEFAULT_HOST||
|REDIS_DEFAULT_PORT||
|REDIS_DEFAULT_PASSWORD||
|REDIS_DEFAULT_DB||
