---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 'Vona'
  text: '一款更直观的Node.js框架'
  tagline: 用于快速开发任何规模的企业级应用
  actions:
    - theme: brand
      text: 快速开始
      link: /zh/guide/start/introduction
    - theme: alt
      text: Github
      link: https://github.com/vonajs/vona

features:
  - title: IOC容器
    details: 优先使用`依赖查找`策略，从而使用更少的装饰器函数，使用更少的类型标注，从而让 IOC 容器更加简洁、直观
  - title: AOP
    details: 提供了更加完善的 AOP 编程能力，包括控制器切面、内部切面、外部切面
  - title: 多租户
    details: 内置了开箱即用的多租户能力，同时支持共享模式和独立模式
  - title: 模块化体系
    details: 在一个大型的 Web 业务系统当中，随着业务的增长和变更，为了避免代码失控，有必要将系统拆分为一个个相对独立的模块
  - title: DTO动态推断与生成
    details: 首创 DTO 动态推断与生成能力，解放我们的双手，显著提升生产力。甚至可以说，对于构建更加优雅的 Node.js 后端框架而言，能够动态推断与生成 DTO，是非常重要的`里程碑`
  - title: 多数据库、多数据源
    details: 支持多数据库、多数据源，还提供了开箱即用的读写分离和动态数据源能力
  - title: SSR 整合
    details: 提供了开箱即用的 SSR 渲染能力，同时支持前台网站和后台 admin 系统
  - title: 菜单命令
    details: 通过菜单来执行 Cli 命令，从而显著降低心智负担，提升开发体验  
---

::: tip
周一至周五`晚8:30`，直播撰写文档，欢迎围观：[B站: 濮水代码](https://space.bilibili.com/454737998)
:::