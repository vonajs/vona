简体中文 | [English](./README.md)

# Vona 是什么

Vona 是一款直观、优雅、强大的 Node.js Web 框架，用于快速开发任何规模的企业级应用。首创 DTO 动态推断与生成能力，从而显著提升开发效率和开发体验

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

## 架构哲学

### 1. 关于编码

许多框架使用最简短的用例来证明设计是否优雅，而忽略了业务复杂性带来的编码挑战。随着业务的增长和变更，项目代码迅速劣化，难以维护。而 Vona 正视大型业务的复杂性，提出一系列工程化的解决方案，让我们在开发大型业务系统时，一样可以让代码保持优雅、直观，从而提升开发效率和开发体验，更有利于后续代码迭代与维护

### 2. 关于性能

许多框架使用最简短的用例来证明是否高性能，而忽略了业务复杂性带来的性能挑战。随着业务的增长和变更，项目性能就会断崖式下降，各种优化补救方案让项目代码繁杂冗长。而 Vona 正视大型业务的复杂性，从框架核心引入缓存策略，并实现了`二级缓存`、`Query缓存`和`Entity缓存`等机制，轻松应对大型业务系统的开发，可以始终保持代码的优雅和直观

## 文档

- [快速上手](https://vona.js.org/zh/guide/start/quick-start.html)

## 特性

* `基于 Typescript 开发`：提供完备的 Typescript 类型提示
* `全部采用 esm 模块`：使项目启动更快
* `完备的模块化系统`：以模块为基础对业务进行切分，让代码更内聚，复用与分享更容易
* `IOC 容器与依赖查找`：推荐使用`依赖查找`，直接从容器中获取 Bean 实例，使代码书写更加直观、优雅
* `通用的 Bean 配置能力`：所有 Bean Class 都可以在 App Config 中修改配置，从而显著提升整个系统的扩展性，也能够节约大量的与配置相关的代码
* `Bean 全局单例`：底层采用`Async Local Storage`实现了完整的全局单例机制，从而让整个系统的内存占用非常低，也能显著改善 gc 的性能
* `多租户`：支持多租户 SAAS 系统的开发，共享数据表架构，但运行中产生的数据是相互隔离的
* `多数据库、多数据源`：支持多数据库、多数据源，还提供了开箱即用的读写分离和动态数据源能力
* `数据库事务`：内置数据库事务能力，支持事务传播机制
* `DTO动态推断与生成`：首创 DTO 动态推断与生成能力，从而显著提升开发效率和开发体验
* `Cli 命令`：提供了大量的 Cli 命令，用于生成各类资源的代码骨架
* `菜单命令`：通过菜单来执行 Cli 命令，从而显著降低心智负担，提升开发体验
* `基于多维变量的配置能力`：基于多维变量加载 Env/Config，从而提供更加灵活的配置机制，支持更复杂的业务场景
* `更完善的 AOP 编程`：提供了更加完善的 AOP 编程能力，包括控制器切面、内部切面、外部切面
* `SSR 整合`：提供了开箱即用的 SSR 渲染能力，同时支持前台网站和后台 admin 系统
* `Demo 练习场`：专门提供了 Demo 练习场，让我们可以非常方便的进行代码演练

## 技术栈

|名称|版本|
|--|--|
|pnpm| >=10.19.0 |
|Nodejs| >=24.8.0 |
|Typescript| >=5.7.3 |
|Koa|>=3.0.0|
|Redis|>=7.2.6|
|MySQL|>=8|
|Postgresql|>=17|

* `Redis`: VonaJS 基于 Redis 提供了以下能力: 
  - `队列、定时任务、启动项、广播、缓存、二级缓存、分布式锁`
* `MySQL/Postgresql`: 选择一个你想用的

## 联系方式

- [Twitter](https://x.com/zhennann2024)
- [B站：濮水代码](https://space.bilibili.com/454737998)

## License

[MIT](./LICENSE)

Copyright (c) 2016-present, Vona
