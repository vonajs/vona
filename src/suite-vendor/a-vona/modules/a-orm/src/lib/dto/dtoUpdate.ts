import type { Constructable } from 'vona';
import type { EntityBase } from '../../types/entityBase.ts';
import { $Class } from 'vona';
import { DtoCreate } from './dtoCreate.ts';

export function DtoUpdate<T extends EntityBase, KS extends (keyof T)[] | undefined = undefined>(
  classRef: Constructable<T>,
  omitKeys?: KS,
): Constructable<Partial<Omit<T, KS extends string[] ? KS[number] : 'id' | 'iid' | 'deleted' | 'createdAt' | 'updatedAt'>>> {
  return $Class.partial(DtoCreate(classRef, omitKeys));
}
