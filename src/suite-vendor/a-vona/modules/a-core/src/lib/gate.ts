import { UseMiddlewareGlobal } from 'vona-module-a-aspect';
import type { IMiddlewareOptionsGate } from '../bean/middleware.gate.js';
import type { TypeUseOnionGlobalBaseOptions } from 'vona-module-a-onion';

export function Gate(
  options?: Partial<TypeUseOnionGlobalBaseOptions<IMiddlewareOptionsGate>>,
): ClassDecorator & MethodDecorator {
  return UseMiddlewareGlobal('a-core:gate', options);
}
