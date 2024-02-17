import { Cast } from '@cabloy/core';
import { ScopeModule } from '../../resource/this.js';
import { BeanBase } from '@cabloy/core';
import { MiddlewareRight } from '../middleware.right.js';

export class MiddlewareRight0 extends BeanBase<ScopeModule> {
  get self() {
    return Cast<MiddlewareRight>(this);
  }

  get constant() {
    return this.scope.constant;
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
    if (type === 'atom') return await this.self.checkAtom(options);

    // atomClass
    if (type === 'atomClass') return await this.self.checkAtomClass(options);

    // resource
    if (type === 'resource') return await this.self.checkResource(options);
  }
}
