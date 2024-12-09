import * as Bull from 'bullmq';
import { IMiddlewareBaseEnable } from './middleware.js';

export interface IScheduleJobContext {
  job: Bull.Job;
  data: {
    subdomain: string;
    module: string;
    name: string;
  };
  queueNameSub: string | undefined;
}

export interface IScheduleRecord {}

export interface IScheduleExecute {
  execute(options: IScheduleExecuteOptions): Promise<void>;
}

export interface IDecoratorScheduleOptions extends IMiddlewareBaseEnable {
  repeat: IScheduleJobRepeat;
  transaction?: boolean;
}

export interface IScheduleJobRepeat {
  every?: number;
  cron?: string;
}

export interface IScheduleJobData {
  jobOptions: {
    repeat: IScheduleJobRepeat;
  };
}

export interface IScheduleExecuteOptions {
  job: Bull.Job<IScheduleJobData>;
}
