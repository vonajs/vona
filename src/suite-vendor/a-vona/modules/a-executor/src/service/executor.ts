import type { IGeneralInfoOptions } from '../types/executor.ts';
import { BeanBase, deepExtend } from 'vona';
import { Service } from 'vona-module-a-web';

@Service()
export class ServiceExecutor extends BeanBase {
  prepareGeneralInfo(options?: IGeneralInfoOptions): IGeneralInfoOptions {
    const current = this.bean.database.current;
    const level = (options?.dbInfo?.level ?? current?.level ?? 0) + 1;
    const clientName = options?.dbInfo?.clientName ?? current?.clientName;
    const locale = options?.locale === undefined ? this.ctx?.locale : options.locale;
    const instanceName = options?.instanceName === undefined ? this.ctx?.instanceName : options.instanceName;
    options = {
      dbInfo: { level, clientName },
      locale,
      instanceName,
    };
    if (this.ctx) {
      options = deepExtend({ extraData: { request: { headers: {} } } }, options)!;
      // extraData: headers
      const headers = options.extraData!.request!.headers!;
      for (const key in this.ctx.request.headers) {
        if (key.startsWith('x-vona-data-') && !headers[key]) {
          const value = this.ctx.request.headers[key];
          if (value) {
            headers[key] = value as string;
          }
        }
      }
    }
    return options;
  }
}

// for (const key of ['x-clientid', 'x-scene']) {
//   if (!headers[key]) {
//     const value =
//       key === 'x-clientid'
//         ? (<any>ctx.app.bean).util.getFrontClientId()
//         : (<any>ctx.app.bean).util.getFrontScene();
//     if (value) {
//       headers[key] = value;
//     }
//   }
// }
// for (const key of ['host', 'origin', 'referer', 'user-agent']) {
//   if (!headers[key]) {
//     const value = this.ctx.request.headers[key];
//     if (value) {
//       headers[key] = value;
//     }
//   }
// }
