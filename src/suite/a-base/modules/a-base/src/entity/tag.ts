import { EntityBaseTemp } from 'vona-module-a-base';

export interface EntityTag extends EntityBaseTemp {
  atomClassId: number;
  language: string;
  tagName: string;
  tagAtomCount: number;
}
