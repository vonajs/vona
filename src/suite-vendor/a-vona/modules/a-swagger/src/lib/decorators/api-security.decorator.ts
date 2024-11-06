import { isString } from 'lodash-es';
import { DECORATORS } from '../constants.js';
import { SecurityRequirementObject } from '../interfaces/open-api-spec.interface.js';
import { extendMetadata } from '../utils/extend-metadata.util.js';

export function ApiSecurity(
  name: string | SecurityRequirementObject,
  requirements: string[] = [],
): ClassDecorator & MethodDecorator {
  let metadata: SecurityRequirementObject[];

  if (isString(name)) {
    metadata = [{ [name as any]: requirements }];
  } else {
    metadata = [name as any];
  }

  return (target: object, _key?: string | symbol, descriptor?: TypedPropertyDescriptor<any>): any => {
    if (descriptor) {
      metadata = extendMetadata(metadata, DECORATORS.API_SECURITY, descriptor.value);
      Reflect.defineMetadata(DECORATORS.API_SECURITY, metadata, descriptor.value);
      return descriptor;
    }
    metadata = extendMetadata(metadata, DECORATORS.API_SECURITY, target);
    Reflect.defineMetadata(DECORATORS.API_SECURITY, metadata, target);
    return target;
  };
}
