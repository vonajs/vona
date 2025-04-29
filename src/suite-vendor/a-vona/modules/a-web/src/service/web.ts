import type { Constructable, MetadataKey } from 'vona';
import type { RequestMappingMetadata } from 'vona-module-a-web';
import { appMetadata, appResource, BeanBase } from 'vona';
import { Service, SymbolRequestMappingHandler } from 'vona-module-a-web';

@Service()
export class ServiceWeb extends BeanBase {
  public combineControllerActionApiPath(
    controller: Constructable,
    actionKey: MetadataKey,
    prefix?: string | boolean,
    simplify?: boolean,
  ): string | undefined {
    // beanOptions
    const beanOptions = appResource.getBean(controller);
    if (!beanOptions) return undefined;
    // controllerPath
    const controllerOptions = beanOptions.options as any;
    const controllerPath = controllerOptions.path;
    // actionPath
    const handlerMetadata = appMetadata.getMetadata<RequestMappingMetadata>(
      SymbolRequestMappingHandler,
      controller.prototype,
      actionKey,
    )!;
    const actionPath: string = handlerMetadata.path || '';
    // combine
    return this.app.util.combineApiPathControllerAndAction(
      beanOptions.module,
      controllerPath,
      actionPath,
      prefix,
      simplify,
    );
  }
}
