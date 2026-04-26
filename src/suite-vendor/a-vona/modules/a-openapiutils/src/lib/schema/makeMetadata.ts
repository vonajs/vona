import type { ZodOpenAPIMetadata } from '@cabloy/zod-to-openapi';

import { ZodMetadata } from '@cabloy/zod-openapi';

import type { SchemaLike } from '../../types/decorator.ts';

import { $makeSchema } from './makeSchemaLikes.ts';

export function $makeMetadata<T>(
  ...schemaLikes: SchemaLike<T>[]
): ZodOpenAPIMetadata<T> | undefined {
  const schema = $makeSchema(...schemaLikes);
  return ZodMetadata.getOpenapiMetadata(schema);
}
