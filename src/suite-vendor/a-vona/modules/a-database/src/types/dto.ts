import type { BeanModelMeta } from '../bean/bean.model/bean.model_meta.ts';
import type { IModelRelationIncludeWrapper } from './model.ts';
import type { TypeModelColumns } from './modelWhere.ts';
import type { IModelClassRecord } from './onion/model.ts';
import type { TypeModelRelationResult, TypeSymbolKeyEntity } from './relations.ts';

export type IDtoComposeParams<
  // not use undefined as default value
  TModel extends (keyof IModelClassRecord),
> = IBuildDtoComposeParams<
  IModelClassRecord[TModel][TypeSymbolKeyEntity],
  IModelClassRecord[TModel]
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
  ModelName extends (keyof IModelClassRecord),
  TOptionsRelation,
> =
TypeModelRelationResult<
  IModelClassRecord[ModelName][TypeSymbolKeyEntity],
  IModelClassRecord[ModelName],
  TOptionsRelation
>;
