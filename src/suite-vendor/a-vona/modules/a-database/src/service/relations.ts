import type { BeanModelCrud } from '../bean/bean.model/bean.model_crud.ts';
import type { IModelRelationIncludeWrapper } from '../types/model.ts';
import { BeanBase, deepExtend } from 'vona';
import { Service } from 'vona-module-a-bean';

@Service()
export class ServiceRelations extends BeanBase {
  public async handleRelationsMany<TRecord extends {}, TModel extends BeanModelCrud<TRecord>>(
    entities: TRecord[],
    modelCurrent: TModel,
    includeWrapper?: IModelRelationIncludeWrapper<TModel>,
  ) {
    // relations
    const relations = this.__handleRelationsCollection(includeWrapper);
    if (!relations) return entities;
    for (const relation of relations) {
      await this.__handleRelationMany(entities, relation);
    }
    return entities;
  }

  private async __handleRelationMany<TRecord extends {}, TModel extends BeanModelCrud<TRecord>>(
    entities: TRecord[],
    modelCurrent: TModel,
    relation: [any, any, any],
  ) {
    const [relationReal, includeReal, withReal] = relation;
    const { type, modelMiddle, model, keyFrom, keyTo, key, options } = relationReal;
    if (type === 'hasOne') {

    }
  }

  private __handleRelationsCollection<TRecord extends {}, TModel extends BeanModelCrud<TRecord>>(
    modelCurrent: TModel,
    includeWrapper?: IModelRelationIncludeWrapper<TModel>,
  ) {
    if (!includeWrapper) return;
    // collect
    const relations: [any, any, any][] = [];
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
        relations.push([relationReal, includeReal, withReal]);
      }
    }
    // with
    if (includeWrapper.with) {
      for (const key in includeWrapper.with) {
        const relationReal: any = includeWrapper.with[key];
        if (!relationReal) continue;
        relations.push([relationReal, relationReal.options?.include, relationReal.options?.with]);
      }
    }
    return relations;
  }
}
