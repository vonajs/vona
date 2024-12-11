import * as Bull from 'bullmq';
import { TypeQueueScheduleJobData } from '../bean/queue.schedule.js';
import { IQueueJobContext } from 'vona-module-a-queue';

export type TypeScheduleJob = Bull.Job<IQueueJobContext<TypeQueueScheduleJobData>, void>;

export interface IScheduleExecute {
  execute(job?: TypeScheduleJob): Promise<void>;
}
