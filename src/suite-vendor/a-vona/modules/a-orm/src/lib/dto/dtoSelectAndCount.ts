import type { Constructable } from 'vona';
import type { BeanModelMeta } from '../../bean/bean.model/bean.model_meta.ts';
import type { IDtoGetParams } from '../../types/dto/dtoGet.ts';
import type { TypeDtoSelectAndCountResult } from '../../types/dto/dtoSelectAndCount.ts';
import type { IModelClassRecord } from '../../types/onion/model.ts';
import { Api, v } from 'vona-module-a-openapi';
import z from 'zod';
import { DtoGet } from './dtoGet.ts';

export function DtoSelectAndCount<
  ModelLike extends BeanModelMeta | (keyof IModelClassRecord),
  T extends IDtoGetParams<ModelLike> | undefined = undefined,
>(
  modelLike: ModelLike extends BeanModelMeta ? ((() => Constructable<ModelLike>) | Constructable<ModelLike>) : ModelLike,
  params?: T,
): Constructable<TypeDtoSelectAndCountResult<ModelLike, T>> {
  abstract class TargetClass {}
  const DtoGetResult = DtoGet(modelLike, params);
  Api.field(v.array(DtoGetResult))(TargetClass.prototype, 'list');
  Api.field(v.bigNumber())(TargetClass.prototype, 'total');
  Api.field(z.number())(TargetClass.prototype, 'pageCount');
  Api.field(z.number())(TargetClass.prototype, 'pageSize');
  Api.field(z.number())(TargetClass.prototype, 'pageNo');
  return TargetClass as any;
}
