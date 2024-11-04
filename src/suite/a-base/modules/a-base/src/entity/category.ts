import { EntityBaseTemp } from 'vona-module-a-base';

export interface EntityCategory extends EntityBaseTemp {
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
