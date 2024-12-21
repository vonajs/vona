import { IBeanRecordGeneral, VonaApplication } from 'vona';

export const config = (_app: VonaApplication) => {
  return {
    passportAdapter: 'home-user.service.passportAdapter' as keyof IBeanRecordGeneral,
  };
};
