import { EntityBase } from '@cabloy/core';

export interface EntityCategory extends EntityBase {
  atomClassId: number;
  language: string;
  categoryName: string;
  categoryCatalog: number;
  categoryHidden: number;
  categorySorting: number;
  categoryFlag: string;
  categoryIdParent: number;
  categoryUrl: string;
}
