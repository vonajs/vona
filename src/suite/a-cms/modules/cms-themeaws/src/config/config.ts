import { VonaApplication } from 'vona';

export const config = (_app: VonaApplication) => {
  return {
    theme: {
      _theme: {
        name: 'cms-themeaws',
        url: 'https://www.npmjs.com/package/vona-module-cms-themeaws',
      },
    },
  };
};
