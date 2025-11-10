import type { DefaultTheme } from 'vitepress';
import { defineConfig } from 'vitepress';

export const en = defineConfig({
  lang: 'en-US',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/guide/start/introduction', activeMatch: '/guide/' },
      { text: 'Cabloy', link: '/cabloy/introduction', activeMatch: '/cabloy/' },
    ],
    sidebar: {
      '/guide/': { base: '/guide/', items: sidebarGuide() },
      '/cabloy/': { base: '/cabloy/', items: sidebarCabloy() },
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2016-present Vona',
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
    { text: 'Introduction', link: 'introduction' },
    { text: 'Dynamic Datasource', link: 'dynamic-datasource' },
    { text: 'Sharding', link: 'sharding' },
    { text: 'Github Authentication', link: 'a-authgithub' },
  ];
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Getting Started',
      items: [
        { text: 'Introduction', link: 'start/introduction' },
        { text: 'Quick Start', link: 'start/quick-start' },
        { text: 'Create the first CRUD API', link: 'start/first-crud' },
        { text: 'Cli Commands', link: 'start/cli' },
        { text: 'Menu Commands', link: 'start/menu' },
        { text: 'Scripts', link: 'start/scripts' },
        { text: 'Demo Playground', link: 'start/demo' },
        { text: 'Update', link: 'start/update' },
        { text: 'Test Module', link: 'start/test-vona' },
      ],
    },
    {
      collapsed: true,
      text: 'Environment & Configuration',
      items: [
        {
          text: 'Runtime Environments & Flavor',
          base: '/guide/env-config/mode-flavor/',
          link: 'introduction',
        },
        {
          text: 'Env',
          base: '/guide/env-config/env/',
          link: 'introduction',
        },
        {
          text: 'Config',
          base: '/guide/env-config/config/',
          link: 'introduction',
        },
        {
          text: 'Multi-instance/Multi-tenancy',
          base: '/guide/env-config/instance/',
          link: 'introduction',
        },
        {
          text: 'Database Strategy',
          base: '/guide/env-config/db-strategy/',
          link: 'introduction',
        },
        {
          text: 'App Startup Customization',
          base: '/guide/env-config/app-start/',
          link: 'introduction',
        },
      ],
    },
    {
      collapsed: true,
      text: 'Essentials',
      items: [
        {
          text: 'Modularization',
          base: '/guide/essentials/modularization/',
          collapsed: true,
          items: [
            { text: 'Module', link: 'module' },
            { text: 'Suite', link: 'suite' },
            { text: 'Directory Structure', link: 'directory-structure' },
            { text: 'package.json', link: 'package' },
          ],
        },
        {
          text: 'IOC',
          base: '/guide/essentials/ioc/',
          collapsed: true,
          items: [
            { text: 'Introduction', link: 'introduction' },
            { text: 'Bean Identifier', link: 'bean-identifier' },
            { text: 'Onion Name', link: 'onion-name' },
            { text: 'Create Bean', link: 'bean-create' },
            { text: 'Dependency injection', link: 'dependency-injection' },
            { text: 'Dependency lookup', link: 'dependency-lookup' },
            { text: 'Dependency lookup(API)', link: 'inject-api' },
            { text: 'BeanBase', link: 'bean-base' },
          ],
        },
        {
          text: 'Module Scope',
          base: '/guide/essentials/scope/',
          collapsed: true,
          items: [
            { text: 'Introduction', link: 'introduction' },
            { text: 'Config', link: 'config' },
            { text: 'Constant', link: 'constant' },
            { text: 'I18n', link: 'locale' },
            { text: 'Error Exception', link: 'error' },
            { text: 'Service', link: 'service' },
            { text: 'Model', link: 'model' },
            { text: 'Entity', link: 'entity' },
          ],
        },
        {
          text: 'API',
          base: '/guide/essentials/api/',
          collapsed: true,
          items: [
            { text: 'Create CRUD', link: 'crud' },
            { text: 'Controller', link: 'controller' },
            { text: 'Service', link: 'service' },
            { text: 'Model', link: 'model' },
            { text: 'Entity', link: 'entity' },
            { text: 'Dto', link: 'dto' },
            { text: 'Migration & Changes', link: 'version' },
            { text: 'Field Indexes', link: 'field-index' },
            { text: 'Unit test', link: 'unit-test' },
          ],
        },
      ],
    },
    {
      collapsed: true,
      text: 'AOP Programming',
      items: [
        {
          text: 'Introduction',
          base: '/guide/aop/',
          link: 'introduction',
        },
        {
          text: 'Controller Aspect',
          base: '/guide/aop/controller/',
          collapsed: true,
          items: [
            {
              text: 'Middleware',
              items: [
                { text: 'Local Middleware', link: 'middleware-local' },
                { text: 'Global Middleware', link: 'middleware-global' },
                { text: 'System Middleware', link: 'middleware-system' },
                { text: 'Built-in Middleware', link: 'middleware-builtin' },
              ],
            },
            {
              text: 'Guard',
              items: [
                { text: 'Local Guard', link: 'guard-local' },
                { text: 'Global Global', link: 'guard-global' },
                { text: 'Built-in Guard', link: 'guard-builtin' },
              ],
            },
            {
              text: 'Interceptor',
              items: [
                { text: 'Local Interceptor', link: 'interceptor-local' },
                { text: 'Global Interceptor', link: 'interceptor-global' },
                { text: 'Built-in Interceptor', link: 'interceptor-builtin' },
              ],
            },
            {
              text: 'Pipe',
              items: [
                { text: 'Local Pipe', link: 'pipe-local' },
                { text: 'Global Pipe', link: 'pipe-global' },
                { text: 'Argument Pipe', link: 'pipe-argument' },
                { text: 'Zod Integration', link: 'pipe-zod' },
              ],
            },
            {
              text: 'Filter',
              items: [
                { text: 'Built-in Filter', link: 'filter-builtin' },
                { text: 'Local Filter', link: 'filter-local' },
                { text: 'Global Filter', link: 'filter-global' },
              ],
            },
          ],
        },
        {
          text: 'Internal Aspect',
          base: '/guide/aop/internal/',
          collapsed: true,
          items: [
            { text: 'AOP Method', link: 'aop-method' },
            { text: 'Magic Method', link: 'magic-method' },
            { text: 'Built-in Aspect', link: 'builtin' },
          ],
        },
        {
          text: 'External Aspect',
          base: '/guide/aop/external/',
          link: 'introduction',
        },
      ],
    },
    {
      collapsed: true,
      text: 'Business Abstraction Layer',
      items: [
        {
          text: 'User System',
          base: '/guide/bal/user/',
          collapsed: true,
          items: [
            { text: 'User', link: 'user' },
            { text: 'Role', link: 'role' },
            { text: 'Passport', link: 'passport' },
          ],
        },
        {
          text: 'Authentication System',
          base: '/guide/bal/auth/',
          collapsed: true,
          items: [
            { text: 'Introduction', link: 'introduction' },
            { text: 'a-authsimple', link: 'a-authsimple' },
            { text: 'a-authgithub', link: 'a-authgithub' },
          ],
        },
        {
          text: 'Captcha System',
          base: '/guide/bal/captcha/',
          collapsed: true,
          items: [
            { text: 'Introduction', link: 'introduction' },
            { text: 'Captcha Provider', link: 'captcha-provider' },
            { text: 'Captcha Scene', link: 'captcha-scene' },
          ],
        },
        {
          text: 'Menu System',
          base: '/guide/bal/menu/',
          collapsed: true,
          items: [
            { text: 'Introduction', link: 'introduction' },
            { text: 'SSR Menu', link: 'ssr-menu' },
          ],
        },
      ],
    },
    {
      collapsed: true,
      text: 'Distributed Components',
      base: '/guide/distributed/',
      items: [
        { text: 'Introduction', link: 'introduction' },
        { text: 'Broadcast', link: 'broadcast' },
        {
          text: 'Queue',
          base: '/guide/distributed/queue/',
          collapsed: false,
          items: [
            { text: 'Introduction', link: 'introduction' },
            { text: 'Datasource Level', link: 'db-level' },
            { text: 'Extra Data', link: 'extra-data' },
          ],
        },
        { text: 'Redlock', link: 'redlock' },
        { text: 'Schedule', link: 'schedule' },
        {
          text: 'Startup',
          base: '/guide/distributed/startup/',
          collapsed: false,
          items: [
            { text: 'Introduction', link: 'introduction' },
            { text: 'Built-in Startup', link: 'builtin' },
          ],
        },
      ],
    },
    {
      text: 'Vona ORM',
      base: '/guide/techniques/orm/',
      collapsed: true,
      items: [
        { text: 'Introduction', link: 'introduction' },
        { text: 'Datasource Config', link: 'config-datasource' },
        { text: 'ORM Config', link: 'config-orm' },
        { text: 'ORM Basics', link: 'basics' },
        { text: 'CRUD(Select)', link: 'crud-select' },
        { text: 'CRUD(Insert/Update/Delete)', link: 'crud-cud' },
        { text: 'CRUD(Magic Methods)', link: 'crud-magic' },
        { text: 'Transaction', link: 'transaction' },
        { text: 'Relations(Static)', link: 'relations-static' },
        { text: 'Relations(Dynamic)', link: 'relations-dynamic' },
        { text: 'Aggregate & Group', link: 'aggr-group' },
        { text: 'Aggregate on Relations', link: 'relations-aggr' },
        { text: 'Group on Relations', link: 'relations-group' },
        { text: 'Caching', link: 'caching' },
        {
          text: 'DTO infer & generation',
          base: '/guide/techniques/orm/dto/',
          collapsed: false,
          items: [
            { text: 'Introduction', link: 'introduction' },
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
          text: 'Advanced Features',
          base: '/guide/techniques/orm/advanced/',
          collapsed: false,
          items: [
            { text: 'Multi-database/Multi-datasource', link: 'multi-database' },
            { text: 'Table-partitioning', link: 'table-partitioning' },
            { text: 'Dynamic Datasource', link: 'dynamic-datasource' },
            { text: 'Sharding', link: 'sharding' },
            { text: 'Datasource Level', link: 'db-level' },
            { text: 'Multi-instance/Multi-tenancy', link: 'multi-instance' },
            { text: 'Database Strategy', link: 'db-strategy' },
          ],
        },
      ],
    },
    {
      collapsed: true,
      text: 'Techniques',
      items: [
        {
          text: 'Validation',
          base: '/guide/techniques/validation/',
          collapsed: true,
          items: [
            { text: 'Validation', link: 'introduction' },
            { text: 'Zod Refine', link: 'zod-refine' },
            { text: 'Zod Transform', link: 'zod-transform' },
          ],
        },
        {
          text: 'Swagger/Openapi',
          base: '/guide/techniques/openapi/',
          link: 'introduction',
        },
        {
          text: 'I18N',
          base: '/guide/techniques/i18n/',
          link: 'introduction',
        },
      ],
    },
    {
      text: 'Resources',
      items: [
        { text: 'FAQ', link: 'resources/faq' },
        { text: 'Videos', link: 'resources/videos' },
        { text: 'Articles', link: 'resources/articles' },
      ],
    },
    { text: 'Thanks', link: 'others/thanks' },
    { text: 'License', link: 'others/license' },
  ];
}
