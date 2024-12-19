import { BeanCliBase } from './bean/bean.cliBase.js';

declare module 'vona' {
  export interface IBeanRecordGeneral {
    cliBase: BeanCliBase;
  }
}
