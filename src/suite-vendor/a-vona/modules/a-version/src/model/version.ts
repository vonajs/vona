import type { IDecoratorModelOptions } from 'vona-module-a-database';
import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityVersion } from '../entity/version.ts';

export interface IModelOptionsVersion extends IDecoratorModelOptions {}

@Model<IModelOptionsVersion>({
  entity: EntityVersion,
  disableInstance: true,
  disableDeleted: true,
})
export class ModelVersion extends BeanModelBase<EntityVersion> {}
