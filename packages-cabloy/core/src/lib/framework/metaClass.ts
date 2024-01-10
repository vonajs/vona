import { Model } from '../base/model.js';
import { BeanModuleBase } from '../module/bean/beanModuleBase.js';

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

  // BeanModuleBase
  classes.BeanModuleBase = BeanModuleBase;

  return classes;
}
