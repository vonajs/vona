import * as Bull from 'bullmq';
import Redlock from 'redlock';
import { ILocalInfos, IQueueRecord, VonaContext } from 'vona';

export interface IQueuePushOptions {
  locale?: keyof ILocalInfos;
  subdomain?: string | null | undefined;
  queueNameSub?: string;
  dbLevel?: number;
  ctxParent?: VonaContext;
  jobName?: string;
  jobOptions?: Bull.JobsOptions;
}

export interface IQueueJobContext<DATA> {
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

export interface IQueueCallback<DATA, RESULT> {
  info: IQueueJobContext<DATA>;
  callback: (err: Error | undefined, data: RESULT | undefined) => void;
}

export interface IQueueCallbacks {
  [jobId: string | number]: IQueueCallback<unknown, unknown>;
}
