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
export class ModelAtom extends BeanModelBase<EntityAtom> {
  // async get(where, ...args) {
  //   const debug = app.bean.debug.get('atom');
  //   debug('atom get: ', where);
  //   const res = await super.get(where, ...args);
  //   debug('atom get end: ', where, res.atomName);
  //   return res;
  // }
}
