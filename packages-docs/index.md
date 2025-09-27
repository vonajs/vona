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
    details: Provides more complete Aop programming capabilities, including controller aspect, inner aspect, and outer aspect
  - title: Multi-tenancy
    details: Built-in out-of-the-box multi-tenancy capabilities, supporting both shared and isolated modes
  - title: Modularization
    details: In a large web business system, as the business grows and changes, it is also necessary to divide the system into relatively independent modules in order to avoid code bloating
---
