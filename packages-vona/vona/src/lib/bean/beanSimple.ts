import type { VonaApplication, CabloyContext } from '../../types/index.js';

export class BeanSimple {
  protected app: VonaApplication;
  protected ctx: CabloyContext;

  protected get bean() {
    return this.ctx ? this.ctx.bean : this.app.bean;
  }
}
