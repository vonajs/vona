import { Cast } from 'vona';
import { ScopeModule } from '../.metadata/this.js';
import { Bean, BeanBase } from 'vona';

@Bean({ scene: 'middleware' })
export class MiddlewareJsonp extends BeanBase<ScopeModule> {
  async execute(options, next) {
    // options
    options = options || {};
    // whiteList
    if (this.ctx.app.meta.isTest) {
      options.whiteList = false;
    } else {
      const _config: any = this.scope.config;
      const _whiteList = _config && _config.jsonp && _config.jsonp.whiteList;
      const hostSelf = this.ctx.hostname;
      if (_whiteList) {
        if (!Array.isArray(_whiteList)) {
          options.whiteList = _whiteList.split(',');
        } else {
          options.whiteList = _whiteList.concat();
        }
        options.whiteList.push(hostSelf);
      } else {
        options.whiteList = [hostSelf];
      }
    }
    // jsonp
    const fn = Cast(this.ctx.app).jsonp(options);
    await fn(this.ctx, next);
  }
}
