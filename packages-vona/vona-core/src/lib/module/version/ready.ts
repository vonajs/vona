import { cast, EnumAppEvent } from '../../../types/index.js';
import { BeanSimple } from '../../bean/beanSimple.js';

export class VersionReady extends BeanSimple {
  initialize() {}
  async execute() {
    const app = this.app;
    try {
      // version ready
      await cast(app.bean._getBean('a-startup.service.startup' as never)).versionReady();
    } catch (err) {}
  }
}
