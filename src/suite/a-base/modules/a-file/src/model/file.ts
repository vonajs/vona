import { Model } from '@cabloy/core';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityFile } from '../entity/file.js';

@Model({ table: 'aFile', options: { disableDeleted: false } })
export class ModelFile extends BeanModelBase<EntityFile> {}
