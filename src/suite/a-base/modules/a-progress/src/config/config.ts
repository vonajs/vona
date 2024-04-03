import { CabloyApplication } from '@cabloy/core';

export const config = (_app: CabloyApplication) => {
  return {
    progress: {
      expireTime: 2 * 3600 * 1000, // default is 2 hours
    },
  };
};
