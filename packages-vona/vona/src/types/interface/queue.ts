import bull from 'bullmq';
import Redlock from 'redlock';

export interface IQueueJobContext {
  job: bull.Job;
  data: any;
  queueNameSub: string | undefined;
}

export interface IQueueWork {
  redlock: Redlock;
  worker: bull.Worker;
}
export interface IQueueWorks {
  [queueKey: string]: IQueueWork;
}

export interface IQueueQueue {
  queue: bull.Queue;
  queueEvents: bull.QueueEvents;
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
