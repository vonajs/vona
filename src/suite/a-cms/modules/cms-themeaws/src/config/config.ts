import { CabloyApplication } from '@cabloy/core';

export const config = (_app: CabloyApplication) => {
  return {
    theme: {
      _theme: {
        name: 'cms-themeaws',
        url: 'https://www.npmjs.com/package/cabloy-module-api-cms-themeaws',
      },
    },
  };
};
