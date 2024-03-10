import { Model } from '@cabloy/core';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityDictContent } from '../entity/dictContent.js';

@Model({ table: 'aDictContent', options: { disableDeleted: false } })
export class ModelDictContent extends BeanModelBase<EntityDictContent> {}
