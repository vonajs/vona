import { VonaApplication } from 'vona';
import * as Bull from 'bullmq';

export const config = (_app: VonaApplication) => {
  return {
    schedule: {
      templateOptions: {} as Bull.JobSchedulerTemplateOptions,
    },
  };
};
