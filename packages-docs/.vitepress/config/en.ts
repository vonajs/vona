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
        { text: 'Demo Playground', link: 'start/demo' },
        { text: 'Update', link: 'start/update' },
      ],
    },
    {
      collapsed: true,
      text: 'Essentials',
      items: [
        {
          text: 'Modularization',
          base: '/guide/essentials/modularization/',
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
          items: [
            { text: 'Create CRUD', link: 'crud' },
            { text: 'Controller', link: 'controller' },
          ],
        },
      ],
    },
    {
      collapsed: true,
      text: 'Techniques',
      items: [
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
          text: 'Build',
          base: '/guide/techniques/build/',
          link: 'build',
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
