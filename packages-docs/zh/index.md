---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 'Vona'
  text: '是一款全栈元框架'
  tagline: 可在同一个代码库中实现SSR/SPA/Web网站/Admin中后台
  actions:
    - theme: brand
      text: 快速开始
      link: /zh/guide/start/introduction
    - theme: alt
      text: 演示
      link: https://cabloy.com/admin
    - theme: alt
      text: GitHub
      link: https://github.com/vonajs/vona

features:
  - title: 全栈能力
    details: 可在同一个代码库中实现SSR/SPA/Web网站/Admin中后台
  - title: Admin中后台支持SSR
    details: 对`Admin中后台`应用提供了完整的 SSR 支持，`侧边栏`、`多语言`、`明暗主题`、`品牌色主题`等界面元素均支持 SSR，当再次刷新页面时，显著减少界面跳动，提升用户交互体验
  - title: CRUD动态渲染
    details: 可动态渲染CRUD的列表页、条目页、搜索表单，并且提供了Tanstack Table/Tanstack Form/Tanstack Query的最佳实践
  - title: DTO动态推断与生成
    details: 首创 DTO 动态推断与生成能力，解放我们的双手，显著提升生产力。甚至可以说，对于构建更加优雅的 Node.js 后端框架而言，能够动态推断与生成 DTO，是非常重要的`里程碑`
  - title: 双层页签导航
    details: 首创双层页签导航，可以更加便捷的在多个页面中切换
  - title: IOC & AOP
    details: 优先使用`依赖查找`策略，从而使用更少的装饰器函数，使用更少的类型标注，从而让 IOC 容器更加简洁、直观
  - title: 多租户
    details: 内置了开箱即用的多租户能力，同时支持共享模式和独立模式
  - title: 多数据库、多数据源
    details: 支持多数据库、多数据源，还提供了开箱即用的读写分离和动态数据源能力
  - title: 菜单命令
    details: 通过菜单来执行 Cli 命令，从而显著降低心智负担，提升开发体验
---
