import type { DefaultTheme } from 'vitepress';
import { defineConfig } from 'vitepress';

export const zh = defineConfig({
  lang: 'zh-CN',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/zh/guide/start/introduction', activeMatch: '/zh/guide/' },
    ],
    sidebar: {
      '/zh/guide/': { base: '/zh/guide/', items: sidebarGuide() },
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

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '开始',
      items: [
        { text: '简介', link: 'start/introduction' },
        { text: '快速上手', link: 'start/quick-start' },
        { text: 'VS Code 插件', link: 'start/zova-vscode' },
        { text: '框架升级', link: 'start/update' },
      ],
    },
    {
      collapsed: true,
      text: '基础',
      items: [
        {
          text: '模块化体系',
          base: '/zh/guide/essentials/modularization/',
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
          items: [
            { text: '简介', link: 'introduction' },
            { text: '匿名Bean', link: 'anonymous-bean' },
            { text: '具名Bean: Store', link: 'store-bean' },
            { text: '具名Bean: 通用', link: 'named-bean' },
            { text: 'Bean标识', link: 'bean-identifier' },
            { text: '注入', link: 'inject' },
            { text: '注入(API)', link: 'inject-api' },
            { text: 'BeanBase基类', link: 'bean-base' },
            { text: '生命周期', link: 'lifecycle' },
          ],
        },
        {
          text: '模块Scope',
          base: '/zh/guide/essentials/scope/',
          items: [
            { text: '简介', link: 'introduction' },
            { text: 'Config配置', link: 'config' },
            { text: 'Constant常量', link: 'constant' },
            { text: 'I18n国际化', link: 'locale' },
            { text: 'Error错误异常', link: 'error' },
            { text: 'Api服务', link: 'service' },
          ],
        },
      ],
    },
    {
      collapsed: true,
      text: '技术',
      items: [
        {
          text: '路由',
          base: '/zh/guide/techniques/router/',
          items: [
            { text: '路由字段', link: 'route-fields' },
            { text: '路由别名', link: 'route-alias' },
            { text: '导航守卫', link: 'navigation-guards' },
            { text: '路由Query', link: 'route-query' },
            { text: '路由Params', link: 'route-params' },
            { text: 'zod', link: 'zod' },
          ],
        },
        {
          text: 'SSR',
          base: '/zh/guide/techniques/ssr/',
          items: [
            { text: '简介', link: 'introduction' },
            { text: '初始化数据', link: 'init-data' },
            { text: 'ClientOnly', link: 'client-only' },
            { text: 'SEO Meta', link: 'seo-meta' },
            { text: 'env', link: 'env' },
          ],
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
          text: '构建',
          base: '/zh/guide/techniques/build/',
          link: 'build',
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
