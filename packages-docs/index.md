---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 'Vona'
  text: 'A fullstack meta-framework'
  tagline: For building SSR/SPA/Admin/Front all in one codebase
  actions:
    - theme: brand
      text: Get Started
      link: /guide/start/introduction
    - theme: alt
      text: GitHub
      link: https://github.com/vonajs/vona

features:
  - title: Fullstack
    details: Building SSR/SPA/Admin/Front all in one codebase. The Admin backend also supports SSR, and the code is intuitive and elegant
  - title: CRUD Dynamic Rendering
    details: Dynamically render CRUD list pages, item pages, and search forms, and provides the best practices of Tanstack Table/Tanstack Form/Tanstack Query
  - title: DTO Infer & Generation
    details: Pioneers dynamic DTO inference and generation capabilities, significantly improving development efficiency and experience
  - title: Dual-layer Tabs
    details: Pioneers dual-layer tabs navigation design, allowing more convenient switching between multiple pages
  - title: IOC & AOP
    details: Recommended to use the `dependency lookup` strategy, so as to use fewer decorator functions and fewer type annotations, making the IOC container more concise and intuitive
  - title: Multi-tenancy
    details: Built-in out-of-the-box multi-tenancy capabilities, supporting both shared and isolated modes
  - title: Multi-database & Multi-datasource
    details: Supports multi-database and multi-datasource, and provides out-of-the-box read-write splitting and dynamic datasource capabilities

  - title: Menu Commands
    details: Execute Cli commands through the menus, significantly reducing mental overhead and improving the development experience
---
