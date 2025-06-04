简体中文 | [English](./README.md)

# Vona 是什么

Vona 是一款直观、优雅、强大的Node.js框架，用于快速开发任何规模的企业级应用

[![LICENSE MIT][license-image]][license-url]
[![NPM version][npm-image]][npm-url]
[![NPM download][download-image]][download-url]

[license-image]: https://img.shields.io/badge/license-MIT-blue.svg
[license-url]: https://github.com/vonajs/vona/blob/master/LICENSE
[npm-image]: https://img.shields.io/npm/v/vona.svg?style=flat-square
[npm-url]: https://npmjs.com/package/vona
[download-image]: https://img.shields.io/npm/dm/vona?color=orange&label=npm%20downloads
[download-url]: https://npmjs.com/package/vona

## 特性

[Click here](https://juejin.cn/post/7509709812857110582)

## 快速开始

1. Clone

``` bash
git clone git@github.com:cabloy/vona-dev.git vona-dev
```

2. Install

``` bash
$ cp package.original.json package.json
$ npm run init
```

3. .env

Modify the `.env` file:

``` bash
# app
APP_NAME = Vona

# database

DATABASE_DEFAULT_CLIENT = 'pg' # pg/mysql

DATABASE_CLIENT_PG_HOST = 127.0.0.1
DATABASE_CLIENT_PG_PORT = 5432
DATABASE_CLIENT_PG_USER = postgres
DATABASE_CLIENT_PG_PASSWORD =
DATABASE_CLIENT_PG_DATABASE = postgres

DATABASE_CLIENT_MYSQL_HOST = 127.0.0.1
DATABASE_CLIENT_MYSQL_PORT = 3306
DATABASE_CLIENT_MYSQL_USER = root
DATABASE_CLIENT_MYSQL_PASSWORD =
DATABASE_CLIENT_MYSQL_DATABASE = mysql

# redis

REDIS_DEFAULT_HOST = 127.0.0.1
REDIS_DEFAULT_PORT = 6379
REDIS_DEFAULT_PASSWORD =
REDIS_DEFAULT_DB = 0
```

4. Start

``` bash
npm run dev
```

## 联系方式

- [Twitter](https://x.com/zhennann2024)
- [B站：濮水代码](https://space.bilibili.com/454737998)

## License

[MIT](./LICENSE)

Copyright (c) 2016-present, Vona