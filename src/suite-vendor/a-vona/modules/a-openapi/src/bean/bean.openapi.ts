import type { Constructable } from 'vona';
import type { IOpenapiObject } from 'vona-module-a-openapiutils';
import { OpenApiGeneratorV3, OpenApiGeneratorV31, OpenAPIRegistry } from '@cabloy/zod-to-openapi';
import { appResource, BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';
import { Caching } from 'vona-module-a-caching';
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

  protected generateJsonCacheKey(args: any[], prop: string) {
    const version = args[0] ?? 'V31';
    const locale = this.ctx.locale;
    return `${prop}_${version}_${locale}`;
  }

  protected generateJsonOfControllerActionCacheKey(args: any[], prop: string) {
    const [controller, actionKey, version] = args;
    const beanOptions = appResource.getBean(controller)!;
    const beanFullName = beanOptions.beanFullName;
    const locale = this.ctx.locale;
    return `${prop}_${beanFullName}_${actionKey}_${version ?? 'V31'}_${locale}`;
  }

  @Caching.get({ cacheName: 'a-openapi:json', cacheKeyFn: 'generateJsonCacheKey' })
  async generateJson<K extends keyof IOpenapiObject>(version: K = 'V31' as any): Promise<IOpenapiObject[K]> {
    const registry = this.scope.service.openapi.collectRegistry();
    const generator =
      version === 'V30' ? new OpenApiGeneratorV3(registry.definitions) : new OpenApiGeneratorV31(registry.definitions);
    const apiObj = generator.generateDocument(this.scope.config.generateDocument[version]);
    this.scope.service.openapi.translate(apiObj, 'api');
    return apiObj as IOpenapiObject[K];
  }

  @Caching.get({ cacheName: 'a-openapi:json', cacheKeyFn: 'generateJsonOfControllerActionCacheKey' })
  async generateJsonOfControllerAction<K extends keyof IOpenapiObject>(controller: Constructable, actionKey: string, version: K = 'V31' as any): Promise<IOpenapiObject[K]> {
    const registry = new OpenAPIRegistry();
    const beanOptions = appResource.getBean(controller);
    if (!beanOptions) throw new Error('invalid controller');
    this.scope.service.openapi.collectController(registry, beanOptions.module, controller, actionKey);
    const generator =
      version === 'V30' ? new OpenApiGeneratorV3(registry.definitions) : new OpenApiGeneratorV31(registry.definitions);
    const apiObj = generator.generateDocument(this.scope.config.generateDocument[version]);
    this.scope.service.openapi.translate(apiObj, 'rest');
    return apiObj as IOpenapiObject[K];
  }
}
