// import { URL } from 'url';
import { BeanSimple } from '../bean/beanSimple.js';
// import { cast } from '../../types/utils/cast.js';

export class SocketioReady extends BeanSimple {
  initialize() {
    // const app = this.app;
    // // checkRequest
    // app.io.checkRequest = function (req, fn) {
    //   // not cors (safari not send sec-fetch-mode)
    //   // if (req.headers['sec-fetch-mode'] !== 'cors') return fn(null, true);
    //   // origin
    //   let origin = req.headers.origin || req.headers.referer;
    //   // file:// URLs produce a null Origin which can't be authorized via echo-back
    //   if (origin === 'null' || origin === null) origin = '*';
    //   if (!origin || origin === '*') return fn(null, true);
    //   const host = req.headers['x-forwarded-host'] || req.headers.host;
    //   if (new URL(origin).host === host) {
    //     return fn(null, true);
    //   }
    //   // check
    //   // todo:
    //   const reqNew = Object.assign({}, req, {
    //     method: 'SOCKETIO',
    //     url: '/api/a/base/',
    //   });
    //   app.runInAnonymousContextScope(async _ctx => {
    //     return cast(app.bean._getBean('a-instance.service.instance' as never))
    //       .checkAppReadyInstance(true)
    //       .then(res => {
    //         if (!res) return fn(null, false);
    //         if (cast(app.bean).security.isSafeDomain(origin)) {
    //           return fn(null, true);
    //         }
    //         return fn(null, false);
    //       })
    //       .catch(() => {
    //         return fn(null, false);
    //       });
    //   }, reqNew);
    // };
  }
}
