import type { Constructable } from 'vona';
import type { BeanModelMeta } from '../bean/bean.model/bean.model_meta.ts';
import type { TypeModelColumn } from '../types/modelWhere.ts';
import type { IModelClassRecord } from '../types/onion/model.ts';
import type { TypeModelOfModelLike, TypeSymbolKeyEntity } from '../types/relations.ts';
import type { IModelRelationOptionsMany, IModelRelationOptionsOne } from '../types/relationsDef.ts';

function hasOne<
  MODEL extends BeanModelMeta | (keyof IModelClassRecord),
  AUTOLOAD extends boolean = false,
  COLUMNS
  extends TypeModelColumn<TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity]> = TypeModelColumn<TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity]>,
>(
  classModel: MODEL extends BeanModelMeta ? ((() => Constructable<MODEL>) | Constructable<MODEL>) : MODEL,
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
  _classModelSelf: MODELSelf extends BeanModelMeta ? ((() => Constructable<MODELSelf>) | Constructable<MODELSelf>) : MODELSelf,
  classModel: MODEL extends BeanModelMeta ? ((() => Constructable<MODEL>) | Constructable<MODEL>) : MODEL,
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
  OPTIONS extends IModelRelationOptionsMany<TypeModelOfModelLike<MODEL>, AUTOLOAD, COLUMNS, ModelJoins> | undefined = undefined,
  ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined,
>(
  classModel: MODEL extends BeanModelMeta ? ((() => Constructable<MODEL>) | Constructable<MODEL>) : MODEL,
  key: keyof TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity],
  options?: OPTIONS,
  _modelJoins?: ModelJoins,
): any { // : IModelRelationHasMany<MODEL, AUTOLOAD, COLUMNS, ModelJoins> {
  return { type: 'hasMany', model: classModel, key, options };
}

function belongsToMany<
  MODELMiddle extends BeanModelMeta | (keyof IModelClassRecord),
  MODEL extends BeanModelMeta | (keyof IModelClassRecord),
  AUTOLOAD extends boolean = boolean,
  COLUMNS
  extends TypeModelColumn<TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity]> = TypeModelColumn<TypeModelOfModelLike<MODEL>[TypeSymbolKeyEntity]>,
  OPTIONS extends IModelRelationOptionsMany<TypeModelOfModelLike<MODEL>, AUTOLOAD, COLUMNS, ModelJoins> | undefined = undefined,
  ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined,
>(
  classModelMiddle: MODELMiddle extends BeanModelMeta ? ((() => Constructable<MODELMiddle>) | Constructable<MODELMiddle>) : MODELMiddle,
  classModel: MODEL extends BeanModelMeta ? ((() => Constructable<MODEL>) | Constructable<MODEL>) : MODEL,
  keyFrom: keyof TypeModelOfModelLike<MODELMiddle>[TypeSymbolKeyEntity],
  keyTo: keyof TypeModelOfModelLike<MODELMiddle>[TypeSymbolKeyEntity],
  options?: OPTIONS,
  _modelJoins?: ModelJoins,
): any { // : IModelRelationBelongsToMany<MODELMiddle, MODEL, AUTOLOAD, COLUMNS, ModelJoins> {
  return { type: 'belongsToMany', modelMiddle: classModelMiddle, model: classModel, keyFrom, keyTo, options };
}

export const $relation = {
  hasOne,
  belongsTo,
  hasMany,
  belongsToMany,
};
