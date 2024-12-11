import * as Bull from 'bullmq';
import { IMiddlewareBaseEnable } from './middleware.js';

export interface IScheduleRecord {}

export interface IDecoratorScheduleOptions extends IMiddlewareBaseEnable {
  repeat: Bull.RepeatOptions;
  transaction?: boolean;
}
