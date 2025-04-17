import type { OpenAPIObject as OpenAPIObject30, SchemaObject as SchemaObject30, SecurityRequirementObject } from 'openapi3-ts/oas30';
import type { OpenAPIObject as OpenAPIObject31, SchemaObject as SchemaObject31 } from 'openapi3-ts/oas31';
import type {
  Constructable,
  IDecoratorBeanOptionsBase,
} from 'vona';
import type {
  IDecoratorControllerOptions,
  RequestMappingMetadata,
} from 'vona-module-a-web';
import type { IOpenApiHeader, IOpenAPIObject, IOpenApiOptions } from '../types/api.ts';
import type { RouteHandlerArgumentMetaDecorator } from '../types/decorator.ts';
import { OpenApiGeneratorV3, OpenApiGeneratorV31, OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import * as ModuleInfo from '@cabloy/module-info';
import { isEmptyObject } from '@cabloy/utils';
import { toUpperCaseFirstChar } from '@cabloy/word-utils';
import {
  appMetadata,
  appResource,
  BeanBase,
  cast,
  HttpStatus,
  LocaleModuleNameSeparator,
} from 'vona';
import {
  RequestMethod,
  Service,
  SymbolRequestMappingHandler,
} from 'vona-module-a-web';
import { z } from 'zod';
import { bodySchemaWrapperDefault } from '../lib/schema/bodySchemaWrapper.ts';
import { schema } from '../lib/schema/schema.ts';
import { SymbolOpenApiOptions } from '../types/api.ts';
import { SymbolRouteHandlersArgumentsMeta } from '../types/decorator.ts';

const __ArgumentTypes = ['param', 'query', 'body', 'headers', 'fields', 'field', 'files', 'file'];

@Service()
export class ServiceOpenapi extends BeanBase {
  generateJson<K extends keyof IOpenAPIObject>(version: K = '31' as any): IOpenAPIObject[K] {
    const registry = this._collectRegistry();
    const generator =
      version === '30' as any ? new OpenApiGeneratorV3(registry.definitions) : new OpenApiGeneratorV31(registry.definitions);
    const apiObj = generator.generateDocument(this.scope.config.generateDocument[version]);
    this._translate(apiObj);
    return apiObj as IOpenAPIObject[K];
  }

  private _translate(apiObj: OpenAPIObject30 | OpenAPIObject31) {
    // paths
    if (apiObj.paths) {
      for (const key in apiObj.paths) {
        const pathObj = apiObj.paths[key];
        for (const method in pathObj) {
          const methodObj = pathObj[method];
          this._translateString(methodObj, 'description');
          this._translateString(methodObj, 'summary');
          // parameters
          for (const parameterObj of methodObj.parameters || []) {
            this._translateSchema(parameterObj.schema);
          }
          // requestBody
          this._translateSchema(methodObj.requestBody?.content?.['application/json']?.schema);
        }
      }
    }
    // components
    if (apiObj.components?.schemas) {
      for (const key in apiObj.components.schemas) {
        const schema = apiObj.components.schemas[key];
        this._translateSchema(schema);
      }
    }
  }

  private _translateSchema(schema: any) {
    if (!schema) return;
    this._translateString(schema, 'description');
    const properties = cast<SchemaObject30 | SchemaObject31>(schema).properties;
    if (properties && typeof properties === 'object') {
      for (const prop in properties) {
        const propObj = properties[prop];
        this._translateSchema(propObj);
      }
    }
  }

  private _translateString(obj: any, key: string) {
    if (!obj) return;
    if (obj[key] && obj[key].includes(LocaleModuleNameSeparator)) {
      obj[key] = this.app.meta.text(obj[key]);
    }
  }

  private _collectRegistry() {
    const registry = new OpenAPIRegistry();
    // securitySchemes
    const configSecuritySchemes = this.scope.config.securitySchemes;
    for (const key in configSecuritySchemes) {
      let securityScheme = configSecuritySchemes[key];
      if (typeof securityScheme === 'function') {
        securityScheme = (securityScheme as any).call(this.app);
      }
      registry.registerComponent('securitySchemes', key, securityScheme as any);
    }
    // controller
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

    // action options: should not extend controllerOpenApiOptions
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
    const routePath = app.util.combineApiPathControllerAndAction(
      info.relativeName,
      controllerPath,
      actionPath,
      true,
      true,
    );
    // :id -> {id}
    const routePath2 = routePath.replace(/:([^/]+)/g, '{$1}');

    // tags
    let tags: string[] | undefined = actionOpenApiOptions?.tags ?? controllerOpenApiOptions?.tags;
    if (!tags || tags.length === 0) {
      tags = [toUpperCaseFirstChar(this.app.util.combineResourceName(beanOptions.name, info.relativeName, true, true))];
    }
    // operationId
    let operationId = actionOpenApiOptions?.operationId ?? actionKey;
    operationId = `${tags[0]}_${operationId}`;
    // security
    const _public: boolean | undefined = actionOpenApiOptions?.public ?? controllerOpenApiOptions?.public;
    let security: SecurityRequirementObject[] | undefined;
    if (!_public) {
      security = [
        {
          bearerAuth: [],
        },
      ];
    }
    // registerPath
    registry.registerPath({
      tags,
      method: actionMethod,
      path: routePath2,
      operationId,
      security,
      description: actionOpenApiOptions?.description,
      summary: actionOpenApiOptions?.summary,
      request: this._collectRequest(controller, actionKey, actionOpenApiOptions, controllerOpenApiOptions),
      responses: this._collectResponses(controller, actionKey, actionOpenApiOptions),
    });
  }

  private _collectRequest(
    controller: Constructable,
    actionKey: string,
    actionOpenApiOptions: IOpenApiOptions | undefined,
    controllerOpenApiOptions: IOpenApiOptions | undefined,
  ) {
    // meta
    const argsMeta = this._prepareArgsMeta(controller, actionKey, actionOpenApiOptions, controllerOpenApiOptions);
    if (!argsMeta) return;
    // args
    const argsMapWithField: any = {};
    const argsMapIsolate: any = {};
    let isUpload;
    for (const argMeta of argsMeta) {
      if (!__ArgumentTypes.includes(argMeta.type)) continue;
      if (['fields', 'field', 'files', 'file'].includes(argMeta.type)) {
        isUpload = true;
      }
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
    const request: any = {};
    if (isUpload) {
      const schemaObj: any = {};
      // not check argsMapIsolate.fields
      if (argsMapWithField.fields) Object.assign(schemaObj, argsMapWithField.fields);
      if (argsMapWithField.field) Object.assign(schemaObj, argsMapWithField.field);
      if (argsMapWithField.files) Object.assign(schemaObj, argsMapWithField.files);
      if (argsMapWithField.file) Object.assign(schemaObj, argsMapWithField.file);
      if (argsMapIsolate.files) schemaObj.blobs = argsMapIsolate.files;
      const schema = z.object(schemaObj);
      // body
      request.body = {
        required: true,
        content: {
          'multipart/form-data': {
            schema,
          },
        },
      };
    } else {
      for (const argumentType of __ArgumentTypes) {
        let schema: z.ZodSchema | undefined = argsMapIsolate[argumentType];
        if (argsMapWithField[argumentType]) {
          if (!schema) {
            schema = z.object(argsMapWithField[argumentType]);
          } else {
            schema = (schema as any).extend(argsMapWithField[argumentType]);
          }
        }
        if (!schema) continue;
        // record
        if (argumentType === 'body') {
          // body
          request.body = {
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
    }

    return request;
  }

  private _collectResponses(
    controller: Constructable,
    actionKey: string,
    actionOpenApiOptions: IOpenApiOptions | undefined,
  ) {
    // contentType
    const contentType = actionOpenApiOptions?.contentType || 'application/json';
    // body schema
    const bodySchema = this._parseBodySchema(controller, actionKey, actionOpenApiOptions, contentType);
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
    contentType: string,
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
    if (contentType !== 'application/json') return bodySchema;
    if (actionOpenApiOptions?.bodySchemaWrapper === false) return bodySchema;
    const wrapper = actionOpenApiOptions?.bodySchemaWrapper ?? bodySchemaWrapperDefault;
    return wrapper(bodySchema);
  }

  private _prepareArgsMeta(
    controller: Constructable,
    actionKey: string,
    actionOpenApiOptions: IOpenApiOptions | undefined,
    controllerOpenApiOptions: IOpenApiOptions | undefined,
  ) {
    // meta
    let argsMeta = appMetadata.getMetadata<RouteHandlerArgumentMetaDecorator[]>(
      SymbolRouteHandlersArgumentsMeta,
      controller.prototype,
      actionKey,
    );
    // headers
    const objHeaders = Object.assign(
      {},
      this._combineArgHeaders(controllerOpenApiOptions?.headers),
      this._combineArgHeaders(actionOpenApiOptions?.headers),
    );
    if (isEmptyObject(objHeaders)) return argsMeta;
    // merge
    if (!argsMeta) argsMeta = [];
    let argHeaders = argsMeta.find(item => item.type === 'headers' && !item.field);
    if (!argHeaders) {
      argHeaders = { type: 'headers', field: undefined, schema: z.object(objHeaders) } as any;
      argsMeta.push(argHeaders!);
    } else {
      argHeaders.schema = (argHeaders.schema as any).extend(objHeaders);
    }
    return argsMeta;
  }

  private _combineArgHeaders(headers?: IOpenApiHeader[] | undefined) {
    if (!headers) return;
    const objHeaders = {};
    for (const header of headers) {
      objHeaders[header.name] = z.string().openapi({ description: header.description });
    }
    return objHeaders;
  }
}
