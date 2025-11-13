import type { ISerializerTransformRecord, TypeSerializerTransformGetter } from 'vona-module-a-serialization';
import type z from 'zod';

export function schemaSerializerExclude(exclude: boolean = true) {
  return function (schema: z.ZodType): z.ZodType {
    return schema.openapi({
      serializerTransforms: {
        'a-serialization:exclude': { exclude },
      },
    });
  };
}

export function schemaSerializerTransform<T extends keyof ISerializerTransformRecord>(
  serializerTransformName: T,
  options?: Partial<ISerializerTransformRecord[T]>,
) {
  return function (schema: z.ZodType): z.ZodType {
    return schema.openapi({
      serializerTransforms: {
        [serializerTransformName]: options,
      },
    });
  };
}

export function schemaSerializerSensitive(
  options: ISerializerTransformRecord['a-serialization:sensitive'],
) {
  return function (schema: z.ZodType): z.ZodType {
    return schema.openapi({
      serializerTransforms: {
        'a-serialization:sensitive': options,
      },
    });
  };
}

export function schemaSerializerGetter(getter: TypeSerializerTransformGetter) {
  return function (schema: z.ZodType): z.ZodType {
    return schema.openapi({
      serializerTransforms: {
        'a-serialization:getter': { getter },
      },
    });
  };
}
