import { Cast } from '@cabloy/core';
import { __ThisModule__ } from '../resource/this.js';
import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'middleware' })
export class MiddlewareJsonp extends BeanBase {
  async execute(options, next) {
    // options
    options = options || {};
    // whiteList
    if (this.ctx.app.meta.isTest) {
      options.whiteList = false;
    } else {
      const _config = this.ctx.config.module(__ThisModule__);
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
