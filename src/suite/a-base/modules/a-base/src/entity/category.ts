import { EntityBaseTemp } from 'vona-module-a-base';
import { Entity } from 'vona-module-a-database';

@Entity('aCategory')
export class EntityCategory extends EntityBaseTemp {
  atomClassId: number;
  language: string;
  categoryName: string;
  categoryNameLocale: string; // virtual field
  categoryCatalog: number;
  categoryHidden: number;
  categorySorting: number;
  categoryFlag: string;
  categoryIdParent: number;
  categoryUrl: string;
}
