---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 'Vona'
  text: '一款更直观的Node.js框架'
  tagline: Vona是一款直观、优雅、强大的Node.js框架，用于快速开发任何规模的企业级应用
  actions:
    - theme: brand
      text: 快速开始
      link: /zh/guide/start/introduction
    - theme: alt
      text: Github
      link: https://github.com/vonajs/vona

features:
  - title: IOC容器
    details: Zova提供的IOC容器概念更加清晰，功能更加强大，是应对大型业务系统开发的利器
  - title: AOP
    details: AOP  
  - title: 多租户
    details: 多租户   
  - title: 模块化体系
    details: 在一个大型的 Web 业务系统当中，随着业务的增长和变更，为了避免代码失控，有必要将系统拆分为一个个相对独立的模块，这就是 Zova 采用模块化体系的缘由。在 Zova 中，一个模块就是一个天然的拆包边界，在 build 构建时，自动打包成一个独立的异步 Chunk，告别 Vite 配置的烦恼，同时可以有效避免构建产物的碎片化。特别是在大型业务系统中，这种优势尤其明显
---
