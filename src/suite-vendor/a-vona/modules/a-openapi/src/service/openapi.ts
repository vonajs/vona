import type { OpenAPIObject as OpenAPIObject30, SchemaObject as SchemaObject30, SecurityRequirementObject } from 'openapi3-ts/oas30';
import type { OpenAPIObject as OpenAPIObject31, SchemaObject as SchemaObject31 } from 'openapi3-ts/oas31';
import type {
  Constructable,
  IDecoratorBeanOptionsBase,
} from 'vona';
import type { IOpenApiHeader, IOpenapiObject, IOpenApiOptions, TypeGenerateJsonScene } from 'vona-module-a-openapiutils';
import type { IDecoratorControllerOptions, RequestMappingMetadata, TypeRequestMethod } from 'vona-module-a-web';
import type { RouteHandlerArgumentMetaDecorator } from '../types/decorator.ts';
import { OpenApiGeneratorV3, OpenApiGeneratorV31, OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import * as ModuleInfo from '@cabloy/module-info';
import { isEmptyObject } from '@cabloy/utils';
import { toUpperCaseFirstChar } from '@cabloy/word-utils';
import { getTypeName } from '@cabloy/zod-query';
import {
  appMetadata,
  appResource,
  BeanBase,
  cast,
  HttpStatus,
  LocaleModuleNameSeparator,
} from 'vona';
import { Service } from 'vona-module-a-bean';
import { Caching } from 'vona-module-a-caching';
import { SymbolOpenApiOptions } from 'vona-module-a-openapiutils';
import { SymbolRequestMappingHandler } from 'vona-module-a-web';
import { z } from 'zod';
import { bodySchemaWrapperDefault } from '../lib/schema/bodySchemaWrapper.ts';
import { $schema } from '../lib/schema/schema.ts';
import { SymbolRouteHandlersArgumentsMeta } from '../types/decorator.ts';

const __ArgumentTypes = ['param', 'query', 'body', 'headers', 'fields', 'field', 'files', 'file'];

@Service()
export class ServiceOpenapi extends BeanBase {
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
    const registry = this._collectRegistry();
    const generator =
      version === 'V30' ? new OpenApiGeneratorV3(registry.definitions) : new OpenApiGeneratorV31(registry.definitions);
    const apiObj = generator.generateDocument(this.scope.config.generateDocument[version]);
    this._translate(apiObj, 'api');
    return apiObj as IOpenapiObject[K];
  }

  @Caching.get({ cacheName: 'a-openapi:json', cacheKeyFn: 'generateJsonOfControllerActionCacheKey' })
  async generateJsonOfControllerAction<K extends keyof IOpenapiObject>(controller: Constructable, actionKey: string, version: K = 'V31' as any): Promise<IOpenapiObject[K]> {
    const registry = new OpenAPIRegistry();
    const beanOptions = appResource.getBean(controller);
    if (!beanOptions) throw new Error('invalid controller');
    this._collectController(registry, beanOptions.module, controller, actionKey);
    const generator =
      version === 'V30' ? new OpenApiGeneratorV3(registry.definitions) : new OpenApiGeneratorV31(registry.definitions);
    const apiObj = generator.generateDocument(this.scope.config.generateDocument[version]);
    this._translate(apiObj, 'rest');
    return apiObj as IOpenapiObject[K];
  }

  private _translate(apiObj: OpenAPIObject30 | OpenAPIObject31, generateJsonScene: TypeGenerateJsonScene) {
    // paths
    if (apiObj.paths) {
      for (const key in apiObj.paths) {
        const pathObj = apiObj.paths[key];
        for (const method in pathObj) {
          const methodObj = pathObj[method];
          this._translateStrings(methodObj, ['description', 'summary']);
          // parameters
          for (const parameterObj of methodObj.parameters || []) {
            this._translateSchema(parameterObj.schema, generateJsonScene);
          }
          // requestBody
          this._translateSchema(methodObj.requestBody?.content?.['application/json']?.schema, generateJsonScene);
        }
      }
    }
    // components
    if (apiObj.components?.schemas) {
      for (const key in apiObj.components.schemas) {
        const schema = apiObj.components.schemas[key];
        this._translateSchema(schema, generateJsonScene);
      }
    }
  }

  private _translateSchema(schema: any, generateJsonScene: TypeGenerateJsonScene) {
    if (!schema) return;
    if (schema.type === 'object' && schema.required === undefined) schema.required = [];
    this._translateStrings(schema, ['title', 'description']);
    if (generateJsonScene === 'api' && !schema.description && schema.title) {
      schema.description = schema.title;
      delete schema.title;
    }
    const properties = cast<SchemaObject30 | SchemaObject31>(schema).properties;
    if (properties && typeof properties === 'object') {
      for (const prop in properties) {
        const propObj = properties[prop];
        this._translateSchema(propObj, generateJsonScene);
      }
    }
  }

  private _translateStrings(obj: any, keys: string[]) {
    for (const key of keys) {
      this._translateString(obj, key);
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
    // schema: independent
    for (const sceneName of ['dto', 'entity']) {
      const onionSlices = this.bean.onion[sceneName].getOnionsEnabled();
      for (const onionSlice of onionSlices) {
        if (onionSlice.beanOptions.options?.independent) {
          const schema = $schema(onionSlice.beanOptions.beanClass);
          registry.register(onionSlice.beanOptions.beanFullName, schema);
        }
      }
    }
    // controller
    for (const controller of this.bean.onion.controller.getOnionsEnabled()) {
      this._collectController(registry, controller.beanOptions.module, controller.beanOptions.beanClass);
    }
    return registry;
  }

  private _collectController(registry: OpenAPIRegistry, moduleName: string, controller: Constructable, actionKey?: string) {
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
    const actionKeys = actionKey ? [actionKey] : Object.keys(descs);
    for (const actionKey of actionKeys) {
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
    const actionPath: string = handlerMetadata.path || '';
    const actionMethod: TypeRequestMethod = handlerMetadata.method || 'get';

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
      request: this._collectRequest(info, controller, actionKey, actionOpenApiOptions, controllerOpenApiOptions),
      responses: this._collectResponses(controller, actionKey, actionOpenApiOptions),
    });
  }

  private _collectRequest(
    info: ModuleInfo.IModuleInfo,
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
        // check schema
        if (getTypeName(schema) === 'ZodAny') {
          throw new Error(`Invalid Openapi argument type: ${info.relativeName}:${controller.name}.${actionKey}#${argumentType}`);
        }
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
      bodySchema = $schema(metaType as any);
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
      {} as any,
      this._combineArgHeaders(controllerOpenApiOptions?.headers),
      this._combineArgHeaders(actionOpenApiOptions?.headers),
    );
    // public
    const _public: boolean | undefined = actionOpenApiOptions?.public ?? controllerOpenApiOptions?.public;
    if (!_public && !objHeaders.Authorization) {
      objHeaders.Authorization = z.string().optional();
    }
    if (isEmptyObject(objHeaders)) return argsMeta;
    // merge
    if (!argsMeta) argsMeta = [];
    let argHeaders = argsMeta.find(item => item.type === 'headers' && !item.field);
    if (!argHeaders) {
      argHeaders = { type: 'headers', field: undefined, schema: z.object(objHeaders) } as any;
      argsMeta.push(argHeaders!);
    } else {
      if (!(argHeaders.schema as any).extend) throw new Error(`headers schema is not valid: ${actionKey}`);
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
