import { EntityItemBase } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('aFile')
export class EntityFile extends EntityItemBase {
  userId: number;
  downloadId: string;
  mode: number;
  fileSize: number;
  width: number;
  height: number;
  filePath: string;
  fileName: string;
  realName: string;
  fileExt: string;
  encoding: string;
  mime: string;
  attachment: number;
  flag: string;
}
