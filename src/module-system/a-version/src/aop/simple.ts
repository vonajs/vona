import { Aop, BeanBase } from '@cabloy/core';

class SimpleAopBase extends BeanBase {
  actionSync(context, next) {
    next();
    context.result = `${context.result}:simpleaop`;
  }
}

@Aop({ match: 'a-version.local.a' })
export class AopSimple extends SimpleAopBase {
  // magic
  __get__(context, next) {
    next();
    const prop = context.prop;
    if (prop === 'magic') {
      context.value = 'magic:simpleaop';
    }
    // if (prop === 'name') {
    //   context.value = `${context.value}:simpleaop`;
    // }
  }

  __set__(_context, next) {
    // const prop = context.prop;
    // if (prop === 'name') {
    //   const parts = context.value.split(':');
    //   const index = parts.indexOf('simpleaop');
    //   if (index > -1) {
    //     parts.splice(index, 1);
    //   }
    //   context.value = parts.join(':');
    // }
    next();
  }

  __get_name__(context, next) {
    next();
    context.value = `${context.value}:simpleaop`;
  }

  __set_name__(context, next) {
    const parts = context.value.split(':');
    const index = parts.indexOf('simpleaop');
    if (index > -1) {
      parts.splice(index, 1);
    }
    context.value = parts.join(':');
    next();
  }

  async actionAsync(context, next) {
    await next();
    context.result = `${context.result}:simpleaop`;
  }
}
