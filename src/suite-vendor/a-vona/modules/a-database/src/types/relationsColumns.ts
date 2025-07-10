import type { TypeConfirmArray, TypeRecordValues } from 'vona';
import type { EntityPost, EntityPostMeta, ModelPost } from 'vona-module-test-vona';
import type { BeanModelMeta } from '../bean/bean.model/bean.model_meta.ts';
import type { IDecoratorModelOptions, IModelClassRecord } from './onion/model.ts';
import type { TypeSymbolKeyEntity, TypeSymbolKeyEntityMeta, TypeUtilGetModelOptions, TypeUtilGetRelationEntity, TypeUtilGetRelationEntityMeta } from './relations.ts';

export type TypeEntityTableColumnNames<EntityMeta extends { $table: string } | undefined> = EntityMeta extends { $table: string } ? (keyof { [K in keyof EntityMeta as K extends '$table' ? never : K extends string ? `${EntityMeta['$table']}.${K}` : never ]: EntityMeta[K] }) : never;
export type TypeEntityTableColumnNamesShort<Entity> = keyof Entity;

export type TypeEntityTableColumns<Entity extends {} | undefined, EntityMeta extends { $table: string } | undefined> = Entity extends { } ? EntityMeta extends { $table: string } ? { [K in keyof Entity as K extends string ? `${EntityMeta['$table']}.${K}` : never ]: Entity[K] } : {} : {};
export type TypeEntityTableColumnsShort<Entity> = Entity;

export type TypeEntityTableColumnNamesOfModels<A extends BeanModelMeta[]> = TypeEntityTableColumnNames<A[number][TypeSymbolKeyEntityMeta]>;

// export type TypeEntityTableColumnNamesOfModelOptions<TModelOptions extends IDecoratorModelOptions> = TypeEntityTableColumnNames<TypeRecordValues<{
//   [RelationName in keyof TModelOptions['relations']]: TypeUtilGetRelationEntityMeta<TModelOptions['relations'][RelationName]>;
// }>>;
export type TypeEntityTableColumnNamesOfModelOptions<TModelOptions extends IDecoratorModelOptions> = TypeRecordValues<{
  [RelationName in keyof TModelOptions['relations']]: TypeEntityTableColumnNames<TypeUtilGetRelationEntityMeta<TModelOptions['relations'][RelationName]>>;
}>;

export type TypeEntityTableColumnsOfModelOptions<TModelOptions extends IDecoratorModelOptions> = TypeRecordValues<{
  [RelationName in keyof TModelOptions['relations']]: TypeEntityTableColumns<TypeUtilGetRelationEntity<TModelOptions['relations'][RelationName]>, TypeUtilGetRelationEntityMeta<TModelOptions['relations'][RelationName]>>;
}>;

export type TypeEntityTableColumnNamesOfModelClass<TModel extends BeanModelMeta> =
  TypeEntityTableColumnNamesOfModelOptions<TypeUtilGetModelOptions<TModel>>;

export type TypeEntityTableColumnsOfModelClass<TModel extends BeanModelMeta> =
  TypeEntityTableColumnsOfModelOptions<TypeUtilGetModelOptions<TModel>>;

export type TypeEntityTableColumnNamesOfModelJoins<TModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[]> =
    TypeEntityTableColumnNames<IModelClassRecord[TypeConfirmArray<TModelJoins>[number]][TypeSymbolKeyEntityMeta]>;

export type TypeEntityTableColumnsOfModelJoins<TModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[]> =
    TypeEntityTableColumns<
      IModelClassRecord[TypeConfirmArray<TModelJoins>[number]][TypeSymbolKeyEntity],
      IModelClassRecord[TypeConfirmArray<TModelJoins>[number]][TypeSymbolKeyEntityMeta]
    >;

export type TypeEntityTableColumnNamesOfModelSelf<TModel extends BeanModelMeta> =
  TypeEntityTableColumnNames<TModel[TypeSymbolKeyEntityMeta]> | TypeEntityTableColumnNamesShort<TModel[TypeSymbolKeyEntity]>;

export type TypeEntityTableColumnsOfModelSelf<TModel extends BeanModelMeta> =
  TypeEntityTableColumns<TModel[TypeSymbolKeyEntity], TModel[TypeSymbolKeyEntityMeta]> & TypeEntityTableColumnsShort<TModel[TypeSymbolKeyEntity]>;

export type TypeEntityTableColumnNamesOfGeneral<
  TModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined,
  TModel extends BeanModelMeta,
> =
  TModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] ?
      (TypeEntityTableColumnNamesOfModelJoins<TModelJoins> | TypeEntityTableColumnNamesOfModelSelf<TModel>) :
      (TypeEntityTableColumnNamesOfModelClass<TModel> | TypeEntityTableColumnNamesOfModelSelf<TModel>);

export type TypeEntityTableColumnsOfGeneral<
  TModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined,
  TModel extends BeanModelMeta,
> =
  TModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] ?
      (TypeEntityTableColumnsOfModelJoins<TModelJoins> & TypeEntityTableColumnsOfModelSelf<TModel>) :
      (TypeEntityTableColumnsOfModelClass<TModel> & TypeEntityTableColumnsOfModelSelf<TModel>);

const a: TypeEntityTableColumns<EntityPost, EntityPostMeta['$table']>;
const b: TypeEntityTableColumnsOfModelJoins<'test-vona:post'>;
const c: TypeEntityTableColumnsOfModelSelf<ModelPost>;
const d: TypeEntityTableColumnsOfModelClass<ModelPost>;
