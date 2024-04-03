import { IModuleConfigBroadcast } from '@cabloy/core';

// broadcasts
const broadcasts = {
  memRemove: {
    bean: 'memRemove',
  } as IModuleConfigBroadcast,
  memClear: {
    bean: 'memClear',
  } as IModuleConfigBroadcast,
};

import { CabloyApplication } from '@cabloy/core';

export const config = (_app: CabloyApplication) => {
  return {
    broadcasts,
    // db
    db: {
      redis: true,
    },
  };
};
