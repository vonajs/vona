import { CabloyApplication, CabloyContext } from '../../../types/index.js';

export class BeanBase {
  app: CabloyApplication;
  ctx: CabloyContext;
  __beanFullName__: string;

  constructor() {
    this.app = null as unknown as CabloyApplication;
    this.ctx = null as unknown as CabloyContext;
    this.__beanFullName__ = '';
  }

  __init__() {}
}
