import type { PowerPartial } from 'vona';
import type { IDecoratorSsrSiteOptions } from '../types/ssrSite.ts';
import { createBeanDecorator } from 'vona';

export function SsrSite<T extends IDecoratorSsrSiteOptions>(options?: PowerPartial<T>): ClassDecorator {
  return createBeanDecorator('ssrSite', options);
}
