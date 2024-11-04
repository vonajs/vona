import { EntityBaseTemp } from 'vona-module-a-base';

export interface EntityAuth extends EntityBaseTemp {
  userId: number;
  providerId: number;
  profileId: string;
  profile: string;
  providerScene: string;
}
