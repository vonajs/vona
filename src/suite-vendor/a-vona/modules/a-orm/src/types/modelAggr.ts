import type { BeanModelMeta } from '../bean/bean.model/bean.model_meta.ts';
import type { TypeModelColumns } from './modelWhere.ts';

export type TypeModelSelectGeneralParamsAggrs<TRecord, Model extends BeanModelMeta | undefined = undefined> =
  Model extends BeanModelMeta ? {
    count: TypeModelColumns<TRecord>;
  } : never;
