import type { Constructable } from 'vona';
import type { IDtoComposeParams, TypeDtoComposeResult } from '../../types/dto.ts';
import type { IModelClassRecord } from '../../types/onion/model.ts';

export function DtoCompose<
  T extends IDtoComposeParams<ModelName>,
  ModelName extends (keyof IModelClassRecord),
>(modelName: ModelName, params?: T): Constructable<TypeDtoComposeResult<ModelName, T>> {
  return {};
}
