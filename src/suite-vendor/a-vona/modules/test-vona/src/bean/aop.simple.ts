import type { AopAction, AopActionInit } from 'vona-module-a-aspect';
import type { BeanTestCtx } from 'vona-module-test-vona';
import { BeanAopBase } from 'vona';
import { Aop } from 'vona-module-a-aspect';

class AopSimpleBase extends BeanAopBase {
  actionSync: AopAction<BeanTestCtx, 'actionSync', string> = (_args, next, _receiver) => {
    const result = next();
    return `${result}:simpleaop`;
  };
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

  protected __init__: AopActionInit<BeanTestCtx> = (_args, next, _receiver) => {
    next();
  };

  protected __dispose__: AopActionInit<BeanTestCtx> = async (_args, next, _receiver) => {
    await next();
  };

  actionAsync: AopAction<BeanTestCtx, 'actionAsync', string> = async (_args, next, _receiver) => {
    const result = await next(_args);
    return `${result}:simpleaop`;
  };
}
