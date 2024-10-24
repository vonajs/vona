import type { VonaApplication, VonaContext } from '../../types/index.js';

export class BeanSimple {
  protected app: VonaApplication;
  protected ctx: VonaContext;

  protected get bean() {
    return this.ctx ? this.ctx.bean : this.app.bean;
  }
}
