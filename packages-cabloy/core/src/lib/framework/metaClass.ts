import { Model } from '../base/model.js';
import { BeanScopeBase } from '../module/bean/beanScopeBase.js';

export default function () {
  const __classes = {};
  const classes: any = new Proxy(__classes, {
    get(target, prop) {
      return target[prop];
    },
    set(target, prop, value) {
      // only once
      if (!target[prop]) {
        target[prop] = value;
      }
      return true;
    },
  });

  // model
  classes.Model = Model;

  // BeanScopeBase
  classes.BeanScopeBase = BeanScopeBase;

  return classes;
}
