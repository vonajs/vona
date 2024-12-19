import { BeanAtomBase } from './bean/bean.atomBase.js';

export * from './types/atom/index.js';
export * from './types/atomClass/index.js';
export * from './types/user/index.js';

declare module 'vona' {
  export interface IBeanRecordGlobal {
    atomBase: BeanAtomBase;
  }
  export interface CtxMeta {
    validateHost: { atomClass; key; options; user };
  }
}
