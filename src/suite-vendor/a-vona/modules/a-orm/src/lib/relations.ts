import type { BeanModelMeta } from '../bean/bean.model/bean.model_meta.ts';
import type { TypeModelSelectAggrParamsAggrs } from '../types/modelAggr.ts';
import type { TypeModelColumn, TypeModelColumnsStrict } from '../types/modelWhere.ts';
import type { IModelClassRecord } from '../types/onion/model.ts';
import type { TypeModelClassLike, TypeModelOfModelLike, TypeSymbolKeyEntity } from '../types/relations.ts';
import type { IModelRelationOptionsMany, IModelRelationOptionsOne } from '../types/relationsDef.ts';

function hasOne<
  MODEL extends BeanModelMeta | (keyof IModelClassRecord),
  AUTOLOAD extends boolean = false,
  COLUMNS
  extends TypeModelColumn<TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity]> = TypeModelColumn<TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity]>,
>(
  classModel: TypeModelClassLike<MODEL>,
  key: keyof TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity],
  options?: IModelRelationOptionsOne<TypeModelOfModelLike<MODEL>, AUTOLOAD, COLUMNS>,
): any { // :  IModelRelationHasOne<MODEL, AUTOLOAD, COLUMNS> {
  return { type: 'hasOne', model: classModel, key, options };
}

function belongsTo<
  MODELSelf extends BeanModelMeta | (keyof IModelClassRecord),
  MODEL extends BeanModelMeta | (keyof IModelClassRecord),
  AUTOLOAD extends boolean = false,
  COLUMNS
  extends TypeModelColumn<TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity]> = TypeModelColumn<TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity]>,
>(
  _classModelSelf: TypeModelClassLike<MODELSelf>,
  classModel: TypeModelClassLike<MODEL>,
  key: keyof TypeModelOfModelLike<MODELSelf>[TypeSymbolKeyEntity],
  options?: IModelRelationOptionsOne<TypeModelOfModelLike<MODEL>, AUTOLOAD, COLUMNS>,
): any { // : IModelRelationBelongsTo<MODELSelf, MODEL, AUTOLOAD, COLUMNS> {
  return { type: 'belongsTo', model: classModel, key, options };
}

function hasMany<
  MODEL extends BeanModelMeta | (keyof IModelClassRecord),
  AUTOLOAD extends boolean = boolean,
  COLUMNS
  extends TypeModelColumn<TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity]> = TypeModelColumn<TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity]>,
  ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined,
  Aggrs extends TypeModelSelectAggrParamsAggrs<
    TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity]
  > | undefined = undefined, // TypeModelSelectAggrParamsAggrs<TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity]>,
  Groups extends TypeModelColumnsStrict<
    TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity]
  > | undefined = undefined, // TypeModelColumnsStrict<TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity]>,
>(
  classModel: TypeModelClassLike<MODEL>,
  key: keyof TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity],
  options?: IModelRelationOptionsMany<TypeModelOfModelLike<MODEL>, AUTOLOAD, COLUMNS, ModelJoins, Aggrs, Groups>,
  _modelJoins?: ModelJoins,
  _aggrs?: Aggrs,
  _groups?: Groups,
): any { // : IModelRelationHasMany<MODEL, AUTOLOAD, COLUMNS, ModelJoins> {
  return { type: 'hasMany', model: classModel, key, options };
}

function belongsToMany<
  MODELMiddle extends BeanModelMeta | (keyof IModelClassRecord),
  MODEL extends BeanModelMeta | (keyof IModelClassRecord),
  AUTOLOAD extends boolean = boolean,
  COLUMNS
  extends TypeModelColumn<TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity]> = TypeModelColumn<TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity]>,
  ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined,
  Aggrs extends TypeModelSelectAggrParamsAggrs<
    TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity]
  > | undefined = undefined, // TypeModelSelectAggrParamsAggrs<TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity]>,
  Groups extends TypeModelColumnsStrict<
    TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity]
  > | undefined = undefined, // TypeModelColumnsStrict<TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity]>,
