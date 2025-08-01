import type { BeanModelCache } from '../bean/bean.model/bean.model_cache.ts';
import type { BeanModelCrud } from '../bean/bean.model/bean.model_crud.ts';
import type { IModelMethodOptions, IModelRelationIncludeWrapper } from '../types/model.ts';
import type { TypeModelClassLike } from '../types/relationsDef.ts';
import { isNil } from '@cabloy/utils';
import { BeanBase, cast, deepExtend } from 'vona';
import { Service } from 'vona-module-a-bean';

@Service()
export class ServiceRelations extends BeanBase {
  protected _model: BeanModelCache;

  protected __init__(model: BeanModelCache) {
    this._model = model;
  }

  public async handleRelationsOne<TRecord extends {}>(
    entity: TRecord | undefined,
    includeWrapper?: IModelRelationIncludeWrapper,
    methodOptions?: IModelMethodOptions,
  ) {
    if (!entity) return entity;
    // relations
    const relations = this.__handleRelationsCollection(includeWrapper);
    if (!relations) return entity;
    for (const relation of relations) {
      await this.__handleRelationOne(entity, relation, methodOptions);
    }
    return entity;
  }

  public async handleRelationsMany<TRecord extends {}>(
    entities: TRecord[],
    includeWrapper?: IModelRelationIncludeWrapper,
    methodOptions?: IModelMethodOptions,
  ) {
    if (entities.length === 0) return entities;
    // relations
    const relations = this.__handleRelationsCollection(includeWrapper);
    if (!relations) return entities;
    for (const relation of relations) {
      await this.__handleRelationMany(entities, relation, methodOptions);
    }
    return entities;
  }

  private async __handleRelationOne<TRecord extends {}>(
    entity: TRecord,
    relation: [string, any, any, any],
    methodOptions?: IModelMethodOptions,
  ) {
    const [relationName, relationReal, includeReal, withReal] = relation;
    const { type, modelMiddle, model, keyFrom, keyTo, key, options } = relationReal;
    const modelTarget = this.__getModelTarget(model);
    const tableNameTarget = modelTarget.getTable();
    const optionsReal = Object.assign({}, options, { include: includeReal, with: withReal });
    const methodOptionsReal = Object.assign({}, methodOptions, { columns: undefined });
    if (type === 'hasOne') {
      const idFrom = cast(entity).id;
      if (isNil(idFrom)) {
        entity[relationName] = undefined;
      } else {
        const where = { [key]: idFrom };
        const options2 = deepExtend({}, methodOptionsReal, optionsReal);
        entity[relationName] = await modelTarget.get(where, options2);
      }
    } else if (type === 'belongsTo') {
      const idTo = cast(entity)[key];
      if (isNil(idTo)) {
        entity[relationName] = undefined;
      } else {
        const where = { id: idTo };
        const options2 = deepExtend({}, methodOptionsReal, optionsReal);
        entity[relationName] = await modelTarget.get(where, options2);
      }
    } else if (type === 'hasMany') {
      const idFrom = cast(entity).id;
      if (isNil(idFrom)) {
        entity[relationName] = [];
      } else {
        const options2 = deepExtend({}, optionsReal, { where: { [`${tableNameTarget}.${key}`]: idFrom } });
        entity[relationName] = await modelTarget.select(options2, methodOptionsReal);
      }
    } else if (type === 'belongsToMany') {
      const modelTargetMiddle = this.__getModelTarget(modelMiddle);
      const idFrom = cast(entity).id;
      if (isNil(idFrom)) {
        entity[relationName] = [];
      } else {
        const itemsMiddle = await modelTargetMiddle.select({ where: { [keyFrom]: idFrom } }, methodOptionsReal);
        const idsTo = itemsMiddle.map(item => item[keyTo]);
        const options2 = deepExtend({}, methodOptionsReal, optionsReal);
        entity[relationName] = await modelTarget.mget(idsTo, options2);
      }
    }
  }

