import { EntityItemBase } from 'vona-module-a-base';

export interface EntityShare extends EntityItemBase {
  uuid: string;
  userId: number;
  host: string;
  url: string;
}
