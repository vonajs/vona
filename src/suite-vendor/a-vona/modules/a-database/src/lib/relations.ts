import type { Constructable } from 'vona';
import type { BeanModelMeta } from '../bean/bean.model/bean.model_meta.ts';
import type { TypeModelColumn } from '../types/modelWhere.ts';
import type { IModelClassRecord } from '../types/onion/model.ts';
import type { TypeSymbolKeyEntity } from '../types/relations.ts';
import type { IModelRelationOptionsMany, IModelRelationOptionsOne } from '../types/relationsDef.ts';

function hasOne<
  MODEL extends BeanModelMeta,
  AUTOLOAD extends boolean = false,
  COLUMNS extends TypeModelColumn<MODEL[TypeSymbolKeyEntity]> = TypeModelColumn<MODEL[TypeSymbolKeyEntity]>,
>(
  classModel: (() => Constructable<MODEL>) | Constructable<MODEL>,
  key: keyof MODEL[TypeSymbolKeyEntity],
  options?: IModelRelationOptionsOne<MODEL, AUTOLOAD, COLUMNS>,
): any { // :  IModelRelationHasOne<MODEL, AUTOLOAD, COLUMNS> {
  return { type: 'hasOne', model: classModel, key, options };
}

function belongsTo<
  MODELSelf extends BeanModelMeta,
  MODEL extends BeanModelMeta,
  AUTOLOAD extends boolean = false,
  COLUMNS extends TypeModelColumn<MODEL[TypeSymbolKeyEntity]> = TypeModelColumn<MODEL[TypeSymbolKeyEntity]>,
>(
  _classModelSelf: (() => Constructable<MODELSelf>) | Constructable<MODELSelf>,
  classModel: (() => Constructable<MODEL>) | Constructable<MODEL>,
  key: keyof MODELSelf[TypeSymbolKeyEntity],
  options?: IModelRelationOptionsOne<MODEL, AUTOLOAD, COLUMNS>,
): any { // : IModelRelationBelongsTo<MODELSelf, MODEL, AUTOLOAD, COLUMNS> {
  return { type: 'belongsTo', model: classModel, key, options };
}

function hasMany<
  MODEL extends BeanModelMeta,
  AUTOLOAD extends boolean = boolean,
  COLUMNS extends TypeModelColumn<MODEL[TypeSymbolKeyEntity]> = TypeModelColumn<MODEL[TypeSymbolKeyEntity]>,
  OPTIONS extends IModelRelationOptionsMany<MODEL, AUTOLOAD, COLUMNS, ModelJoins> | undefined = undefined,
  ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined,
>(
  classModel: (() => Constructable<MODEL>) | Constructable<MODEL>,
  key: keyof MODEL[TypeSymbolKeyEntity],
  options?: OPTIONS,
  _modelJoins?: ModelJoins,
): any { // : IModelRelationHasMany<MODEL, AUTOLOAD, COLUMNS, ModelJoins> {
  return { type: 'hasMany', model: classModel, key, options };
}

function belongsToMany<
  MODELMiddle extends BeanModelMeta,
  MODEL extends BeanModelMeta,
  AUTOLOAD extends boolean = boolean,
  COLUMNS extends TypeModelColumn<MODEL[TypeSymbolKeyEntity]> = TypeModelColumn<MODEL[TypeSymbolKeyEntity]>,
  OPTIONS extends IModelRelationOptionsMany<MODEL, AUTOLOAD, COLUMNS, ModelJoins> | undefined = undefined,
  ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined,
>(
  classModelMiddle: (() => Constructable<MODELMiddle>) | Constructable<MODELMiddle>,
  classModel: (() => Constructable<MODEL>) | Constructable<MODEL>,
  keyFrom: keyof MODELMiddle[TypeSymbolKeyEntity],
  keyTo: keyof MODELMiddle[TypeSymbolKeyEntity],
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
