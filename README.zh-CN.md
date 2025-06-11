简体中文 | [English](./README.md)

# Vona 是什么

Vona是一款直观、优雅、强大的Node.js框架，用于快速开发任何规模的企业级应用

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

## 特性

[Click here](https://juejin.cn/post/7509709812857110582)

## 技术栈

|名称|版本|
|--|--|
|Nodejs| >=24.1.0 |
|Typescript| >=5.7.3 |
|Koa|>=3.0.0|
|Redis|>=7.2.6|
|MySQL|>=8|
|Postgresql|>=17|

* Redis: 必须
* MySQL/Postgresql: 选择一个你想用的

## 准备工作

1. 安装命令行工具

``` bash
$ pnpm add -g tsx@latest
$ pnpm add -g vona-cli@latest
```

2. 安装Vscode插件：[Vona - Official](https://marketplace.visualstudio.com/items?itemName=cabloy.vona-vscode)

该插件提供了大量菜单，用于快速创建各类资源的代码骨架

## 快速开始

1. 创建项目

``` bash
$ vona :create:project projectName
$ cd projectName
```

2. 修改.env文件

`env/.env`:

``` bash
# database
DATABASE_DEFAULT_CLIENT = 'pg' # pg/mysql
DATABASE_CLIENT_PG_PASSWORD =
DATABASE_CLIENT_MYSQL_PASSWORD =

# redis
REDIS_DEFAULT_PASSWORD =
```

3. 启动开发服务

``` bash
$ npm run dev
```

4. 单元测试

``` bash
$ npm run test
```

5. 构建

``` bash
$ npm run build
```

## Docker Compose

``` bash
$ npm run build:docker
$ sudo docker-compose build
$ sudo docker-compose up
```

## 联系方式

- [Twitter](https://x.com/zhennann2024)
- [B站：濮水代码](https://space.bilibili.com/454737998)

## License

[MIT](./LICENSE)

Copyright (c) 2016-present, Vona
