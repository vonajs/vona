import { VonaApplication } from 'vona';

export const config = (_app: VonaApplication) => {
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
