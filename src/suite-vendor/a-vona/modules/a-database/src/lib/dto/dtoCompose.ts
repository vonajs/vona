import type { Constructable } from 'vona';
import type { BeanModelMeta } from '../../bean/bean.model/bean.model_meta.ts';
import type { IDtoComposeParams, TypeDtoComposeResult } from '../../types/dto.ts';
import type { IDecoratorModelOptions, IModelClassRecord } from '../../types/onion/model.ts';
import { $Class, appResource } from 'vona';
import { prepareClassModel, prepareColumns } from '../../common/utils.ts';

export function DtoCompose<
  T extends IDtoComposeParams<ModelLike>,
  ModelLike extends BeanModelMeta | (keyof IModelClassRecord),
>(
  modelLike: ModelLike extends BeanModelMeta ? ((() => Constructable<ModelLike>) | Constructable<ModelLike>) : ModelLike,
  params?: T,
): Constructable<TypeDtoComposeResult<ModelLike, T>> {
  return _DtoCompose_raw(modelLike, params);
}

function _DtoCompose_raw<
  T extends IDtoComposeParams<ModelLike>,
  ModelLike extends BeanModelMeta | (keyof IModelClassRecord),
>(
  modelLike: ModelLike extends BeanModelMeta ? ((() => Constructable<ModelLike>) | Constructable<ModelLike>) : ModelLike,
  params?: T,
): Constructable<TypeDtoComposeResult<ModelLike, T>> {
  // model
  const modelClass = prepareClassModel(modelLike);
  // entity
  let entityClass = getClassEntityFromClassModel(modelClass);
  // columns
  const columns = prepareColumns(params?.columns);
  if (columns) {
    entityClass = $Class.pick(entityClass, columns as any);
  }
  return entityClass as any;
}

function getClassEntityFromClassModel<T>(modelClass: Constructable<T>) {
  const beanOptions = appResource.getBean(modelClass);
  const options: IDecoratorModelOptions = beanOptions!.options!;
  return options.entity!;
}
