import { BeanAopBase } from 'vona';
import { Aop } from 'vona-module-a-aspect';

class AopSimpleBase extends BeanAopBase {
  actionSync(_args, next) {
    const result = next();
    return `${result}:simpleaop`;
  }
}

@Aop({ match: 'testCtx', dependencies: 'vona-test:regExp', meta: { mode: 'unittest' } })
export class AopSimple extends AopSimpleBase {
  // magic
  __get__(prop, next) {
    const value = next();
    if (prop === 'magic') {
      return 'magic:simpleaop';
    }
    if (prop === 'name') {
      return `${value}:simpleaop`;
    }
    return value;
  }

  __set__(prop, value, next) {
    if (prop === 'name') {
      const parts = value.split(':');
      const index = parts.indexOf('simpleaop');
      if (index > -1) {
        parts.splice(index, 1);
      }
      value = parts.join(':');
    }
    return next(value);
  }

  __get_name__(next) {
    const value = next();
    return `${value}:simpleaop`;
  }

  __set_name__(value, next) {
    const parts = value.split(':');
    const index = parts.indexOf('simpleaop');
    if (index > -1) {
      parts.splice(index, 1);
    }
    value = parts.join(':');
    return next(value);
  }

  async actionAsync(_args, next) {
    const result = await next();
    return `${result}:simpleaop`;
  }
}
