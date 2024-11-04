import { EntityItemBase } from 'vona-module-a-base';

export interface EntityArticle extends EntityItemBase {
  sticky: number;
  keywords: string;
  description: string;
  summary: string;
  url: string;
  editMode: number;
  slug: string;
  sorting: number;
  flag: string;
  extra: string;
  imageFirst: string;
  audioFirst: string;
  audioCoverFirst: string;
  uuid: string;
  imageCover: string;
  renderAt: Date;
}
