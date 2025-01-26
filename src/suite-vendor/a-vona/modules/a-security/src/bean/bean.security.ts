import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';
import * as security from 'egg-security';
import { URL } from 'node:url';
import { IMiddlewareSystemOptionsCors } from './middlewareSystem.cors.js';

@Bean()
export class BeanSecurity extends BeanBase {
  isSafeDomain(origin: string | undefined | null): boolean {
    // origin is {protocol}{hostname}{port}...
    if (!origin || origin === 'null' || origin === null) return true;

    // whiteList
    const onionCors = this.bean.onion.middlewareSystem.getOnionSlice('a-security:cors');
    let whiteListCors = (<IMiddlewareSystemOptionsCors>onionCors.beanOptions.options).whiteList;
    if (whiteListCors === '*') return true;
    if (!whiteListCors) return false;
    if (typeof whiteListCors === 'string') {
      whiteListCors = whiteListCors.split(',');
    }

    let parsedUrl;
    try {
      parsedUrl = new URL(origin);
    } catch (_) {
      return false;
    }

    if (
      security.utils.isSafeDomain(parsedUrl.hostname, whiteListCors) ||
      security.utils.isSafeDomain(origin, whiteListCors)
    ) {
      return true;
    }
    return false;
  }
}

// getWhiteListCors(ctx) {
//   let whiteListCors;
//   const _config = ctx.app.bean._getScope('a-base').config;
//   const _whiteList = (_config && _config.cors && _config.cors.whiteList) || [];
//   if (!Array.isArray(_whiteList)) {
//     whiteListCors = _whiteList.split(',');
//   } else {
//     whiteListCors = _whiteList.concat();
//   }
//   // inherits from jsonp
//   let _whiteListJsonp = _config && _config.jsonp && _config.jsonp.whiteList;
//   if (_whiteListJsonp) {
//     if (!Array.isArray(_whiteListJsonp)) {
//       _whiteListJsonp = _whiteListJsonp.split(',');
//     }
//     whiteListCors = whiteListCors.concat(_whiteListJsonp);
//   }
//   // hostSelf
//   const hostSelf = ctx.app.bean.base.getAbsoluteUrl();
//   if (hostSelf) {
//     whiteListCors.push(hostSelf);
//   }
//   // ok
//   return whiteListCors;
// }
