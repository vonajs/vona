import { EntityItemBase } from '@cabloy/core';

export interface EntityAppFull extends EntityItemBase {
  description: string;
  appSorting: number;
  appIcon: string;
  appIsolate: number;
  appLanguage: number;
  appCms: number;
  appHidden: number;
  content: string;
}
