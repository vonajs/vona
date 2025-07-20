import type { BeanModelMeta } from '../bean/bean.model/bean.model_meta.ts';
import type { IModelRelationIncludeWrapper } from './model.ts';
import type { TypeModelColumns } from './modelWhere.ts';
import type { IModelClassRecord } from './onion/model.ts';
import type { TypeModelRelationResult, TypeSymbolKeyEntity } from './relations.ts';

export type TypeModelOfModelLike<ModelLike extends BeanModelMeta | (keyof IModelClassRecord)> =
  ModelLike extends (keyof IModelClassRecord) ? IModelClassRecord[ModelLike] : ModelLike;

export type IDtoComposeParams<
  ModelLike extends BeanModelMeta | (keyof IModelClassRecord),
> = IBuildDtoComposeParams<
  TypeModelOfModelLike<ModelLike>[TypeSymbolKeyEntity],
  TypeModelOfModelLike<ModelLike>
>;

export interface IBuildDtoComposeParams<
  TRecord,
  Model extends BeanModelMeta,
> extends
  IModelRelationIncludeWrapper<Model>,
  IBuildDtoComposeParamsBasic<TRecord> {}

export interface IBuildDtoComposeParamsBasic<
  TRecord,
> {
  columns?: TypeModelColumns<TRecord>;
}

export type TypeDtoComposeResult<
  ModelLike extends BeanModelMeta | (keyof IModelClassRecord),
  TOptionsRelation,
> =
TypeModelRelationResult<
  TypeModelOfModelLike<ModelLike>[TypeSymbolKeyEntity],
  TypeModelOfModelLike<ModelLike>,
  TOptionsRelation
>;
