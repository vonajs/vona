import type { IOnionSlice } from 'vona-module-a-onion';
import type { IScheduleExecute } from 'vona-module-a-schedule';
import type { IDecoratorModelOptions, IModelRecord, ISoftDeletionPrune } from '../types/onion/model.ts';
import type { BeanModelCache } from './bean.model/bean.model_cache.ts';
import { BeanBase } from 'vona';
import { Schedule } from 'vona-module-a-schedule';

@Schedule({ repeat: {
  every: 24 * 3600 * 1000,
} })
export class ScheduleSoftDeletionPrune extends BeanBase implements IScheduleExecute {
  async execute() {
    const onionSlices = this.bean.onion.model.getOnionsEnabled();
    for (const onionSlice of onionSlices) {
      let softDeletionPrune = onionSlice.beanOptions.options?.softDeletionPrune ?? this.scope.config.softDeletionPrune.enable;
      if (!softDeletionPrune) continue;
      if (softDeletionPrune === true) softDeletionPrune = {};
      await this._modulePrune(onionSlice, softDeletionPrune);
    }
  }

  private async _modulePrune<T extends BeanModelCache>(
    onionSlice: IOnionSlice<IDecoratorModelOptions, keyof IModelRecord, unknown>,
    softDeletionPrune: ISoftDeletionPrune,
  ) {
    const pruneFn = softDeletionPrune.pruneFn;
    const expired = softDeletionPrune.expired ?? this.scope.config.softDeletionPrune.expired;
    const modelTarget = this.bean._getBean<T>(onionSlice.beanOptions.beanFullName as any);
    if (pruneFn) {
      await pruneFn(this.ctx, modelTarget);
    } else {
      const expiredTime = new Date(Date.now() - expired);
      await modelTarget.delete({
        deleted: true,
        updatedAt: {
          _lt_: expiredTime,
        },
      } as any, { disableDeleted: true });
    }
  }
}
