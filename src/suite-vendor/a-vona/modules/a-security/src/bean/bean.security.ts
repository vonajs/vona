import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';
import { isMatch } from 'matcher';
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

    if (_isSafeDomain(parsedUrl.hostname, whiteListCors) || _isSafeDomain(origin, whiteListCors)) {
      return true;
    }
    return false;
  }
}

function _isSafeDomain(domain, whiteList) {
  // domain must be string, otherwise return false
  if (typeof domain !== 'string') return false;
  // Ignore case sensitive first
  domain = domain.toLowerCase();
  // add prefix `.`, because all domains in white list start with `.`
  const hostname = '.' + domain;

  return whiteList.some(rule => {
    // Check whether we've got '*' as a wild character symbol
    if (rule.includes('*')) {
      return isMatch(domain, rule);
    }
    // If domain is an absolute path such as `http://...`
    // We can directly check whether it directly equals to `domain`
    // And we don't need to cope with `endWith`.
    if (domain === rule) return true;
    // ensure wwweggjs.com not match eggjs.com
    if (!/^\./.test(rule)) rule = `.${rule}`;
    return hostname.endsWith(rule);
  });
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
