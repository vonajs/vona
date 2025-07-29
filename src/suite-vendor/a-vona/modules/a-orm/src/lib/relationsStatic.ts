import type { BeanModelMeta } from '../bean/bean.model/bean.model_meta.ts';
import type { IModelClassRecord } from '../types/onion/model.ts';
import type { IModelRelationOptionsManyDynamic, IModelRelationOptionsOneDynamic } from '../types/relationsDefDynamic.ts';

export interface IModelRelationOptionsManyStatic<
  MODEL extends BeanModelMeta,
  ModelJoins extends (keyof IModelClassRecord) | (keyof IModelClassRecord)[] | undefined = undefined,
  Group extends boolean | undefined = undefined,
>
  extends Omit<IModelRelationOptionsManyDynamic<MODEL, ModelJoins, Group>, 'include' | 'with'> {
  autoload?: boolean;
}

export interface IModelRelationOptionsOneStatic<MODEL extends BeanModelMeta>
  extends Omit<IModelRelationOptionsOneDynamic<MODEL>, 'include' | 'with'> {
  autoload?: boolean;
}
