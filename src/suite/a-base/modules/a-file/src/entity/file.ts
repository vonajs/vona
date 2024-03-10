import { EntityItemBase } from '@cabloy/core';

export interface EntityFile extends EntityItemBase {
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
