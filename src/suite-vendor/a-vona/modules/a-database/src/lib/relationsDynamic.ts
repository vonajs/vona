import type { Constructable } from 'vona';
import type { BeanModelMeta } from '../bean/bean.model/bean.model_meta.ts';
import type { TypeSymbolKeyEntity } from '../types/relations.ts';
import type { IModelRelationBelongsToDynamic, IModelRelationBelongsToManyDynamic, IModelRelationHasManyDynamic, IModelRelationHasOneDynamic, IModelRelationOptionsManyDynamic, IModelRelationOptionsOneDynamic } from '../types/relationsDefDynamic.ts';

function hasOne<MODEL extends BeanModelMeta, AUTOLOAD extends boolean = false>(
  classModel: (() => Constructable<MODEL>) | Constructable<MODEL>,
  key: keyof MODEL[TypeSymbolKeyEntity],
  options?: IModelRelationOptionsOneDynamic<MODEL, AUTOLOAD>,
): IModelRelationHasOneDynamic<MODEL, AUTOLOAD> {
  return { type: 'hasOne', model: classModel, key, options };
}

function belongsTo<MODELSelf extends BeanModelMeta, MODEL extends BeanModelMeta, AUTOLOAD extends boolean = false>(
  _classModelSelf: (() => Constructable<MODELSelf>) | Constructable<MODELSelf>,
  classModel: (() => Constructable<MODEL>) | Constructable<MODEL>,
  key: keyof MODELSelf[TypeSymbolKeyEntity],
  options?: IModelRelationOptionsOneDynamic<MODEL, AUTOLOAD>,
): IModelRelationBelongsToDynamic<MODELSelf, MODEL, AUTOLOAD> {
  return { type: 'belongsTo', model: classModel, key, options };
}

function hasMany<MODEL extends BeanModelMeta, AUTOLOAD extends boolean = false>(
  classModel: (() => Constructable<MODEL>) | Constructable<MODEL>,
  key: keyof MODEL[TypeSymbolKeyEntity],
  options?: IModelRelationOptionsManyDynamic<MODEL, AUTOLOAD>,
): IModelRelationHasManyDynamic<MODEL, AUTOLOAD> {
  options = options ?? {};
  return { type: 'hasMany', model: classModel, key, ...options };
}

function belongsToMany<MODELMiddle extends BeanModelMeta, MODEL extends BeanModelMeta, AUTOLOAD extends boolean = false>(
  classModelMiddle: (() => Constructable<MODELMiddle>) | Constructable<MODELMiddle>,
  classModel: (() => Constructable<MODEL>) | Constructable<MODEL>,
  keyFrom: keyof MODELMiddle[TypeSymbolKeyEntity],
  keyTo: keyof MODELMiddle[TypeSymbolKeyEntity],
  options?: IModelRelationOptionsManyDynamic<MODEL, AUTOLOAD>,
): IModelRelationBelongsToManyDynamic<MODELMiddle, MODEL, AUTOLOAD> {
  return { type: 'belongsToMany', modelMiddle: classModelMiddle, model: classModel, keyFrom, keyTo, options };
}

export const $relationDynamic = {
  hasOne,
  belongsTo,
  hasMany,
  belongsToMany,
};
