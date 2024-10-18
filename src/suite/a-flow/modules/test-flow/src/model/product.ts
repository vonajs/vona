import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityProduct } from '../entity/product.js';

@Model({ table: 'testFlowProduct', options: { disableDeleted: false } })
export class ModelProduct extends BeanModelBase<EntityProduct> {}
