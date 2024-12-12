import * as Bull from 'bullmq';
import { TypeQueueScheduleJobData, TypeQueueScheduleJobResult } from '../bean/queue.schedule.js';
import { IQueueJobContext } from 'vona-module-a-queue';
import { IMiddlewareBaseEnable, OmitNever, Onion } from 'vona';

export type TypeScheduleJob = Bull.Job<IQueueJobContext<TypeQueueScheduleJobData>, TypeQueueScheduleJobResult>;

export interface IScheduleExecute {
  execute(job?: TypeScheduleJob): Promise<void>;
}

export interface IScheduleRecord {}

export interface IDecoratorScheduleOptions extends IMiddlewareBaseEnable {
  repeat: Bull.RepeatOptions;
  transaction?: boolean;
}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    schedule: Onion<IDecoratorScheduleOptions, keyof IScheduleRecord>;
  }
}

declare module 'vona' {
  export interface ConfigOnions {
    schedule: OmitNever<IScheduleRecord>;
  }

  export interface ISceneCustomRecord {
    schedule: never;
  }
}
