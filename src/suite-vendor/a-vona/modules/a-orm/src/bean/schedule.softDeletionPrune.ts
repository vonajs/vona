import type { IScheduleExecute } from 'vona-module-a-schedule';
import { BeanBase } from 'vona';
import { Schedule } from 'vona-module-a-schedule';

@Schedule({ repeat: {} })
export class ScheduleSoftDeletionPrune extends BeanBase implements IScheduleExecute {
  async execute() {}
}
