import { EntityItemBase } from 'vona';

export interface EntityShare extends EntityItemBase {
  uuid: string;
  userId: number;
  host: string;
  url: string;
}
