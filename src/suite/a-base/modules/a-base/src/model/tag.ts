import { Model } from '@cabloy/core';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityTag } from '../entity/tag.js';

@Model({ table: 'aTag', options: { disableDeleted: false } })
export class ModelTag extends BeanModelBase<EntityTag> {}
