import type { BeanModelMeta } from '../bean/bean.model/bean.model_meta.ts';
import type { IModelRelationIncludeWrapper } from './model.ts';

export interface IModelRelationOptionsOneMutate<MODEL extends BeanModelMeta>
  extends IModelRelationIncludeWrapper<MODEL> {}

export interface IModelRelationOptionsManyMutate<MODEL extends BeanModelMeta>
  extends IModelRelationIncludeWrapper<MODEL> {}
