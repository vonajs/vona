import { CabloyApplication } from 'vona';

export const config = (_app: CabloyApplication) => {
  return {
    theme: {
      _theme: {
        name: 'cms-themeblog',
        url: 'https://www.npmjs.com/package/cabloy-module-api-cms-themeblog',
      },
    },
  };
};
