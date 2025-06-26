import type { IAopMethodOptionsCachingGet } from '../bean/aopMethod.cachingGet.ts';
import { Aspect } from 'vona-module-a-aspect';

function Get(options?: Partial<IAopMethodOptionsCachingGet>): MethodDecorator {
  return Aspect.aopMethod('a-caching:cachingGet', options);
}

export const Caching = { get: Get };
