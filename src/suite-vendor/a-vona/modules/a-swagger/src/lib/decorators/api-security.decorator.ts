import { isString } from 'lodash';
import { DECORATORS } from '../constants.js';
import { SecurityRequirementObject } from '../interfaces/open-api-spec.interface.js';
import { extendMetadata } from '../utils/extend-metadata.util';

export function ApiSecurity(
  name: string | SecurityRequirementObject,
  requirements: string[] = [],
): ClassDecorator & MethodDecorator {
  let metadata: SecurityRequirementObject[];

  if (isString(name)) {
    metadata = [{ [name]: requirements }];
  } else {
    metadata = [name];
  }

  return (target: object, key?: string | symbol, descriptor?: TypedPropertyDescriptor<any>): any => {
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
