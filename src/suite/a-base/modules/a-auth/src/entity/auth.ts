import { EntityBaseTemp } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('aAuth')
export class EntityAuth extends EntityBaseTemp {
  userId: number;
  providerId: number;
  profileId: string;
  profile: string;
  providerScene: string;
}
