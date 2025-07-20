import type { Constructable } from 'vona';
import type { BeanModelMeta } from '../../bean/bean.model/bean.model_meta.ts';
import type { IDtoComposeParams, TypeDtoComposeResult } from '../../types/dto.ts';
import type { IModelClassRecord } from '../../types/onion/model.ts';
import { $Class } from 'vona';
import { prepareClassModel, prepareColumns } from '../../common/utils.ts';

export function DtoCompose<
  T extends IDtoComposeParams<ModelLike>,
  ModelLike extends BeanModelMeta | (keyof IModelClassRecord),
>(
  modelLike: ModelLike extends BeanModelMeta ? ((() => Constructable<ModelLike>) | Constructable<ModelLike>) : ModelLike,
  params?: T,
): Constructable<TypeDtoComposeResult<ModelLike, T>> {
  // modelclass
  let modelClass = prepareClassModel(modelLike);
  // columns
  const columns = prepareColumns(params?.columns);
  if (columns) {
    modelClass = $Class.pick(modelClass, columns as any);
  }
  return modelClass as any;
}
