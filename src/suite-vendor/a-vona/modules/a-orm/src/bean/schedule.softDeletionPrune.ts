import type { Constructable } from 'vona';
import type { IScheduleExecute } from 'vona-module-a-schedule';
import type { ISoftDeletionPrune } from '../types/onion/model.ts';
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
      let softDeletionPrune = onionSlice.beanOptions.options?.softDeletionPrune;
      if (!softDeletionPrune) continue;
      if (softDeletionPrune === true) softDeletionPrune = {};
      await this._modulePrune(onionSlice.beanOptions.beanClass as any, softDeletionPrune);
    }
  }

  private async _modulePrune<T extends BeanModelCache>(modelClass: Constructable<T>, softDeletionPrune: ISoftDeletionPrune) {
    const pruneFn = softDeletionPrune.pruneFn;
    const expired = softDeletionPrune.expired;
    if (pruneFn) {

    }
  }
}
