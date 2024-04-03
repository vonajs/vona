import { CabloyApplication } from '@cabloy/core';

export const config = (_app: CabloyApplication) => {
  return {
    plugin: {
      links: [
        { title: 'PersonalProfile', url: '?__to=mine' },
        // { title: 'PersonalProfile', url: '/a/user/user/mine' },
        // { title: 'front', url: 'static/comments.html' },
        // { title: 'external', url: 'https://cabloy.com' },
      ],
    },
  };
};
