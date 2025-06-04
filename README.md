English | [简体中文](./README.zh-CN.md)

# Vona

Vona is an intuitive, elegant and powerful Node.js framework for rapidly developing enterprise applications of any size

[![LICENSE MIT][license-image]][license-url]
[![NPM version][npm-image]][npm-url]
[![NPM download][download-image]][download-url]

[license-image]: https://img.shields.io/badge/license-MIT-blue.svg
[license-url]: https://github.com/vonajs/vona/blob/master/LICENSE
[npm-image]: https://img.shields.io/npm/v/vona.svg?style=flat-square
[npm-url]: https://npmjs.com/package/vona
[download-image]: https://img.shields.io/npm/dm/vona?color=orange&label=npm%20downloads
[download-url]: https://npmjs.com/package/vona

## Features

[Click here](https://juejin.cn/post/7509709812857110582)

## Technology Stack

|Name|Version|
|--|--|
|Nodejs| >=24.1.0 |
|Typescript| >=5.7.3 |
|Koa|>=3.0.0|
|Redis|>=7.2.6|
|MySQL|>=8|
|Postgresql|>=17|

* Redis: Required
* MySQL/Postgresql: Choose what you want to use

## Quick Start

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

## Stay In Touch

- [Twitter](https://x.com/zhennann2024)
- [Bilibili](https://space.bilibili.com/454737998)

## License

[MIT](./LICENSE)

Copyright (c) 2016-present, Vona