import { BeanBase } from '@cabloy/core';

export class MiddlewareRight0 extends BeanBase {
  get constant() {
    return this.ctx.constant.module();
  }

  async execute(options, next) {
    // ignore
    if (!options.type) {
      // others
      return await next();
    }

    const types = options.type.split(',');
    if (types.length === 1) {
      await this.checkRight(types[0], options);
    } else {
      let error;
      for (const type of types) {
        try {
          await this.checkRight(type, options);
          // ok
          error = null;
          break;
        } catch (err) {
          error = err;
        }
      }
      if (error) throw error;
    }

    // next
    await next();
  }

  async checkRight(type, options) {
    // atom
    if (type === 'atom') return await this.checkAtom(options);

    // atomClass
    if (type === 'atomClass') return await this.checkAtomClass(options);

    // resource
    if (type === 'resource') return await this.checkResource(options);
  }
}
