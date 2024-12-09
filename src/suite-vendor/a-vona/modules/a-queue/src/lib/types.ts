import * as Bull from 'bullmq';
import Redlock from 'redlock';
import { ILocalInfos, IQueueRecord, VonaContext } from 'vona';

export interface IQueuePushOptions {
  locale?: keyof ILocalInfos;
  subdomain?: string | null | undefined;
  queueNameSub?: string;
  dbLevel?: number;
  ctxParent?: VonaContext;
}

export interface IQueueJobInfo<DATA> {
  queueName: keyof IQueueRecord;
  data: DATA;
  options?: IQueuePushOptions;
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
