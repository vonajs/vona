import type { CabloyApplication, CabloyContext } from '../../types/index.js';

export class BeanSimple {
  protected app: CabloyApplication;
  protected ctx: CabloyContext;

  protected get bean() {
    return this.ctx ? this.ctx.bean : this.app.bean;
  }
}
