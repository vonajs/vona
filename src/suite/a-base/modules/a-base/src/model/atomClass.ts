import { Model } from '@cabloy/core';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityAtomClass } from '../entity/atomClass.js';

@Model({
  table: 'aAtomClass',
  options: {
    disableDeleted: false,
  },
})
export class ModelAtomClass extends BeanModelBase<EntityAtomClass> {}
