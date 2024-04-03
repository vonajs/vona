import { CabloyApplication, IModuleConfigBroadcast } from '@cabloy/core';

// broadcasts
const broadcasts = {
  memRemove: {
    bean: 'memRemove',
  } as IModuleConfigBroadcast,
  memClear: {
    bean: 'memClear',
  } as IModuleConfigBroadcast,
};

export const config = (_app: CabloyApplication) => {
  return {
    broadcasts,
    // db
    db: {
      redis: true,
    },
  };
};
