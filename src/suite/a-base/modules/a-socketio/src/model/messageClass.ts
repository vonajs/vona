import { Model } from '@cabloy/core';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityMessageClass } from '../entity/messageClass.js';

@Model({
  table: 'aSocketIOMessageClass',
  options: {
    disableDeleted: false,
  },
})
export class ModelMessageClass extends BeanModelBase<EntityMessageClass> {}
