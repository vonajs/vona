import { BeanModelKnex } from './bean.model_knex.js';

export class BeanModelCrud<TRecord extends {}, TResult> extends BeanModelKnex<TRecord, TResult> {}
