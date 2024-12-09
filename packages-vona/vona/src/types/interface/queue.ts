import * as Bull from 'bullmq';
import Redlock from 'redlock';
import { IMiddlewareBaseEnable } from './middleware.js';

export interface IQueueJobContext {
  job: Bull.Job;
  data: any;
  queueNameSub: string | undefined;
}

export interface IQueueRecord {}

export interface IQueueExecute {
  execute(options: IDecoratorQueueOptions): Promise<boolean>;
}

export interface IDecoratorQueueOptions extends IMiddlewareBaseEnable {}
