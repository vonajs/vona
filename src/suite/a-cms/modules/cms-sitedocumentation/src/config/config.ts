const cmsSite = {
  base: {
    title: 'Documentations',
    subTitle: 'Everything About CabloyJS',
    description: '',
    keywords: '',
  },
  host: {
    url: 'http://localhost',
    rootPath: 'cms-test-documentation',
  },
  language: {
    default: 'en-us',
    items: 'en-us,zh-cn',
  },
  themes: {
    'en-us': 'cms-themedocs',
    'zh-cn': 'cms-themedocs',
  },
  edit: {
    mode: 1, // markdown
  },
  env: {
    format: {
      date: 'YYYY-MM-DD',
      time: 'HH:mm:ss',
    },
    article2: {
      recentNum: 5,
    },
    comment: {
      order: 'asc',
      recentNum: 5,
    },
    brother: {
      order: 'desc',
    },
    loadMore: {
      loadOnScroll: false,
    },
  },
  profile: {},
  beian: {
    icp: '',
  },
};

import { CabloyApplication } from 'vona';

export const config = (_app: CabloyApplication) => {
  return {
    cms: {
      site: cmsSite,
    },
  };
};
