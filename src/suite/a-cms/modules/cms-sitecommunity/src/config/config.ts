const cmsSite = {
  base: {
    title: 'Community',
    subTitle: 'Everything About CabloyJS',
    description: '',
    keywords: '',
  },
  host: {
    url: 'http://localhost',
    rootPath: 'cms-test-community',
  },
  language: {
    default: 'en-us',
    items: 'en-us,zh-cn',
  },
  themes: {
    'en-us': 'cms-themecommunity',
    'zh-cn': 'cms-themecommunity',
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

export const config = _app => {
  return {
    cms: {
      site: cmsSite,
    },
  };
};
