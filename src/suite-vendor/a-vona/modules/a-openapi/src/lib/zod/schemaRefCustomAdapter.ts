import type { VonaApplication } from 'vona';
import { ZodMetadata } from '@cabloy/zod-query';
import { OpenApiGeneratorV31, OpenAPIRegistry } from '@cabloy/zod-to-openapi';
import { cast } from 'vona';

export function schemaRefCustomAdapter(_app: VonaApplication) {
  const registry = new OpenAPIRegistry();
  const generator31 = new OpenApiGeneratorV31(registry.definitions);
  _patchGenerator(generator31);
}

function _patchGenerator(generator: any) {
  const gen = Object.getPrototypeOf(cast(generator).generator);
  gen.generateSchemaWithRef = function (zodSchema) {
    // schema ref
    const lazySchema = ZodMetadata.getLazySchema(zodSchema);
    if (lazySchema) {
      zodSchema = lazySchema();
    }
    const refId = ZodMetadata.getRefId(zodSchema);
    if (!refId) {
      return this.generateSimpleSchema(zodSchema);
    }
    if (this.schemaRefs[refId] === undefined) {
      this.schemaRefs[refId] = null;
      const result = this.generateSimpleSchema(zodSchema);
      this.schemaRefs[refId] = result;
    }
    return { $ref: this.generateSchemaRef(refId) };
  };
}
