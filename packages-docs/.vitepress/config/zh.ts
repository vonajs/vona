import type { DefaultTheme } from 'vitepress';
import { defineConfig } from 'vitepress';

export const zh = defineConfig({
  lang: 'zh-CN',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/zh/guide/start/introduction', activeMatch: '/zh/guide/' },
      { text: 'Cabloy', link: '/zh/cabloy/introduction', activeMatch: '/zh/cabloy/' },
    ],
    sidebar: {
      '/zh/guide/': { base: '/zh/guide/', items: sidebarGuide() },
      '/zh/cabloy/': { base: '/zh/cabloy/', items: sidebarCabloy() },
    },
    footer: {
      message: '基于 MIT 许可发布',
      copyright: '版权所有 © 2016-present Vona',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vonajs/vona' },
      { icon: 'x', link: 'https://twitter.com/zhennann2024' },
      { icon: 'youtube', link: 'https://www.youtube.com/@cabloyjs' },
    ],
  },
});

function sidebarCabloy(): DefaultTheme.SidebarItem[] {
  return [
    { text: '介绍', link: 'introduction' },
    { text: '动态数据源', link: 'dynamic-datasource' },
    { text: '读写分离', link: 'sharding' },
  ];
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '开始',
      items: [
        { text: '简介', link: 'start/introduction' },
        { text: '快速上手', link: 'start/quick-start' },
        { text: '创建第一个CRUD API', link: 'start/first-crud' },
        { text: 'Cli命令', link: 'start/cli' },
        { text: '菜单命令', link: 'start/menu' },
        { text: 'Scripts', link: 'start/scripts' },
        { text: 'Demo练习场', link: 'start/demo' },
        { text: '框架升级', link: 'start/update' },
        { text: '测试模块', link: 'start/test-vona' },
      ],
    },
    {
      collapsed: true,
      text: '基础',
      items: [
        {
          text: '模块化体系',
          base: '/zh/guide/essentials/modularization/',
          collapsed: true,
          items: [
            { text: '模块', link: 'module' },
            { text: '套件', link: 'suite' },
            { text: '目录结构', link: 'directory-structure' },
            { text: 'package.json', link: 'package' },
          ],
        },
        {
          text: 'IOC容器',
          base: '/zh/guide/essentials/ioc/',
          collapsed: true,
          items: [
            { text: '简介', link: 'introduction' },
            { text: 'Bean标识', link: 'bean-identifier' },
            { text: '创建Bean', link: 'bean-create' },
            { text: '依赖注入', link: 'dependency-injection' },
            { text: '依赖查找', link: 'dependency-lookup' },
            { text: '依赖查找(API)', link: 'inject-api' },
            { text: 'BeanBase基类', link: 'bean-base' },
          ],
        },
        {
          text: '模块Scope',
          base: '/zh/guide/essentials/scope/',
          collapsed: true,
          items: [
            { text: '简介', link: 'introduction' },
            { text: 'Config配置', link: 'config' },
            { text: 'Constant常量', link: 'constant' },
            { text: 'I18n国际化', link: 'locale' },
            { text: 'Error错误异常', link: 'error' },
            { text: 'Service', link: 'service' },
            { text: 'Model', link: 'model' },
            { text: 'Entity', link: 'entity' },
          ],
        },
        {
          text: 'API',
          base: '/zh/guide/essentials/api/',
          collapsed: true,
          items: [
            { text: '创建CRUD', link: 'crud' },
            { text: 'Controller', link: 'controller' },
            { text: 'Service', link: 'service' },
            { text: 'Model', link: 'model' },
            { text: 'Entity', link: 'entity' },
            { text: 'Dto', link: 'dto' },
            { text: '迁移与变更', link: 'version' },
            { text: '字段索引', link: 'field-index' },
            { text: '单元测试', link: 'unit-test' },
          ],
        },
      ],
    },
    {
      collapsed: true,
      text: 'AOP编程',
      items: [
        {
          text: '介绍',
          base: '/zh/guide/aop/',
          link: 'introduction',
        },
        {
          text: '控制器切面',
          base: '/zh/guide/aop/controller/',
          collapsed: true,
          items: [
            {
              text: 'Middleware',
              items: [
                { text: '局部中间件', link: 'middleware-local' },
                { text: '全局中间件', link: 'middleware-global' },
                { text: '系统中间件', link: 'middleware-system' },
                { text: '内置中间件', link: 'middleware-builtin' },
              ],
            },
            {
              text: 'Guard',
              items: [
                { text: '局部守卫', link: 'guard-local' },
                { text: '全局守卫', link: 'guard-global' },
                { text: '内置守卫', link: 'guard-builtin' },
              ],
            },
            {
              text: 'Interceptor',
              items: [
                { text: '局部拦截器', link: 'interceptor-local' },
                { text: '全局拦截器', link: 'interceptor-global' },
                { text: '内置拦截器', link: 'interceptor-builtin' },
              ],
            },
            {
              text: 'Pipe',
              items: [
                { text: '局部管道', link: 'pipe-local' },
                { text: '全局管道', link: 'pipe-global' },
                { text: '参数管道', link: 'pipe-argument' },
                { text: 'Zod整合', link: 'pipe-zod' },
              ],
            },
            {
              text: 'Filter',
              items: [
                { text: '内置过滤器', link: 'filter-builtin' },
                { text: '局部过滤器', link: 'filter-local' },
                { text: '全局过滤器', link: 'filter-global' },
              ],
            },
          ],
        },
        {
          text: '内部切面',
          base: '/zh/guide/aop/internal/',
          collapsed: true,
          items: [
            { text: 'AOP Method', link: 'aop-method' },
            { text: '魔术方法', link: 'magic-method' },
            { text: '内置切面', link: 'builtin' },
          ],
        },
        {
          text: '外部切面',
          base: '/zh/guide/aop/external/',
          link: 'introduction',
        },
      ],
    },
    {
      collapsed: true,
      text: '技术',
      items: [
        {
          text: '运行环境与Flavor',
          base: '/zh/guide/techniques/mode-flavor/',
          link: 'introduction',
        },
        {
          text: 'Env环境变量',
          base: '/zh/guide/techniques/env/',
          link: 'introduction',
        },
        {
          text: 'Config配置',
          base: '/zh/guide/techniques/config/',
          link: 'introduction',
        },
        {
          text: '多实例/多租户',
          base: '/zh/guide/techniques/instance/',
          link: 'introduction',
        },
        {
          text: 'Vona ORM',
          base: '/zh/guide/techniques/orm/',
          collapsed: true,
          items: [
            { text: '介绍', link: 'introduction' },
            { text: '数据源配置', link: 'config-datasource' },
            { text: 'ORM配置', link: 'config-orm' },
            { text: '数据库策略', link: 'strategy' },
            { text: 'ORM基础', link: 'basics' },
            { text: 'CRUD(查询)', link: 'crud-select' },
            { text: 'CRUD(插入/更新/删除)', link: 'crud-cud' },
            { text: 'CRUD(魔术方法)', link: 'crud-magic' },
            { text: '数据库事务', link: 'transaction' },
            { text: '静态关系', link: 'relations-static' },
            { text: '动态关系', link: 'relations-dynamic' },
            { text: '聚合与分组', link: 'aggr-group' },
            { text: '基于关系的聚合', link: 'relations-aggr' },
            { text: '基于关系的分组', link: 'relations-group' },
            { text: '缓存', link: 'caching' },
            {
              text: 'DTO推断与生成',
              base: '/zh/guide/techniques/orm/dto/',
              collapsed: true,
              items: [
                { text: '介绍', link: 'introduction' },
                { text: '$Dto.get', link: 'get' },
                { text: '$Dto.selectAndCount', link: 'selectAndCount' },
                { text: '$Dto.query/DtoQueryBase', link: 'query' },
                { text: '$Dto.queryPage/DtoQueryPageBase', link: 'query-page' },
                { text: '$Dto.create', link: 'create' },
                { text: '$Dto.update', link: 'update' },
                { text: '$Dto.aggregate', link: 'aggregate' },
                { text: '$Dto.group', link: 'group' },
              ],
            },
            {
              text: '高级特性',
              base: '/zh/guide/techniques/orm/advanced/',
              collapsed: true,
              items: [
                { text: '多数据库/多数据源', link: 'multi-database' },
                { text: '分表', link: 'table-partitioning' },
                { text: '动态数据源', link: 'dynamic-datasource' },
                { text: '读写分离', link: 'sharding' },
              ],
            },
          ],
        },
        {
          text: '参数校验',
          base: '/zh/guide/techniques/validation/',
          collapsed: true,
          items: [
            { text: '参数校验', link: 'introduction' },
            { text: 'Zod Refine', link: 'zod-refine' },
            { text: 'Zod Transform', link: 'zod-transform' },
          ],
        },
        {
          text: 'Swagger/Openapi',
          base: '/zh/guide/techniques/openapi/',
          link: 'introduction',
        },
      ],
    },
    {
      text: '资源',
      items: [
        { text: '常见问题', link: 'resources/faq' },
        { text: '视频', link: 'resources/videos' },
        { text: '文章', link: 'resources/articles' },
      ],
    },
    { text: '致谢', link: 'others/thanks' },
    { text: 'License', link: 'others/license' },
  ];
}
