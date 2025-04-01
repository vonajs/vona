import type { IGeneralInfoOptions } from '../types/executor.ts';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';

@Service()
export class ServiceExecutor extends BeanBase {
  prepareGeneralInfo(options?: IGeneralInfoOptions): IGeneralInfoOptions {
    const current = this.bean.database.current;
    const level = (options?.dbInfo?.level ?? current?.level ?? 0) + 1;
    const clientName = options?.dbInfo?.clientName ?? current?.clientName;
    const locale = options?.locale === undefined ? this.ctx?.locale : options.locale;
    const instanceName = options?.instanceName === undefined ? this.ctx?.instanceName : options.instanceName;
    return {
      dbInfo: { level, clientName },
      locale,
      instanceName,
    };
  }
}
