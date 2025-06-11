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
    details: The IOC container provided by Zova has a clearer concept and more powerful functions, which is a powerful tool for the development of large-scale business systems
  - title: AOP
    details: AOP
  - title: Multi-tenants
    details: Multi-tenants
  - title: Modularization
    details: In a large web business system, as the business grows and changes, it is also necessary to divide the system into relatively independent modules in order to avoid code bloating. This is why Zova introduces modularization. In Zova, a module is a natural bundle boundary, and automatically bundled into an independent asynchronous chunk when building, bidding farewell to the hassle of Vite configuration and effectively avoiding the fragmentation of bundles. Especially in large business systems, this advantage is particularly evident
---
