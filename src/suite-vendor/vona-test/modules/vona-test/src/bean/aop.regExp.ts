import { BeanAopBase } from 'vona';
import { Aop } from 'vona-module-a-aspect';

@Aop({ match: [/^vona-test\.service\.test\w+$/, 'testCtx'], meta: { mode: 'unittest' } })
export class AopRegExp extends BeanAopBase {
  __get_name__(next) {
    const value = next();
    return `${value}:regexpaop`;
  }

  __set_name__(value, next) {
    const parts = value.split(':');
    const index = parts.indexOf('regexpaop');
    if (index > -1) {
      parts.splice(index, 1);
    }
    value = parts.join(':');
    return next(value);
  }

  actionSync(_args, next) {
    const result = next();
    return `${result}:regexpaop`;
  }

  async actionAsync(_args, next) {
    const result = await next();
    return `${result}:regexpaop`;
  }
}
