import { EntityBase } from 'vona';

export interface EntityTag extends EntityBase {
  atomClassId: number;
  language: string;
  tagName: string;
  tagAtomCount: number;
}