  private async __handleRelationMany<TRecord extends {}>(
    entities: TRecord[],
    relation: [string, any, any, any],
    methodOptions?: IModelMethodOptions,
  ) {
    const [relationName, relationReal, includeReal, withReal] = relation;
    const { type, modelMiddle, model, keyFrom, keyTo, key, options } = relationReal;
    const modelTarget = this.__getModelTarget(model);
    const tableNameTarget = modelTarget.getTable();
    const optionsReal = Object.assign({}, options, { include: includeReal, with: withReal });
    const methodOptionsReal = Object.assign({}, methodOptions, { columns: undefined });
    if (type === 'hasOne') {
      const idsFrom = entities.map(item => cast(item).id).filter(id => !isNil(id));
      const options2 = deepExtend({}, optionsReal, { where: { [key]: idsFrom } });
      const items = await modelTarget.select(options2, methodOptionsReal);
      for (const entity of entities) {
        entity[relationName] = items.find(item => item[key] === cast(entity).id);
      }
    } else if (type === 'belongsTo') {
      const idsTo = entities.map(item => cast(item)[key]).filter(id => !isNil(id));
      const options2 = deepExtend({}, methodOptionsReal, optionsReal);
      const items = await modelTarget.mget(idsTo, options2);
      for (const entity of entities) {
        entity[relationName] = items.find(item => cast(item).id === cast(entity)[key]);
      }
    } else if (type === 'hasMany') {
      const idsFrom = entities.map(item => cast(item).id).filter(id => !isNil(id));
      const options2 = deepExtend({}, optionsReal, { where: { [`${tableNameTarget}.${key}`]: idsFrom } });
      const items = await modelTarget.select(options2, methodOptionsReal);
      for (const entity of entities) {
        entity[relationName] = [];
        for (const item of items) {
          if (item[key] === cast(entity).id) {
            entity[relationName].push(item);
          }
        }
      }
    } else if (type === 'belongsToMany') {
      const modelTargetMiddle = this.__getModelTarget(modelMiddle);
      const idsFrom = entities.map(item => cast(item).id).filter(id => !isNil(id));
      const itemsMiddle = await modelTargetMiddle.select({ where: { [keyFrom]: idsFrom } }, methodOptionsReal);
      const idsTo = itemsMiddle.map(item => item[keyTo]);
      const options2 = deepExtend({}, methodOptionsReal, optionsReal);
      const items = await modelTarget.mget(idsTo, options2);
      for (const entity of entities) {
        entity[relationName] = [];
        for (const itemMiddle of itemsMiddle) {
          if (itemMiddle[keyFrom] === cast(entity).id) {
            entity[relationName].push(items.find(item => cast(item).id === cast(itemMiddle)[keyTo]));
          }
        }
      }
    }
  }

  private __getModelTarget<TRecord extends {}>(modelClassTarget: TypeModelClassLike<BeanModelCrud<TRecord>>): BeanModelCrud<TRecord> {
    return this._model.newInstanceTarget(modelClassTarget) as unknown as BeanModelCrud<TRecord>;
  }

  private __handleRelationsCollection(includeWrapper?: IModelRelationIncludeWrapper) {
    // collect
    const relations: [string, any, any, any][] = [];
    // include
    if (this._model.options.relations) {
      for (const key in this._model.options.relations) {
        const relationDef = this._model.options.relations[key];
        const relationCur: any = includeWrapper?.include?.[key];
        let relationReal;
        let includeReal;
        let withReal;
        if (relationCur === false) {
          continue;
        } else if (relationCur === true) {
          relationReal = relationDef;
        } else if (typeof relationCur === 'object') {
          relationReal = deepExtend({}, relationDef, { options: relationCur });
          includeReal = relationCur.include;
          withReal = relationCur.with;
        } else if (relationDef.options?.autoload) {
          relationReal = relationDef;
        } else {
          continue;
        }
        relations.push([key, relationReal, includeReal, withReal]);
      }
    }
    // with
    if (includeWrapper?.with) {
      for (const key in includeWrapper.with) {
        const relationReal: any = includeWrapper.with[key];
        if (!relationReal) continue;
        relations.push([key, relationReal, relationReal.options?.include, relationReal.options?.with]);
      }
    }
    return relations;
  }
}
