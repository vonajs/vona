import type { Next } from 'vona';
import type { BeanTestCtx } from 'vona-module-test-vona';
import { BeanAopBase } from 'vona';
import { Aop } from 'vona-module-a-aspect';

class AopSimpleBase extends BeanAopBase {
  actionSync(_args, next) {
    const result = next();
    return `${result}:simpleaop`;
  }
}

@Aop({ match: 'testCtx', dependencies: 'test-vona:regExp', meta: { mode: 'test' } })
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

  __set__(prop, value, next): boolean {
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

  __set_name__(value, next): boolean {
    const parts = value.split(':');
    const index = parts.indexOf('simpleaop');
    if (index > -1) {
      parts.splice(index, 1);
    }
    value = parts.join(':');
    return next(value);
  }

  async actionAsync(_args: Parameters<BeanTestCtx['actionAsync']>, next: Next, _receiver: BeanTestCtx) {
    const result = await next();
    return `${result}:simpleaop`;
  }
}
