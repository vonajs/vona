import { EntityItemBase } from 'vona-module-a-base';
import { Entity } from 'vona-module-a-database';

@Entity('aCmsArticle')
export class EntityArticle extends EntityItemBase {
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
