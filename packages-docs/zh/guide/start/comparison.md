# 与其他框架对比

## 与Next对比

1. Vona 提供了更强大、更完善的后端能力，可以轻松应对大型业务系统的开发
2. Vona 与 Zova 完美协同，延续前后端分离的架构风格。Zova 是一款更直观的前端框架，汲取 Vue3、React 和 Angular 的精华，用于开发优雅、快速、可靠的系统。采用 Zova 构建的前端项目，既可以独立运行，也可以将 JS bundle 放入 Vona 后端，在后端直接进行 SSR 渲染
    * Vona 可以生成完整的 Openapi Schema，从而在 Zova 中生成 Api SDK
    * Zova 可以生成路由和组件的类型，从而在 Vona 中提供类型提示

## 与Nest对比

1. Vona 基于 Zod4 生成统一的 Schema，可用于参数校验、Swagger 文档生成、Form/Table 动态渲染、Response 数据序列化与脱敏处理
2. Vona 首创 DTO 动态推断与生成能力，从而显著提升开发效率和开发体验
3. Vona 内置多租户、多数据库、多数据源等能力，可以轻松应对大型业务系统的开发
4. Vona 提供了更加完善的 AOP 编程能力，包括控制器切面、内部切面、外部切面。而 Nest 只实现了控制器切面

## 与Django Admin对比

1. Vona 采用前后端分离的架构来实现 CRUD。前端采用 Zova，界面更美观、代码更简洁，可以更加自由的定制界面，添加新功能
2. Vona 可在同一个代码库中实现`SSR/SPA/Web网站/Admin中后台`。Admin 中后台也支持 SSR，并且代码直观、优雅
