import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityProduct } from '../entity/product.js';

@Model({ entity: EntityProduct, disableDeleted: false })
export class ModelProduct extends BeanModelBase<EntityProduct> {}
