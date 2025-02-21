import type { TypeUseOnionGlobalBaseOptions } from 'vona-module-a-onion';
import type { IMiddlewareOptionsGate } from '../bean/middleware.gate.ts';
import { UseMiddlewareGlobal } from 'vona-module-a-aspect';

export function Gate(
  options?: Partial<TypeUseOnionGlobalBaseOptions<IMiddlewareOptionsGate>>,
): ClassDecorator & MethodDecorator {
  return UseMiddlewareGlobal('a-core:gate', options);
}
