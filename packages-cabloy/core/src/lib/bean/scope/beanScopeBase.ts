import { BeanScopeScene } from './beanScopeScene.js';
import { BeanBase } from '../beanBase.js';

export class BeanScopeBase extends BeanBase {
  private __scenes: Record<string, any> = {};

  protected __get__(prop) {
    if (!this.__scenes[prop]) {
      this.__scenes[prop] = this.bean._newBean(BeanScopeScene, this.moduleBelong, prop);
    }
    return this.__scenes[prop];
  }
}
