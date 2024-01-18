import { Model } from '../base/model.js';
import { BeanModuleScopeBase } from '../module/bean/beanModuleScopeBase.js';

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

  // BeanModuleScopeBase
  classes.BeanModuleScopeBase = BeanModuleScopeBase;

  return classes;
}
