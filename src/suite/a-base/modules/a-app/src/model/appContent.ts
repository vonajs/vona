import { Model } from '@cabloy/core';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityAppContent } from '../entity/appContent.js';

@Model({ table: 'aAppContent', options: { disableDeleted: false } })
export class ModelAppContent extends BeanModelBase<EntityAppContent> {}
