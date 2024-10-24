import { ScopeModule } from '../.metadata/this.js';
import { Bean, BeanBase } from 'vona';

// request.body
//   validate: module(optional), validator, schema(optional)
//   data:

@Bean({ scene: 'middleware' })
export class MiddlewareValidate extends BeanBase<ScopeModule> {
  async execute(options, next) {
    // must exists
    const validator = options.validator;
    if (!validator) this.scope.error.ValidatorNotSpecified.throw();
    // params
    const module = options.module || this.ctx.module.info.relativeName;
    const schema = options.schema;
    const data = this.ctx.request.body[options.data || 'data'];
    // if error throw 422
    await this.ctx.bean.validation.validate({
      module,
      validator,
      schema,
      data,
      filterOptions: true,
    });
    // next
    await next();
  }
}
