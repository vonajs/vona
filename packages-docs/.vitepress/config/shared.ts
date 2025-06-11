import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export const shared = defineConfig({
  title: 'Vona',
  description: 'An intuitive, elegant and powerful Node.js framework',
  base: '/',
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/vonajs/vona/edit/main/packages-docs/:path',
    },
    search: {
      provider: 'local',
    },
    // https://vitepress.dev/reference/default-theme-config
  },
  head: [
    [
      'script',
      {},
      `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?5831d5a43f8eb8e39e8329645f12b8ae";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();
        `,
    ],
  ],
});
