import { Model } from '@cabloy/core';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityLayoutContent } from '../entity/layoutContent.js';

@Model({ table: 'aLayoutContent', options: { disableDeleted: false } })
export class ModelLayoutContent extends BeanModelBase<EntityLayoutContent> {}
