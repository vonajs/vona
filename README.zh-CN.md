简体中文 | [English](./README.md)

# Vona 是什么

Vona 是一款全栈元框架，可在同一个代码库中实现`SSR/SPA/Web网站/Admin中后台`

* 首创 DTO 动态推断与生成能力，解放我们的双手，显著提升生产力。甚至可以说，对于构建更加优雅的 Node.js 后端框架而言，能够动态推断与生成 DTO，是非常重要的`里程碑`
* 首创双层页签导航 UI/UX，可以更加便捷的在多个页面中切换
* 可动态渲染 CRUD 的列表页、条目页、搜索表单，并且提供了`Tanstack Table/Tanstack Form/Tanstack Query`的最佳实践

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

## 全栈原理

Vona 与 Zova 完美协同，延续前后端分离的架构风格。采用 Zova 构建的前端项目，既可以独立运行，也可以将 JS bundle 放入 Vona 后端，在后端直接进行 SSR 渲染

  * Vona 可以生成完整的 Openapi Schema，从而在 Zova 中生成 Api SDK
  * Zova 可以生成路由和组件的类型，从而在 Vona 中提供类型提示

## 文档

- [文档](https://vona.js.org/zh/guide/start/introduction.html)

## 在线演示

使用同一套代码实现 Cabloy Store 的`Web网站`和`Admin中后台`

* Web 网站：[https://cabloy.com](https://cabloy.com)
* Admin 中后台：[https://cabloy.com/admin](https://cabloy.com/admin)

## 动图演示

* 首创双层页签导航 UI/UX

![](./packages-docs/zh/assets/img/start/cabloy-start-two-level-tabs.gif)

## 联系方式

- [Twitter](https://x.com/zhennann2024)
- [B站：濮水代码](https://space.bilibili.com/454737998)

## License

[MIT](./LICENSE)

Copyright (c) 2016-present, Vona
