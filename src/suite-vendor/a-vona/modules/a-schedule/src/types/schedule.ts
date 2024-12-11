import * as Bull from 'bullmq';
import { TypeQueueScheduleJobData, TypeQueueScheduleJobResult } from '../bean/queue.schedule.js';
import { IQueueJobContext } from 'vona-module-a-queue';

export type TypeScheduleJob = Bull.Job<IQueueJobContext<TypeQueueScheduleJobData>, TypeQueueScheduleJobResult>;

export interface IScheduleExecute {
  execute(job?: TypeScheduleJob): Promise<void>;
}
