import * as Bull from 'bullmq';
import Redlock from 'redlock';
import { ILocalInfos, OmitNever } from 'vona';
import { INewCtxExtraData } from 'vona-module-a-executor';
import { IOnionOptionsEnable, ServiceOnion } from 'vona-module-a-onion';

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
  config: IDecoratorQueueOptions;
  options: Bull.QueueOptions;
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

export interface IQueueRecord {}

export interface IDecoratorQueueOptions extends IOnionOptionsEnable {
  concurrency?: boolean;
  transaction?: boolean;
  options?: {
    queue?: Bull.QueueOptions;
    worker?: Bull.WorkerOptions;
    redlock?: Redlock.Options & { lockTTL?: number };
    job?: Bull.JobsOptions;
  };
}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    queue: ServiceOnion<IDecoratorQueueOptions, keyof IQueueRecord>;
  }
}

declare module 'vona' {
  export interface ConfigOnions {
    queue: OmitNever<IQueueRecord>;
  }

  export interface IBeanSceneRecord {
    queue: never;
  }
}
