import {} from '@cabloy/core';

export interface EntityTag extends EntityBase {
  atomClassId: number;
  language: string;
  tagName: string;
  tagAtomCount: number;
}
