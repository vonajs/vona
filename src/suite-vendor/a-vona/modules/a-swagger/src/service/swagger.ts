import { OpenApiGeneratorV3, OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';

@Service()
export class ServiceSwagger extends BeanBase {
  generateJson() {
    const registry = this._collectRegistry();
    const generator = new OpenApiGeneratorV3(registry.definitions);
    return generator.generateDocument();
  }

  private _collectRegistry() {
    const registry = new OpenAPIRegistry();
    for (const controller of this.bean.onion.controller.getOnionsEnabled()) {
      this.bean.router.registerController(controller.beanOptions.module, controller.beanOptions.beanClass);
    }
    return registry;
  }
}
