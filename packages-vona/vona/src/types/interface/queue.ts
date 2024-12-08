import * as Bull from 'bullmq';
import Redlock from 'redlock';
import { IMiddlewareBaseEnable } from './middleware.js';

export interface IQueueJobContext {
  job: Bull.Job;
  data: any;
  queueNameSub: string | undefined;
}

export interface IQueueWork {
  redlock: Redlock;
  worker: Bull.Worker;
}
export interface IQueueWorks {
  [queueKey: string]: IQueueWork;
}

export interface IQueueQueue {
  queue: Bull.Queue;
  queueEvents: Bull.QueueEvents;
}

export interface IQueueQueues {
  [queueKey: string]: IQueueQueue;
}

export interface IQueueCallback {
  info: any;
  callback: any;
}

export interface IQueueCallbacks {
  [jobId: string | number]: IQueueCallback;
}

export interface IQueueRecord {}

export interface IQueueExecute {
  execute(options: IDecoratorQueueOptions): Promise<boolean>;
}

export interface IDecoratorQueueOptions extends IMiddlewareBaseEnable {}
