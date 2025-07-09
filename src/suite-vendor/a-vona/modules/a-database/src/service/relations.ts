import type { BeanModelCrud } from '../bean/bean.model/bean.model_crud.ts';
import type { IModelMethodOptions, IModelRelationIncludeWrapper } from '../types/model.ts';
import type { TypeModelClassLike } from '../types/relationsDef.ts';
import { appResource, BeanBase, cast, deepExtend } from 'vona';
import { Service } from 'vona-module-a-bean';

@Service()
export class ServiceRelations extends BeanBase {
  public async handleRelationsMany<TRecord extends {}, TModel extends BeanModelCrud<TRecord>>(
    entities: TRecord[],
    modelCurrent: TModel,
    includeWrapper?: IModelRelationIncludeWrapper<TModel>,
    methodOptions?: IModelMethodOptions,
  ) {
    // relations
    const relations = this.__handleRelationsCollection(modelCurrent, includeWrapper);
    if (!relations) return entities;
    for (const relation of relations) {
      await this.__handleRelationMany(entities, modelCurrent, relation, methodOptions);
    }
    return entities;
  }

  private async __handleRelationMany<TRecord extends {}, TModel extends BeanModelCrud<TRecord>>(
    entities: TRecord[],
    modelCurrent: TModel,
    relation: [string, any, any, any],
    methodOptions?: IModelMethodOptions,
  ) {
    const [relationName, relationReal, includeReal, withReal] = relation;
    const { type, modelMiddle, model, keyFrom, keyTo, key, options } = relationReal;
    if (type === 'hasOne') {
      const modelTarget = this.__getModelTarget(modelCurrent, model);
      const idsFrom = entities.map(item => cast(item).id);
      const options2 = deepExtend({}, options, { where: { [key]: idsFrom } });
      const items = await modelTarget.select(options2, methodOptions);
      for (const entity of entities) {
        entity[relationName] = items.find(item => item[key] === cast(entity).id);
      }
    }
  }

  private __getModelTarget<TRecord extends {}, TModel extends BeanModelCrud<TRecord>>(modelCurrent: TModel, modelClassTarget: TypeModelClassLike) {
    const modelClass2 = modelClassTarget.name ? modelClassTarget : cast(modelClassTarget)();
    const beanFullName = appResource.getBeanFullName(modelClass2);
    return this.app.bean._newBean(beanFullName, cast(modelCurrent).db);
  }

  private __handleRelationsCollection<TRecord extends {}, TModel extends BeanModelCrud<TRecord>>(
    modelCurrent: TModel,
    includeWrapper?: IModelRelationIncludeWrapper<TModel>,
  ) {
    if (!includeWrapper) return;
    // collect
    const relations: [string, any, any, any][] = [];
    // include
    if (includeWrapper.include && modelCurrent.options.relations) {
      for (const key in modelCurrent.options.relations) {
        const relationDef = modelCurrent.options.relations[key];
        const relationCur = includeWrapper.include[key];
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
        }
        relations.push([key, relationReal, includeReal, withReal]);
      }
    }
    // with
    if (includeWrapper.with) {
      for (const key in includeWrapper.with) {
        const relationReal: any = includeWrapper.with[key];
        if (!relationReal) continue;
        relations.push([key, relationReal, relationReal.options?.include, relationReal.options?.with]);
      }
    }
    return relations;
  }
}
