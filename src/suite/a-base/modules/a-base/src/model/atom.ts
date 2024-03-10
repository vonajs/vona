import { Model } from '@cabloy/core';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityAtom } from '../entity/atom.js';

@Model({
  table: 'aAtom',
  options: {
    disableDeleted: false,
    cacheKeyAux: 'atomClassId',
  },
})
export class ModelAtom extends BeanModelBase<EntityAtom> {}
