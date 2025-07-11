import type { TypeConfirmArray, TypeRecordValues } from 'vona';
import type { BeanModelMeta } from '../bean/bean.model/bean.model_meta.ts';
import type { IDecoratorModelOptions, IModelClassRecord } from './onion/model.ts';
import type { TypeSymbolKeyEntityMeta, TypeUtilGetModelOptions, TypeUtilGetRelationEntityMeta } from './relations.ts';

export type TypeEntityTableNames<EntityMeta extends { $table: string } | undefined> =
  EntityMeta extends { $table: infer TableName } ? TableName : never;

export type TypeEntityTableNamesOfModelOptions<TModelOptions extends IDecoratorModelOptions> =
  TModelOptions['relations'] extends {} ?
    TypeRecordValues<{
      [RelationName in keyof TModelOptions['relations']]: TypeEntityTableNames<TypeUtilGetRelationEntityMeta<TModelOptions['relations'][RelationName]>>;
    }> : never;

export type TypeEntityTableNamesOfModelJoins<TModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[]> =
    TypeEntityTableNames<IModelClassRecord[TypeConfirmArray<TModelJoins>[number]][TypeSymbolKeyEntityMeta]>;

export type TypeEntityTableNamesOfModelClass<TModel extends BeanModelMeta> =
  TypeEntityTableNamesOfModelOptions<TypeUtilGetModelOptions<TModel>>;

export type TypeEntityTableNamesOfGeneral<
  TModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined,
  TModel extends BeanModelMeta,
> =
  TModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] ?
    TypeEntityTableNamesOfModelJoins<TModelJoins> :
    TypeEntityTableNamesOfModelClass<TModel>;
