import { OpenApiGeneratorV3, OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { OpenAPIObject, SchemaObject } from 'openapi3-ts/oas30';
import {
  appMetadata,
  appResource,
  BeanBase,
  cast,
  Constructable,
  HttpStatus,
  IDecoratorBeanOptionsBase,
  LocaleModuleNameSeparator,
} from 'vona';
import {
  IDecoratorControllerOptions,
  RequestMappingMetadata,
  RequestMethod,
  Service,
  SymbolRequestMappingHandler,
} from 'vona-module-a-web';
import * as ModuleInfo from '@cabloy/module-info';
import {
  bodySchemaWrapper,
  IOpenApiOptions,
  RouteHandlerArgumentMetaDecorator,
  schema,
  SymbolOpenApiOptions,
  SymbolRouteHandlersArgumentsMeta,
} from 'vona-module-a-openapi';
import { z } from 'zod';

const __ArgumentTypes = ['param', 'query', 'body', 'headers'];

@Service()
export class ServiceSwagger extends BeanBase {
  generateJson(): OpenAPIObject {
    const registry = this._collectRegistry();
    const generator = new OpenApiGeneratorV3(registry.definitions);
    const apiObj = generator.generateDocument(this.scope.config.generateDocument);
    this._translate(apiObj);
    return apiObj;
  }

  private _translate(apiObj: OpenAPIObject) {
    // paths
    if (apiObj.paths) {
      for (const key in apiObj.paths) {
        const path = apiObj.paths[key];
        for (const method in path) {
          const methodObj = path[method];
          this._translateString(methodObj, 'description');
          this._translateString(methodObj, 'summary');
        }
      }
    }
    // components
    if (apiObj.components?.schemas) {
      for (const key in apiObj.components.schemas) {
        const schema = apiObj.components.schemas[key];
        this._translateString(schema, 'description');
        const properties = cast<SchemaObject>(schema).properties;
        if (properties && typeof properties === 'object') {
          for (const prop in properties) {
            const propObj = properties[prop];
            this._translateString(propObj, 'description');
          }
        }
      }
    }
  }

  private _translateString(obj: any, key: string) {
    if (obj[key] && obj[key].includes(LocaleModuleNameSeparator)) {
      obj[key] = this.app.text(obj[key]);
    }
  }

  private _collectRegistry() {
    const registry = new OpenAPIRegistry();
    for (const controller of this.bean.onion.controller.getOnionsEnabled()) {
      this._collectController(registry, controller.beanOptions.module, controller.beanOptions.beanClass);
    }
    return registry;
  }

  private _collectController(registry: OpenAPIRegistry, moduleName: string, controller: Constructable) {
    // info
    const info = ModuleInfo.parseInfo(moduleName)!;
    // controller options
    const beanOptions = appResource.getBean(controller);
    if (!beanOptions) return;
    const controllerBeanFullName = beanOptions.beanFullName;
    const controllerOptions = beanOptions.options as IDecoratorControllerOptions;
    const controllerPath = controllerOptions.path;
    const controllerOpenApiOptions = appMetadata.getMetadata<IOpenApiOptions>(SymbolOpenApiOptions, controller);
    if (controllerOpenApiOptions?.exclude) return;
    // descs
    const descs = Object.getOwnPropertyDescriptors(controller.prototype);
    for (const actionKey in descs) {
      const desc = descs[actionKey];
      if (['constructor'].includes(actionKey)) continue;
      if (!desc.value || typeof desc.value !== 'function') continue;
      this._registerControllerAction(
        registry,
        info,
        controller,
        beanOptions,
        controllerBeanFullName,
        controllerPath,
        controllerOpenApiOptions,
        actionKey,
        desc,
      );
    }
  }

  private _registerControllerAction(
    registry: OpenAPIRegistry,
    info: ModuleInfo.IModuleInfo,
    controller: Constructable,
    beanOptions: IDecoratorBeanOptionsBase,
    _controllerBeanFullName: string,
    controllerPath: string | undefined,
    controllerOpenApiOptions: IOpenApiOptions | undefined,
    actionKey: string,
    _desc: PropertyDescriptor,
  ) {
    // app
    const app = this.app;

    // action options
    const actionOpenApiOptions = appMetadata.getMetadata<IOpenApiOptions>(
      SymbolOpenApiOptions,
      controller.prototype,
      actionKey,
    );
    if (actionOpenApiOptions?.exclude) return;

    // actionPath/actionMethod
    if (!appMetadata.hasMetadata(SymbolRequestMappingHandler, controller.prototype, actionKey)) return;
    const handlerMetadata = appMetadata.getMetadata<RequestMappingMetadata>(
      SymbolRequestMappingHandler,
      controller.prototype,
      actionKey,
    )!;
    const actionPath: RegExp | string = handlerMetadata.path || '';
    const actionMethod: RequestMethod = handlerMetadata.method || RequestMethod.GET;
    // ignore regexp
    if (actionPath instanceof RegExp) return;

    // routePath
    const routePath = app.meta.util.combineApiPathControllerAndAction(
      info.relativeName,
      controllerPath,
      actionPath,
      true,
      true,
    ) as string;
    // :id -> {id}
    const routePath2 = routePath.replace(/:([^/]+)/g, '{$1}');

    // tags
    let tags: string[] | undefined = actionOpenApiOptions?.tags ?? controllerOpenApiOptions?.tags;
    if (!tags) {
      tags = [this.app.meta.util.combineResourceName(info.relativeName, beanOptions.name, true, true)];
    }
    // registerPath
    registry.registerPath({
      tags,
      method: actionMethod,
      path: routePath2,
      description: actionOpenApiOptions?.description,
      summary: actionOpenApiOptions?.summary,
      request: this._collectRequest(controller, actionKey),
      responses: this._collectResponses(controller, actionKey, actionOpenApiOptions),
    });
  }

  private _collectRequest(controller: Constructable, actionKey: string) {
    // meta
    const argsMeta = appMetadata.getMetadata<RouteHandlerArgumentMetaDecorator[]>(
      SymbolRouteHandlersArgumentsMeta,
      controller.prototype,
      actionKey,
    );
    if (!argsMeta) return;
    // args
    const argsMapWithField = {};
    const argsMapIsolate = {};
    for (const argMeta of argsMeta) {
      if (!__ArgumentTypes.includes(argMeta.type)) continue;
      if (argMeta.field) {
        if (!argsMapWithField[argMeta.type]) {
          argsMapWithField[argMeta.type] = {};
        }
        argsMapWithField[argMeta.type][argMeta.field] = argMeta.schema;
      } else {
        if (!argsMapIsolate[argMeta.type]) {
          argsMapIsolate[argMeta.type] = argMeta.schema;
        }
      }
    }
    // request
    const request = {};
    for (const argumentType of __ArgumentTypes) {
      let schema: z.ZodSchema | undefined = argsMapIsolate[argumentType];
      if (!schema && argsMapWithField[argumentType]) {
        schema = z.object(argsMapWithField[argumentType]);
      }
      if (!schema) continue;
      // record
      if (argumentType === 'body') {
        // body
        request['body'] = {
          required: !schema.isOptional(),
          content: {
            'application/json': {
              schema,
            },
          },
        };
      } else {
        // others
        const name = argumentType === 'param' ? 'params' : argumentType;
        request[name] = schema;
      }
    }
    return request;
  }

  private _collectResponses(
    controller: Constructable,
    actionKey: string,
    actionOpenApiOptions: IOpenApiOptions | undefined,
  ) {
    // body schema
    const bodySchema = this._parseBodySchema(controller, actionKey, actionOpenApiOptions);
    // contentType
    const contentType = actionOpenApiOptions?.contentType || 'application/json';
    // response
    const response = {
      description: '',
      content: {
        [contentType]: {
          schema: bodySchema,
        },
      },
    };
    // responses
    const responses = { [HttpStatus.OK]: response };
    return responses;
  }

  private _parseBodySchema(
    controller: Constructable,
    actionKey: string,
    actionOpenApiOptions: IOpenApiOptions | undefined,
  ) {
    // bodySchema
    let bodySchema: z.ZodSchema;
    if (actionOpenApiOptions?.bodySchema) {
      bodySchema = actionOpenApiOptions.bodySchema;
    } else {
      const metaType = appMetadata.getDesignReturntype(controller.prototype, actionKey);
      bodySchema = schema(metaType as any);
    }
    // wrapper
    if (actionOpenApiOptions?.bodySchemaWrapper === false) return bodySchema;
    const wrapper = actionOpenApiOptions?.bodySchemaWrapper ?? bodySchemaWrapper;
    return wrapper(bodySchema);
  }
}
