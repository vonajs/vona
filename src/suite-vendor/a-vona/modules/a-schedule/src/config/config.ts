import type { VonaApplication } from 'vona';
import type * as Bull from 'bullmq';

export const config = (_app: VonaApplication) => {
  return {
    schedule: {
      templateOptions: {} as Bull.JobSchedulerTemplateOptions,
    },
  };
};
