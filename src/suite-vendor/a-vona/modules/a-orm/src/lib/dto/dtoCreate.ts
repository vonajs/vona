import type { Constructable } from 'vona';
import type { EntityBase } from '../../types/entityBase.ts';
import { $Class } from 'vona';

export function DtoCreate<T extends EntityBase, KS extends (keyof T)[] | undefined = undefined>(
  classRef: Constructable<T>,
  omitKeys?: KS,
): Constructable<Omit<T, KS extends string[] ? KS[number] : 'id' | 'iid' | 'deleted' | 'createdAt' | 'updatedAt'>> {
  return $Class.omit(classRef, omitKeys ?? ['id', 'iid', 'deleted', 'createdAt', 'updatedAt']) as any;
}
