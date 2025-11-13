import type { ISerializerTransformOptionsExclude, ISerializerTransformRecord, TypeSerializerTransformGetter } from 'vona-module-a-serialization';
import type z from 'zod';

export function schemaSerializerExclude(options: Partial<ISerializerTransformOptionsExclude>);
export function schemaSerializerExclude(exclude?: boolean);
export function schemaSerializerExclude(param?: boolean | Partial<ISerializerTransformOptionsExclude>) {
  let options;
  if (!param || typeof param === 'boolean') {
    options = { exclude: param };
  } else {
    options = param;
  }
  return function (schema: z.ZodType): z.ZodType {
    return schema.openapi({
      serializerTransforms: {
        'a-serialization:exclude': options,
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
