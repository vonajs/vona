import * as Bull from 'bullmq';
export * as Bull from 'bullmq';

export interface IScheduleJobContext {
  job: Bull.Job;
  data: {
    subdomain: string;
    module: string;
    name: string;
  };
  queueNameSub: string | undefined;
}
