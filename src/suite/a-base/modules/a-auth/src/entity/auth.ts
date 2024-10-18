import { EntityBase } from 'vona';

export interface EntityAuth extends EntityBase {
  userId: number;
  providerId: number;
  profileId: string;
  profile: string;
  providerScene: string;
}
