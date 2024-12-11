import * as Bull from 'bullmq';
import Redlock from 'redlock';
import { ILocalInfos, IQueueRecord } from 'vona';
import { INewCtxExtraData } from 'vona-module-a-executor';

export interface IQueuePushOptions {
  queueNameSub?: string;
  locale?: keyof ILocalInfos;
  subdomain?: string | null | undefined;
  dbLevel?: number;
  extraData?: INewCtxExtraData;
  jobName?: string;
  jobOptions?: Bull.JobsOptions;
}

export type TypeQueueJob<DATA = unknown, RESULT = unknown> = Bull.Job<IQueueJobContext<DATA>, RESULT>;
export interface IQueueExecute<DATA = unknown, RESULT = unknown> {
  execute(data: DATA, options?: IQueuePushOptions, job?: TypeQueueJob<DATA, RESULT>): Promise<RESULT>;
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
