import { BeanBase, CabloyContext, IModuleMainContext } from '@cabloy/core';

export class Main extends BeanBase implements IModuleMainContext {
  createContext(context: CabloyContext): void {
    context.sss = '';
  }
}
