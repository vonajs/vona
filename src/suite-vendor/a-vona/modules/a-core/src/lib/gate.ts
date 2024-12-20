import { UseMiddlewareGlobal } from 'vona-module-a-aspect';
import { IMiddlewareOptionsGate } from '../bean/middleware.gate.js';
import { TypeUseOnionGlobalBaseOptions } from 'vona-module-a-onion';

export function Gate(
  options?: Partial<TypeUseOnionGlobalBaseOptions<IMiddlewareOptionsGate>>,
): ClassDecorator & MethodDecorator {
  return UseMiddlewareGlobal('a-core:gate', options);
}
