import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityAtom } from '../entity/atom.js';

@Model({
  entity: EntityAtom,
  disableDeleted: false,
  cacheKeyAux: 'atomClassId',
})
export class ModelAtom extends BeanModelBase<EntityAtom> {}
