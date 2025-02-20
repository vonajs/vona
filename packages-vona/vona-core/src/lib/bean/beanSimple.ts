import type { VonaApplication, VonaContext } from '../../types/index.ts';

export class BeanSimple {
  protected app: VonaApplication;

  protected get ctx(): VonaContext {
    return this.app.currentContext as unknown as VonaContext;
  }

  protected get bean() {
    return this.app.bean;
  }
}