>(
  classModelMiddle: TypeModelClassLike<MODELMiddle>,
  classModel: TypeModelClassLike<MODEL>,
  keyFrom: keyof TypeModelOfModelLike<MODELMiddle>[TypeSymbolKeyEntity],
  keyTo: keyof TypeModelOfModelLike<MODELMiddle>[TypeSymbolKeyEntity],
  options?: IModelRelationOptionsMany<TypeModelOfModelLike<MODEL>, AUTOLOAD, COLUMNS, ModelJoins, Aggrs, Groups>,
  _modelJoins?: ModelJoins,
  _aggrs?: Aggrs,
  _groups?: Groups,
): any { // : IModelRelationBelongsToMany<MODELMiddle, MODEL, AUTOLOAD, COLUMNS, ModelJoins> {
  return { type: 'belongsToMany', modelMiddle: classModelMiddle, model: classModel, keyFrom, keyTo, options };
}

export const $relation = {
  hasOne,
  belongsTo,
  hasMany,
  belongsToMany,
};

// function hasMany<
//   MODEL extends BeanModelMeta | (keyof IModelClassRecord),
//   AUTOLOAD extends boolean = boolean,
//   COLUMNS
//   extends TypeModelColumn<TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity]> = TypeModelColumn<TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity]>,
//   ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined,
//   Aggrs extends TypeModelSelectAggrParamsAggrs<
//     TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity]
//   > | undefined = undefined, // TypeModelSelectAggrParamsAggrs<TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity]>,
//   Groups extends TypeModelColumnsStrict<
//     TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity]
//   > | undefined = undefined, // TypeModelColumnsStrict<TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity]>,
// >(
//   classModel: TypeModelClassLike<MODEL>,
//   key: keyof TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity],
//   options?: IModelRelationOptionsMany<TypeModelOfModelLike<MODEL>, AUTOLOAD, COLUMNS, ModelJoins, Aggrs, Groups>,
//   _modelJoins?: ModelJoins,
//   _aggrs?: Aggrs,
//   _groups?: Groups,
// ): any { // : IModelRelationHasMany<MODEL, AUTOLOAD, COLUMNS, ModelJoins> {
//   return { type: 'hasMany', model: classModel, key, options };
// }

// function belongsToMany<
//   MODELMiddle extends BeanModelMeta | (keyof IModelClassRecord),
//   MODEL extends BeanModelMeta | (keyof IModelClassRecord),
//   AUTOLOAD extends boolean = boolean,
//   COLUMNS
//   extends TypeModelColumn<TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity]> = TypeModelColumn<TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity]>,
//   ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined,
//   Aggrs extends TypeModelSelectAggrParamsAggrs<
//     TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity]
//   > | undefined = undefined, // TypeModelSelectAggrParamsAggrs<TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity]>,
//   Groups extends TypeModelColumnsStrict<
//     TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity]
//   > | undefined = undefined, // TypeModelColumnsStrict<TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity]>,
// >(
//   classModelMiddle: TypeModelClassLike<MODELMiddle>,
//   classModel: TypeModelClassLike<MODEL>,
//   keyFrom: keyof TypeModelOfModelLike<MODELMiddle>[TypeSymbolKeyEntity],
//   keyTo: keyof TypeModelOfModelLike<MODELMiddle>[TypeSymbolKeyEntity],
//   options?: IModelRelationOptionsMany<TypeModelOfModelLike<MODEL>, AUTOLOAD, COLUMNS, ModelJoins, Aggrs, Groups>,
//   _modelJoins?: ModelJoins,
//   _aggrs?: Aggrs,
//   _groups?: Groups,
// ): any { // : IModelRelationBelongsToMany<MODELMiddle, MODEL, AUTOLOAD, COLUMNS, ModelJoins> {
//   return { type: 'belongsToMany', modelMiddle: classModelMiddle, model: classModel, keyFrom, keyTo, options };
// }
