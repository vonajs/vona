import type { ZodOpenAPIMetadata } from '@cabloy/zod-to-openapi';
import type { SchemaLike } from '../../types/decorator.ts';
import { ZodMetadata } from '@cabloy/zod-openapi';
import { $makeSchema } from './makeSchemaLikes.ts';

export function $makeMetadata<T>(...schemaLikes: SchemaLike<T>[]): ZodOpenAPIMetadata<T> | undefined {
  const schema = $makeSchema(...schemaLikes);
  return ZodMetadata.getOpenapiMetadata(schema);
}
