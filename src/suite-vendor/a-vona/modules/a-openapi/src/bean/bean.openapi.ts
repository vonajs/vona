import type { Constructable } from 'vona';
import type { IOpenapiObject } from 'vona-module-a-openapiutils';
import { OpenApiGeneratorV3, OpenApiGeneratorV31, OpenAPIRegistry } from '@cabloy/zod-to-openapi';
import { appResource, BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';
import { $schema } from '../lib/schema/schema.ts';

@Bean()
export class BeanOpenapi extends BeanBase {
  // need not cache
  async generateJsonOfClass<K extends keyof IOpenapiObject>(schemaClass: Constructable, version: K = 'V31' as any): Promise<IOpenapiObject[K]> {
    return await this.generateJsonOfClasses([schemaClass], version);
  }

  // need not cache
  async generateJsonOfClasses<K extends keyof IOpenapiObject>(schemaClasses: Constructable[], version: K = 'V31' as any): Promise<IOpenapiObject[K]> {
    const registry = new OpenAPIRegistry();
    // schema: independent
    let counter = 0;
    for (const schemaClass of schemaClasses) {
      const schema = $schema(schemaClass);
      let beanFullName = appResource.getBeanFullName(schemaClass);
      if (!beanFullName) {
        beanFullName = `${schemaClass.name}_${counter++}`;
      }
      registry.register(beanFullName, schema);
    }
    const generator =
      version === 'V30' ? new OpenApiGeneratorV3(registry.definitions) : new OpenApiGeneratorV31(registry.definitions);
    const apiObj = generator.generateDocument(this.scope.config.generateDocument[version]);
    this.scope.service.openapi.translate(apiObj, 'rest');
    return apiObj as IOpenapiObject[K];
  }
}
