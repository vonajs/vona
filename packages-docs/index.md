---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 'Vona'
  text: 'A more intuitive Node.js framework'
  tagline: For rapidly developing enterprise applications of any size
  actions:
    - theme: brand
      text: Get Started
      link: /guide/start/introduction
    - theme: alt
      text: Github
      link: https://github.com/vonajs/vona

features:
  - title: IOC Container
    details: Recommended to use the `dependency lookup` strategy, so as to use fewer decorator functions and fewer type annotations, making the IOC container more concise and intuitive
  - title: AOP
    details: Provides more complete Aop programming capabilities, including controller aspect, internal aspect, and external aspect
  - title: Multi-tenancy
    details: Built-in out-of-the-box multi-tenancy capabilities, supporting both shared and isolated modes
  - title: Modularization
    details: In a large web business system, as the business grows and changes, it is also necessary to divide the system into relatively independent modules in order to avoid code bloating
  - title: DTO Infer & Generation
    details: Pioneered the ability to dynamically infer and generate DTOs, freeing our hands and significantly improving productivity. It can even be said that being able to dynamically infer and generate DTOs is a very important `milestone` in building a more elegant Node.js backend framework
  - title: Multi-database & Multi-datasource
    details: Supports multi-database and multi-datasource, and provides out-of-the-box read-write splitting and dynamic datasource capabilities
  - title: SSR Integration
    details: Provides out-of-the-box SSR rendering capabilities, supporting both the frontend website and the backend admin system
  - title: Menu Commands
    details: Execute Cli commands through the menus, significantly reducing mental overhead and improving the development experience
---
