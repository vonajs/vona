import * as Bull from 'bullmq';
import { IMiddlewareBaseEnable } from './middleware.js';

export interface IQueueRecord {}

export interface IQueueExecute {
  execute(options: IDecoratorQueueOptions): Promise<boolean>;
}

export interface IDecoratorQueueOptions extends IMiddlewareBaseEnable {
  concurrency?: boolean;
  transaction: boolean;
  options?: {
    worker?: {
      concurrency?: number;
    };
    job?: Bull.JobsOptions;
  };
}
