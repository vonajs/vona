import type { MetadataKey } from 'vona';
import type { TypeOpenapiMetadata } from 'vona-module-a-openapi';
import type { ISerializerTransformOptionsExclude } from '../bean/serializerTransform.exclude.ts';
import type { ISerializerTransformOptionsGetter } from '../bean/serializerTransform.getter.ts';
import type { ISerializerTransformRecord, TypeSerializerTransformGetter } from '../types/serializerTransform.ts';
import { Aspect } from 'vona-module-a-aspect';
import { mergeFieldOpenapiMetadata } from 'vona-module-a-openapi';

function Enable(enable: boolean = true): ClassDecorator & MethodDecorator {
  return Aspect.interceptor('a-serialization:serializer', { enable });
}

function Transform<T extends keyof ISerializerTransformRecord>(
  serializerTransformName: T,
  options?: Partial<ISerializerTransformRecord[T]>,
): PropertyDecorator {
  return function (target: object, prop: MetadataKey) {
    const metadata: TypeOpenapiMetadata = {
      serializerTransforms: {
        [serializerTransformName]: options,
      },
    };
    mergeFieldOpenapiMetadata(target, prop as string, metadata);
  };
}

function Exclude(options: Partial<ISerializerTransformOptionsExclude>): PropertyDecorator;
function Exclude(exclude?: boolean): PropertyDecorator;
function Exclude(param?: boolean | Partial<ISerializerTransformOptionsExclude>): PropertyDecorator {
  let options;
  if (!param || typeof param === 'boolean') {
    options = { exclude: param };
  } else {
    options = param;
  }
  return function (target: object, prop: MetadataKey) {
    const metadata: TypeOpenapiMetadata = {
      serializerTransforms: {
        'a-serialization:exclude': options,
      },
    };
    mergeFieldOpenapiMetadata(target, prop as string, metadata);
  };
}

function Sensitive(
  options: ISerializerTransformRecord['a-serialization:sensitive'],
): PropertyDecorator {
  return function (target: object, prop: MetadataKey) {
    const metadata: TypeOpenapiMetadata = {
      serializerTransforms: {
        'a-serialization:sensitive': options,
      },
    };
    mergeFieldOpenapiMetadata(target, prop as string, metadata);
  };
}

function Getter(options: Partial<ISerializerTransformOptionsGetter>): PropertyDecorator;
function Getter(getter: TypeSerializerTransformGetter): PropertyDecorator;
function Getter(param: TypeSerializerTransformGetter | Partial<ISerializerTransformOptionsGetter>): PropertyDecorator {
  let options;
  if (typeof param === 'function') {
    options = { getter: param };
  } else {
    options = param;
  }
  return function (target: object, prop: MetadataKey) {
    const metadata: TypeOpenapiMetadata = {
      serializerTransforms: {
        'a-serialization:getter': options,
      },
    };
    mergeFieldOpenapiMetadata(target, prop as string, metadata);
  };
}

export const Serializer = {
  enable: Enable,
  exclude: Exclude,
  transform: Transform,
  sensitive: Sensitive,
  getter: Getter,
};
