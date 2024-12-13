import { EntityItemBase } from 'vona-module-a-base';
import { Entity } from 'vona-module-a-database';

@Entity('aViewFile')
export class EntityFileView extends EntityItemBase {
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
  userName: string;
  avatar: string;
  downloadUrl: string; // virtual
}
