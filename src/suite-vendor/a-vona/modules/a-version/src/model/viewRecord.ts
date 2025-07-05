import type { IDecoratorModelOptions } from 'vona-module-a-database';
import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityViewRecord } from '../entity/viewRecord.ts';

export interface IModelOptionsViewRecord extends IDecoratorModelOptions {}

@Model<IModelOptionsViewRecord>({ entity: EntityViewRecord, disableDeleted: false, disableInstance: true })
export class ModelViewRecord extends BeanModelBase<EntityViewRecord> {}
