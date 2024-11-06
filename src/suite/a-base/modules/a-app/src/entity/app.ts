import { EntityItemBase } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('aApp')
export class EntityApp extends EntityItemBase {
  description: string;
  appSorting: number;
  appIcon: string;
  appIsolate: number;
  appLanguage: number;
  appCms: number;
  appHidden: number;
}
