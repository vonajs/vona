import { Model } from '@cabloy/core';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityFileView } from '../entity/fileView.js';

@Model({ table: 'aViewFile', options: { disableDeleted: false } })
export class ModelFileView extends BeanModelBase<EntityFileView> {}
