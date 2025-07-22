import type { IDecoratorModelOptions } from 'vona-module-a-database';
import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityVersionInit } from '../entity/versionInit.ts';

export interface IModelOptionsVersionInit extends IDecoratorModelOptions {}

@Model<IModelOptionsVersionInit>({
  entity: EntityVersionInit,
  disableInstance: true,
  disableDeleted: true,
})
export class ModelVersionInit extends BeanModelBase<EntityVersionInit> {}
