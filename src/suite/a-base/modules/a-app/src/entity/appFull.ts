import { EntityItemBase } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('aAppViewFull')
export class EntityAppFull extends EntityItemBase {
  description: string;
  appSorting: number;
  appIcon: string;
  appIsolate: number;
  appLanguage: number;
  appCms: number;
  appHidden: number;
  content: string;
}
