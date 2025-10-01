# Introduction

## What is Vona?

Vona is an intuitive, elegant and powerful Node.js web framework for rapidly developing enterprise applications of any size. It pioneers dynamic DTO inference and generation capabilities, significantly improving development efficiency and experience

## Philosophy

### 1. About Coding

Many frameworks use the simplest use cases to demonstrate design elegance, ignoring the coding challenges presented by business complexity. As business grows and changes, project code quickly degrades and becomes difficult to maintain. Vona, however, addresses the complexity of large-scale businesses and proposes a series of engineering solutions. This allows us to maintain elegant and intuitive code even when developing large-scale business systems, improving development efficiency and experience while facilitating subsequent code iteration and maintenance

### 2. About Performance

Many frameworks use the simplest use cases to demonstrate high performance, ignoring the performance challenges presented by business complexity. As business grows and changes, project performance plummets, and various optimization and mitigation measures lead to cumbersome and lengthy code. Vona, however, addresses the complexity of large-scale businesses and incorporates caching strategies into the framework's core, implementing mechanisms such as `two-layer cache`, `query cache`, and `entity cache`. This makes it easy to develop large-scale business systems, ensuring that code remains elegant and intuitive

## Features

* `Developed in TypeScript`: Provides comprehensive TypeScript type hints
* `Using ESM modules throughout`: Faster project startup
* `Complete modular system`: Module-based business segmentation makes code more cohesive and easier to reuse and share
* `IOC container and dependency lookup`: We recommend using `dependency lookup` to obtain bean instances directly from the container, making code writing more intuitive and elegant
* `Universal bean configuration capabilities`: All options of bean classes can be modified in App Config, significantly improving the scalability of the entire system and saving a large amount of configuration-related code
* `Bean global singleton`: `Async Local Storage` is used under the hood to implement a complete global singleton mechanism, ensuring very low memory usage and significantly improving garbage collection performance
* `Multi-tenancy`: Supports the development of multi-tenancy SaaS systems with a shared database schema, but data generated during operation is isolated
* `Multi-database and multi-datasource`: Supports multi-database and multi-datasource, and provides out-of-the-box read-write splitting and dynamic datasource capabilities
* `Database Transaction`: Built-in database transaction capabilities and support for transaction propagation mechanisms
* `Dynamic DTO Inference and Generation`: Pioneers dynamic DTO inference and generation capabilities, significantly improving development efficiency and experience
* `Cli Commands`: Provides a large number of Cli commands for generating code skeletons for various resources
* `Menu Commands`: Execute Cli commands through the menus, significantly reducing mental overhead and improving the development experience
* `Configuration Capabilities Based on Multi-Dimensional Variables`: Loads env/config files based on multi-dimensional variables, providing a more flexible configuration mechanism and supporting more complex business scenarios
* `More Comprehensive AOP Programming`: Provides more comprehensive AOP programming capabilities, including controller aspect, internal aspect, and external aspect
* `SSR Integration`: Provides out-of-the-box SSR rendering capabilities, supporting both the frontend website and the backend admin system
* `Demo Playground`: Provides a Demo Playground, which allows us to test the code and verify the ideas very conveniently and quickly

## Technology Stack

|Name|Version|
|--|--|
|Nodejs| >=24.8.0 |
|Typescript| >=5.7.3 |
|Koa|>=3.0.0|
|Redis|>=7.2.6|
|MySQL|>=8|
|Postgresql|>=17|

* `Redis`: VonaJS provides the following capabilities based on Redis:
  - `Queue, Schedule, Startup, Broadcast, Caching, Two-layer cache, and Redlock`
* `MySQL/Postgresql`: Choose what you want to use

## Stay In Touch

- [Twitter](https://x.com/zhennann2024)
- [Bilibili](https://space.bilibili.com/454737998)

## License

MIT License

Copyright (c) 2016-present, Vona
