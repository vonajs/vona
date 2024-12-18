import { Virtual } from 'vona';
import { BeanModelCache } from './bean.model/bean.model_cache.js';

@Virtual()
export class BeanModelBase<TRecord extends {} = any> extends BeanModelCache<TRecord> {}
