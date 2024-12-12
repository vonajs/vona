import * as Bull from 'bullmq';
import { TypeQueueScheduleJobData, TypeQueueScheduleJobResult } from '../bean/queue.schedule.js';
import { IQueueJobContext } from 'vona-module-a-queue';
import { IMiddlewareBaseEnable } from 'vona';

export type TypeScheduleJob = Bull.Job<IQueueJobContext<TypeQueueScheduleJobData>, TypeQueueScheduleJobResult>;

export interface IScheduleExecute {
  execute(job?: TypeScheduleJob): Promise<void>;
}

export interface IScheduleRecord {}

export interface IDecoratorScheduleOptions extends IMiddlewareBaseEnable {
  repeat: Bull.RepeatOptions;
  transaction?: boolean;
}
