import { EntityBaseTemp } from 'vona-module-a-base';
import { Entity } from 'vona-module-a-database';

@Entity('aTag')
export class EntityTag extends EntityBaseTemp {
  atomClassId: number;
  language: string;
  tagName: string;
  tagAtomCount: number;
}
