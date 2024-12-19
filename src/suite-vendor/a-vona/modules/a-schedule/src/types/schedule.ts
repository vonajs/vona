import * as Bull from 'bullmq';
import { TypeQueueScheduleJobData, TypeQueueScheduleJobResult } from '../bean/queue.schedule.js';
import { IQueueJobContext, IQueueRecord } from 'vona-module-a-queue';
import { IOnionOptionsEnable, ServiceOnion } from 'vona-module-a-onion';
import { OmitNever } from 'vona';

export type TypeScheduleJob = Bull.Job<IQueueJobContext<TypeQueueScheduleJobData>, TypeQueueScheduleJobResult>;

export interface IScheduleExecute {
  execute(job?: TypeScheduleJob): Promise<void>;
}

export interface IScheduleRecord {}

export interface IDecoratorScheduleOptions extends IOnionOptionsEnable {
  queue?: keyof IQueueRecord;
  repeat: Bull.RepeatOptions;
  transaction?: boolean;
}

declare module 'vona-module-a-onion' {
  export interface BeanOnion {
    schedule: ServiceOnion<IDecoratorScheduleOptions, keyof IScheduleRecord>;
  }
}

declare module 'vona' {
  export interface ConfigOnions {
    schedule: OmitNever<IScheduleRecord>;
  }

  export interface IBeanSceneRecord {
    schedule: never;
  }
}
