English | [简体中文](./README.zh-CN.md)

# Vona

Vona is an intuitive, elegant and powerful Node.js framework for rapidly developing enterprise applications of any size

[![LICENSE MIT][license-image]][license-url]
[![NPM version][npm-image]][npm-url]
[![Test coverage][cov-image]][cov-url]
[![NPM download][download-image]][download-url]

[license-image]: https://img.shields.io/badge/license-MIT-blue.svg
[license-url]: https://github.com/vonajs/vona/blob/master/LICENSE
[npm-image]: https://img.shields.io/npm/v/vona.svg?style=flat-square
[npm-url]: https://npmjs.com/package/vona
[cov-image]: https://img.shields.io/codecov/c/github/vonajs/vona.svg?style=flat-square
[cov-url]: https://app.codecov.io/github/vonajs/vona
[download-image]: https://img.shields.io/npm/dm/vona?color=orange&label=npm%20downloads
[download-url]: https://npmjs.com/package/vona

## Documentation

- [Get Started](https://vona.js.org/guide/start/introduction.html)

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

## Preparation

1. Install command-line tools

``` bash
$ pnpm add -g tsx@latest
$ pnpm add -g vona-cli@latest
```

2. Install Vscode extension: [Vona - Official](https://marketplace.visualstudio.com/items?itemName=cabloy.vona-vscode)

This extension provides a large number of menus for quickly creating code skeletons for various resources

## Quick Start

1. Create Project

``` bash
$ vona :create:project projectName
$ cd projectName
```

2. Modify .env file

`env/.env`:

``` bash
# database
DATABASE_DEFAULT_CLIENT = 'pg' # pg/mysql
DATABASE_CLIENT_PG_PASSWORD =
DATABASE_CLIENT_MYSQL_PASSWORD =

# redis
REDIS_DEFAULT_PASSWORD =
```

3. Start Dev Server

``` bash
$ npm run dev
```

4. Unit test

``` bash
$ npm run test
```

5. Build

``` bash
$ npm run build
```

## Docker Compose

``` bash
$ npm run build:docker
$ sudo docker-compose build
$ sudo docker-compose up
```

## Stay In Touch

- [Twitter](https://x.com/zhennann2024)
- [Bilibili](https://space.bilibili.com/454737998)

## License

[MIT](./LICENSE)

Copyright (c) 2016-present, Vona
