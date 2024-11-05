import { Type } from 'vona';
import { DECORATORS } from '../constants.js';
import { ApiOperation } from '../decorators/api-operation.decorator.js';
import { METADATA_FACTORY_NAME } from '../plugin/plugin-constants.js';

export const exploreApiOperationMetadata = (instance: object, prototype: Type<unknown>, method: object) => {
  applyMetadataFactory(prototype, instance);
  return Reflect.getMetadata(DECORATORS.API_OPERATION, method);
};

function applyMetadataFactory(prototype: Type<unknown>, instance: object) {
  const classPrototype = prototype;
  do {
    if (!prototype.constructor) {
      return;
    }
    if (!prototype.constructor[METADATA_FACTORY_NAME]) {
      continue;
    }
    const metadata = prototype.constructor[METADATA_FACTORY_NAME]();
    const methodKeys = Object.keys(metadata).filter(key => typeof instance[key] === 'function');

    methodKeys.forEach(key => {
      const operationMeta = {};
      const { summary, deprecated, tags, description } = metadata[key];

      applyIfNotNil(operationMeta, 'summary', summary);
      applyIfNotNil(operationMeta, 'deprecated', deprecated);
      applyIfNotNil(operationMeta, 'tags', tags);
      applyIfNotNil(operationMeta, 'description', description);

      if (Object.keys(operationMeta).length === 0) {
        return;
      }
      ApiOperation(operationMeta, { overrideExisting: false })(
        classPrototype,
        key,
        Object.getOwnPropertyDescriptor(classPrototype, key) as any,
      );
    });
  } while ((prototype = Reflect.getPrototypeOf(prototype) as Type<any>) && prototype !== Object.prototype && prototype);
}

function applyIfNotNil(target: Record<string, any>, key: string, value: any) {
  if (value !== undefined && value !== null) {
    target[key] = value;
  }
}
