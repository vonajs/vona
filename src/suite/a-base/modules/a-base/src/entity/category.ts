import { EntityBase } from '@cabloy/core';

export interface EntityCategory extends EntityBase {
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
