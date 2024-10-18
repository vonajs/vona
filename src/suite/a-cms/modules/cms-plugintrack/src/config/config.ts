import { CabloyApplication } from 'vona';

export const config = (_app: CabloyApplication) => {
  return {
    plugin: {
      track: {
        google: '',
        baidu: '',
        qq: '',
      },
    },
  };
};
