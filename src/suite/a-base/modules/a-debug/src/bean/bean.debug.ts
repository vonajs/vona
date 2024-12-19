import { Bean } from 'vona-module-a-bean';
import { BeanBase } from 'vona';

import DebugInstance, { Debugger } from 'debug';

const __debug_caches: any = {};

@Bean()
export class BeanDebug extends BeanBase {
  get instance() {
    return DebugInstance;
  }

  get(namespace): Debugger {
    if (!__debug_caches[namespace]) {
      __debug_caches[namespace] = DebugInstance(namespace);
    }
    return __debug_caches[namespace];
  }
}
