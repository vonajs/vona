# Introduction

## What is Vona?

Vona is a fullstack meta-framework for building `SSR/SPA/Website/Admin-Dashboard` all in one codebase

* Pioneers dynamic DTO inference and generation capabilities, significantly improving development efficiency and experience. It can even be said that being able to dynamically infer and generate DTOs is a very important `milestone` for building a more elegant Node.js backend framework
* Pioneers dual-layer tabs navigation UI/UX, allowing more convenient switching between multiple pages
* Dynamically render CRUD list pages, entry pages, and search forms, and provides the best practices of `Tanstack Table/Tanstack Form/Tanstack Query`

## Fullstack Principles

Vona works perfectly with Zova, continuing the frontend-backend separation architecture. Frontend projects built with Zova can run independently or have their JS bundle copied into the Vona backend for SSR rendering directly on the backend

* Vona can generate a complete Openapi Schema, which can then generate an API SDK in Zova
* Zova can generate types for routes and components to provide type hints in Vona

## Demo online

The Website and Admin-Dashboard of Cabloy Store are built by one codebase

* Website: [https://cabloy.com](https://cabloy.com)
* Admin-Dashboard: [https://cabloy.com/admin](https://cabloy.com/admin)

## GIF Demo

* Pioneers dual-layer tabs navigation UI/UX

![](../../assets/img/start/cabloy-start-two-level-tabs.gif)

## Features

* `Fullstack`: Building `SSR/SPA/Website/Admin-Dashboard` all in one codebase. The Admin-Dashboard also supports SSR with intuitive and elegant code
* `CRUD Dynamic Rendering`: Dynamically render CRUD list pages, entry pages, and search forms, and provides the best practices of `Tanstack Table/Tanstack Form/Tanstack Query`
* `Dynamic DTO Inference and Generation`: Pioneers dynamic DTO inference and generation capabilities, significantly improving development efficiency and experience
* `Dual-layer Tabs UI/UX`: Pioneers dual-layer tabs navigation UI/UX, allowing more convenient switching between multiple pages
* `Developed in TypeScript`: Provides comprehensive TypeScript type hints
* `Using ESM modules throughout`: Faster project startup
* `File-level precise HMR`: Makes the development experience smoother and more efficient
* `Complete modular system`: Module-based business segmentation makes code more cohesive and easier to reuse and share
* `IOC container and dependency lookup`: We recommend using `dependency lookup` to obtain bean instances directly from the container, making code writing more intuitive and elegant
* `Universal bean configuration capabilities`: All options of bean classes can be modified in App Config, significantly improving the scalability of the entire system and saving a large amount of configuration-related code
* `Bean global singleton`: `Async Local Storage` is used under the hood to implement a complete global singleton mechanism, ensuring very low memory usage and significantly improving garbage collection performance
* `Multi-tenancy`: Supports the development of multi-tenancy SaaS systems with a shared database schema, but data generated during operation is isolated
* `Multi-database and multi-datasource`: Supports multi-database and multi-datasource, and provides out-of-the-box read-write splitting and dynamic datasource capabilities
* `Database Transaction`: Built-in database transaction capabilities and support for transaction propagation mechanisms
* `Cli Commands`: Provides a large number of Cli commands for generating code skeletons for various resources
* `Menu Commands`: Execute Cli commands through the menus, significantly reducing mental overhead and improving the development experience
* `Configuration Capabilities Based on Multi-Dimensional Variables`: Loads env/config files based on multi-dimensional variables, providing a more flexible configuration mechanism and supporting more complex business scenarios
* `More Comprehensive AOP Programming`: Provides more comprehensive AOP programming capabilities, including controller aspect, internal aspect, and external aspect
* `Playground`: Provides a Playground, which allows us to test the code and verify the ideas very conveniently and quickly

## Technology Stack

### General

|Name|Version|
|--|--|
|pnpm| >=10.19.0 |
|Nodejs| >=24.8.0 |
|Typescript| >=5.9.3 |

### Backend(Vona)

|Name|Version|
|--|--|
|Koa|>=3.0.0|
|Knex|>=3.1.0|
|Zod|>=4.1.13|
|Redis|>=7.2.6|
|Sqlite3|内置|
|MySQL|>=8|
|Postgresql|>=17|

* `Redis`: VonaJS provides the following capabilities based on Redis:
  - `Queue, Schedule, Startup, Broadcast, Caching, Two-layer cache, and Redlock`
* `Sqlite3`: You need to set up the node-gyp environment in advance to ensure that `better_sqlite3.node` can be compiled properly when installing dependencies

### Frontend(Zova)

|Name|Version|
|--|--|
|Vite|>=7.3.1|
|Vue|>=3.5.6|
|Vue Router|>=4.4.5|
|Zod|>=4.1.13|
|Tanstack Query|>=5.92.5|
|Tanstack Form|>=1.23.5|
|Tanstack Table|>=8.21.3|

### UI Libraries

Zova can be used with any UI library and comes with built-in project templates for several UI libraries, making it easy to use out of the box

|Name|Version|
|--|--|
|daisyui|>=5.3.2|
|tailwindcss|>=4.1.14|
|quasar|>=2.18.1|
|vuetify|>=4.0.1|

## Philosophy

### 1. About Coding

Many frameworks use the simplest use cases to demonstrate design elegance, ignoring the coding challenges presented by business complexity. As business grows and changes, project code quickly degrades and becomes difficult to maintain. Vona, however, addresses the complexity of large-scale businesses and proposes a series of engineering solutions. This allows us to maintain elegant and intuitive code even when developing large-scale business systems, improving development efficiency and experience while facilitating subsequent code iteration and maintenance

### 2. About Performance

Many frameworks use the simplest use cases to demonstrate high performance, ignoring the performance challenges presented by business complexity. As business grows and changes, project performance plummets, and various optimization and mitigation measures lead to cumbersome and lengthy code. Vona, however, addresses the complexity of large-scale businesses and incorporates caching strategies into the framework's core, implementing mechanisms such as `two-layer cache`, `query cache`, and `entity cache`. This makes it easy to develop large-scale business systems, ensuring that code remains elegant and intuitive

## Stay In Touch

- [Twitter](https://x.com/zhennann2024)
- [Bilibili](https://space.bilibili.com/454737998)

## License

MIT License

Copyright (c) 2016-present, Vona
