import type { BeanModelMeta } from '../../bean/bean.model/bean.model_meta.ts';
import type { IModelRelationIncludeWrapper } from '../model.ts';
import type { TypeModelColumnsStrict } from '../modelWhere.ts';
import type { IModelClassRecord } from '../onion/model.ts';
import type { TypeModelOfModelLike, TypeSymbolKeyEntity } from '../relations.ts';
import type { TypeModelMutateRelationData } from '../relationsMutate.ts';

export type TypeDtoMutateType = 'create' | 'update' | 'mutate';

export type IDtoMutateParams<
  ModelLike extends BeanModelMeta | (keyof IModelClassRecord),
> = IBuildDtoMutateParams<
  TypeModelOfModelLike<ModelLike>[TypeSymbolKeyEntity],
  TypeModelOfModelLike<ModelLike>
>;

export interface IBuildDtoMutateParams<
  TRecord,
  Model extends BeanModelMeta,
> extends
  IModelRelationIncludeWrapper<Model>,
  IBuildDtoMutateParamsBasic<TRecord> {}

export interface IBuildDtoMutateParamsBasic<
  TRecord,
> {
  columns?: TypeModelColumnsStrict<TRecord>;
}

export type TypeDtoMutateResult<
  ModelLike extends BeanModelMeta | (keyof IModelClassRecord),
  TOptionsRelation,
> =
TypeModelMutateRelationData<
  TypeModelOfModelLike<ModelLike>[TypeSymbolKeyEntity],
  TypeModelOfModelLike<ModelLike>,
  TOptionsRelation
>;
