import { Bean, BeanBase } from '@cabloy/core';

import DebugInstance from 'debug';

const __debug_caches = {};

@Bean()
export class BeanDebug extends BeanBase {
  get instance() {
    return DebugInstance;
  }

  get(namespace) {
    if (!__debug_caches[namespace]) {
      __debug_caches[namespace] = DebugInstance(namespace);
    }
    return __debug_caches[namespace];
  }
}
