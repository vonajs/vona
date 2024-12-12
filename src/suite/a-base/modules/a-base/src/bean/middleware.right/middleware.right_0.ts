import { cast } from 'vona';
import { BeanBase } from 'vona';
import { MiddlewareRight } from '../middleware.right.js';

export class MiddlewareRight0 extends BeanBase {
  get self() {
    return cast<MiddlewareRight>(this);
  }

  get constant() {
    return this.self.scope.constant;
  }

  async execute(options, next) {
    // ignore
    if (!options.type) {
      // others
      return next();
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
    return next();
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
