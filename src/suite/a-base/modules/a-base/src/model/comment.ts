import { Model } from '@cabloy/core';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityComment } from '../entity/comment.js';

@Model({ table: 'aComment', options: { disableDeleted: false } })
export class ModelComment extends BeanModelBase<EntityComment> {}
