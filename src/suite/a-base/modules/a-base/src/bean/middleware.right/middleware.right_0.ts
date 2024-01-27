import { __ThisModule__ } from '../../resource/this.js';
import { BeanBase } from '@cabloy/core';
import { MiddlewareRightAtom } from './middleware.right_atom.js';
import { MiddlewareRightAtomClass } from './middleware.right_atomClass.js';
import { MiddlewareRightResource } from './middleware.right_resource.js';

export class MiddlewareRight0 extends BeanBase {
  get constant() {
    return this.ctx.constant.module(__ThisModule__);
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
    if (type === 'atom') return await (this as unknown as MiddlewareRightAtom).checkAtom(options);

    // atomClass
    if (type === 'atomClass') return await (this as unknown as MiddlewareRightAtomClass).checkAtomClass(options);

    // resource
    if (type === 'resource') return await (this as unknown as MiddlewareRightResource).checkResource(options);
  }
}
