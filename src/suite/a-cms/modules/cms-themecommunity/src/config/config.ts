import { CabloyApplication } from 'vona';

export const config = (_app: CabloyApplication) => {
  return {
    theme: {
      _theme: {
        name: 'cms-themecommunity',
        url: 'https://www.npmjs.com/package/vona-module-cms-themecommunity',
      },
    },
  };
};
