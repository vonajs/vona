import * as Bull from 'bullmq';
import * as Redlock from 'redlock';
import { IMiddlewareBaseEnable } from './middleware.js';

export interface IQueueRecord {}

export interface IQueueExecute {
  execute(options: IQueueJobInfo, job: Bull.Job): Promise<boolean>;
}

export interface IDecoratorQueueOptions extends IMiddlewareBaseEnable {
  concurrency?: boolean;
  transaction: boolean;
  options?: {
    queue?: Bull.QueueOptions;
    worker?: Bull.WorkerOptions;
    redlock?: Redlock.Options;
    job?: Bull.JobsOptions;
  };
}
