import { Aop, BeanBase } from 'vona';

@Aop({ match: [/^test-party.test\.\w+$/, 'testCtx'] })
export class AopRegExp extends BeanBase {
  __get_name__(context, next) {
    next();
    context.value = `${context.value}:regexpaop`;
  }

  __set_name__(context, next) {
    const parts = context.value.split(':');
    const index = parts.indexOf('regexpaop');
    if (index > -1) {
      parts.splice(index, 1);
    }
    context.value = parts.join(':');
    next();
  }

  actionSync(context, next) {
    next();
    context.result = `${context.result}:regexpaop`;
  }

  async actionAsync(context, next) {
    await next();
    context.result = `${context.result}:regexpaop`;
  }
}
