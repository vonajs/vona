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
        hm.src = "https://hm.baidu.com/hm.js?f9fe50a6dc5b127dae8fd55cd43369a4";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();
        `,
    ],
  ],
  ignoreDeadLinks: [
    /^https?:\/\/localhost/,
  ],
});
