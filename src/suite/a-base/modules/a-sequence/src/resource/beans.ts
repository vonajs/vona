export * from '../bean/version.manager.js';
export * from '../bean/sequence.simple.js';
export * from '../bean/bean.sequence.js';

import { BeanSequence } from '../bean/bean.sequence.js';

declare module 'vona' {
  export interface IBeanRecord {
    sequence: BeanSequence;
  }
}
