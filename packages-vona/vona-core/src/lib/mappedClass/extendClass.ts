import type { Constructable } from '../decorator/type/constructable.ts';
import { appHmrDeps, appResource } from 'vona';

export function ExtendClass<T>(classRef: Constructable<T>): Constructable<T> {
  const beanOptions = appResource.getBean(classRef);
  if (beanOptions) {
    appHmrDeps.add(beanOptions.beanFullName);
  }
  return classRef;
}
