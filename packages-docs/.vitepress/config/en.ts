import type { DefaultTheme } from 'vitepress';
import { defineConfig } from 'vitepress';

export const en = defineConfig({
  lang: 'en-US',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/guide/start/introduction', activeMatch: '/guide/' },
    ],
    sidebar: {
      '/guide/': { base: '/guide/', items: sidebarGuide() },
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

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Getting Started',
      items: [
        { text: 'Introduction', link: 'start/introduction' },
        { text: 'Quick Start', link: 'start/quick-start' },
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
      text: 'Techniques',
      items: [
        {
          text: 'Runtime Environments & Flavor',
          base: '/guide/techniques/mode-flavor/',
          link: 'introduction',
        },
        {
          text: 'Env',
          base: '/guide/techniques/env/',
          link: 'introduction',
        },
        {
          text: 'Config',
          base: '/guide/techniques/config/',
          link: 'introduction',
        },
        {
          text: 'Multi-instance/Multi-tenancy',
          base: '/guide/techniques/instance/',
          link: 'introduction',
        },
        {
          text: 'Vona ORM',
          base: '/guide/techniques/orm/',
          collapsed: true,
          items: [
            { text: 'Introduction', link: 'introduction' },
            { text: 'Datasource Config', link: 'config-datasource' },
            { text: 'ORM Config', link: 'config-orm' },
            { text: 'Database Strategy', link: 'strategy' },
            { text: 'ORM Basics', link: 'basics' },
            { text: 'CRUD(Select)', link: 'crud-select' },
            { text: 'CRUD(Insert/Update/Delete)', link: 'crud-cud' },
            { text: 'Transaction', link: 'transaction' },
            { text: 'Relations(Static)', link: 'relations-static' },
            { text: 'Relations(Dynamic)', link: 'relations-dynamic' },
            { text: 'Aggregate & Group', link: 'aggr-group' },
            { text: 'Aggregate on Relations', link: 'relations-aggr' },
            { text: 'Group on Relations', link: 'relations-group' },
            { text: 'Cache', link: 'cache' },
          ],
        },
        {
          text: 'Validation',
          base: '/guide/techniques/validation/',
          link: 'introduction',
        },
        {
          text: 'Swagger/Openapi',
          base: '/guide/techniques/openapi/',
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
