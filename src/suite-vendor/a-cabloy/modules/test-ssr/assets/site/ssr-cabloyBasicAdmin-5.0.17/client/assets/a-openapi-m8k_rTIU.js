import { m as cast, A as jsonSchemaToZod, C as evaluateSimple, D as usePrepareArg, o as isNil, h as deepExtend, l as BeanInfo, U as Use, n as BeanBase, B as BeanSimple, v as BeanScopeBase, E as celEnvBase, F as getProperty, G as evaluateExpressions, H as objectAssignReactive, k as compose, I as beanFullNameFromOnionName, J as toUpperCaseFirstChar, K as isPromise } from "./zova-QgocPMzS.js";
import { c as classes } from "./typestyle-BzUluVB3.js";
import { L as toRaw, s as shallowReactive, l as ref, d as watch, M as h, N as createTextVNode } from "./vue-CRNsYCTs.js";
import "./openapi3-CmG_8H3_.js";
import { BeanModelBase, Model } from "./a-model-DdQjWvuo.js";
import { z } from "./zod-DcU_E_GK.js";
import { Sys, Scope } from "./a-bean-Bxu0OKjI.js";
const __FilterColumnsIgnore = ["columns", "where", "orders", "pageNo", "pageSize"];
function schemaToZodSchema(schema, onGetSchema) {
  const schemaNormalize = _normalizeSchema(toRaw(schema), onGetSchema);
  const code = jsonSchemaToZod(schemaNormalize);
  return evaluateSimple(code, {
    z
  });
}
function _normalizeSchema(schema, onGetSchema) {
  if (!schema.properties) return schema;
  const schemaNew = Object.assign({}, schema, {
    properties: {}
  });
  for (const key in schema.properties) {
    let property = schema.properties[key];
    if (property?.$ref) {
      property = onGetSchema(property.$ref);
    }
    if (!property) continue;
    schemaNew.properties[key] = _normalizeSchema(property, onGetSchema);
  }
  return schemaNew;
}
function getSchemaOfRequestBody(operationObject) {
  return cast(operationObject?.requestBody)?.content?.["application/json"]?.schema;
}
function getSchemaOfResponseBody(operationObject) {
  return operationObject?.responses?.["200"]?.content?.["application/json"]?.schema;
}
function getSchemaOfRequestQuery(operationObject) {
  const parameters = operationObject?.parameters;
  if (!parameters) return;
  const schema = {
    type: "object",
    required: [],
    properties: {}
  };
  for (const _parameter of parameters) {
    const parameter = _parameter;
    if (parameter.in !== "query") continue;
    const name = parameter.name;
    const fieldSchema = parameter.schema;
    schema.properties[name] = fieldSchema;
    if (parameter.required) schema.required.push(name);
  }
  return schema;
}
function getSchemaOfRequestQueryFilter(operationObject, options) {
  const parameters = operationObject?.parameters;
  if (!parameters) return;
  const schema = {
    type: "object",
    required: [],
    properties: {}
  };
  for (const _parameter of parameters) {
    const parameter = _parameter;
    if (parameter.in !== "query") continue;
    const name = parameter.name;
    if (__FilterColumnsIgnore.includes(name)) continue;
    const fieldSchema = parameter.schema;
    if (options?.where === true && fieldSchema.filter?.capabilities?.where !== false || options?.order === true && fieldSchema.filter?.capabilities?.order !== false) {
      schema.properties[name] = fieldSchema;
      if (parameter.required) schema.required.push(name);
    }
  }
  return schema;
}
const OrderCoreBase = 100;
const OrderBusinessBase = 1e3;
const OrderUnknownBase = 1e4;
const OrderMaxBase = 1e5;
var _dec$2, _dec2$2, _dec3, _dec4, _dec5, _class$2, _class2;
function _applyDecoratedDescriptor(i, e, r, n, l) {
  var a = {};
  return Object.keys(n).forEach(function(i2) {
    a[i2] = n[i2];
  }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = true), a = r.slice().reverse().reduce(function(r2, n2) {
    return n2(i, e, r2) || r2;
  }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a;
}
const __schemaRefPrefix = "#/components/schemas/";
let ModelSdk = (_dec$2 = Model({
  enableSelector: true
}), _dec2$2 = BeanInfo({
  module: "a-openapi"
}), _dec3 = Use({
  beanFullName: "a-openapi.sys.sdk"
}), _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", []), _dec$2(_class$2 = _dec2$2(_class$2 = (_class2 = class ModelSdk2 extends BeanModelBase {
  constructor(...args) {
    super(...args);
    this._eventSsrHmrReload = void 0;
  }
  get $$sysSdk() {
    return usePrepareArg(this.selector, true);
  }
  async __init__(locale) {
    if (!locale) throw new Error("locale not specified");
    await super.__init__(locale);
    if (this.sys.env.SSR_HMR === "true") {
      this._eventSsrHmrReload = this.sys.meta.event.on("a-ssrhmr:reload", async (_data, next) => {
        await this.$refetchQueries({
          queryKey: ["bootstrap"]
        });
        await this.$refetchQueries({
          queryKey: ["sdk"]
        });
        return next();
      });
    }
  }
  __dispose__() {
    if (this._eventSsrHmrReload) {
      this._eventSsrHmrReload();
    }
  }
  getBootstrap(resource) {
    return this.$useStateData({
      queryKey: ["bootstrap", resource],
      queryFn: async () => {
        const bootstrap = await this.$$sysSdk.loadBootstrap(this.$fetch, resource);
        if (!bootstrap) throw new Error("load bootstrap error");
        {
          await this.$refetchQueries({
            queryKey: ["permissions", resource]
          });
        }
        return bootstrap ?? null;
      }
    });
  }
  getPermissions(resource) {
    return this.$useStateData({
      queryKey: ["permissions", resource],
      queryFn: async () => {
        const bootstrap = await this.$$sysSdk.loadBootstrap(this.$fetch, resource);
        let permissions = bootstrap.resourceMeta.permissions;
        if (!isNil(permissions)) return permissions;
        permissions = await this.$fetch.get(this.sys.util.apiActionPathTranslate(this.scope.config.api.permissions, {
          resource
        }), this.sys.util.apiActionConfigPrepare());
        return permissions ?? null;
      }
    });
  }
  getSdk(api, apiMethod, apiOptions) {
    if (!api) throw new Error("should specify api");
    const [api2, apiMethod2] = this.$$sysSdk.prepareApiMeta(api, apiMethod);
    return this.$useStateData({
      queryKey: ["sdk", api2, apiMethod2],
      queryFn: async () => {
        const sdk = await this.$$sysSdk.loadSdk(this.$fetch, api, apiMethod, apiOptions);
        if (!sdk) throw new Error("load sdk error");
        for (const schemaName of sdk.schemas) {
          {
            await this.$refetchQueries({
              queryKey: ["schema", schemaName]
            });
          }
        }
        return sdk;
      }
    });
  }
  getSchema(schemaName) {
    if (schemaName.startsWith(__schemaRefPrefix)) {
      schemaName = schemaName.substring(__schemaRefPrefix.length);
    }
    return this.$useStateData({
      queryKey: ["schema", schemaName],
      queryFn: async () => {
        const schema = this.$$sysSdk.getSchema(schemaName);
        return schema ?? null;
      }
    });
  }
  getZodSchema(schemaName) {
    return this.$useStateComputed({
      queryKey: ["zodSchema", schemaName],
      queryFn: () => {
        const querySchema = this.getSchema(schemaName);
        if (!querySchema.data) return null;
        const zodSchema = schemaToZodSchema(querySchema.data, (schemaName2) => this.getSchema(schemaName2).data);
        return zodSchema;
      }
    });
  }
  getSchemaDefaultValue(schemaName) {
    return this.$useStateComputed({
      queryKey: ["schemaDefaultValue", schemaName],
      queryFn: () => {
        const querySchema = this.getSchema(schemaName);
        if (!querySchema.data) return null;
        const schema = querySchema.data;
        const defaultValues = {};
        for (const key in schema.properties) {
          const property = schema.properties[key];
          if (!isNil(property.default)) {
            defaultValues[key] = property.default;
          }
        }
        return defaultValues;
      }
    });
  }
  createApiSchemas(api, apiMethod, apiOptions) {
    const self = this;
    const sdk = this.getSdk(api, apiMethod, apiOptions);
    return {
      get sdk() {
        return sdk;
      },
      get query() {
        const operationObject = sdk.data?.operationObject;
        return getSchemaOfRequestQuery(operationObject);
      },
      get filter() {
        const operationObject = sdk.data?.operationObject;
        return getSchemaOfRequestQueryFilter(operationObject, {
          where: true
        });
      },
      get requestBody() {
        const operationObject = sdk.data?.operationObject;
        const schemaBody = getSchemaOfRequestBody(operationObject);
        const schemaName = cast(schemaBody)?.$ref;
        if (!schemaName) return;
        return self.getSchema(schemaName).data;
      },
      get responseBody() {
        const operationObject = sdk.data?.operationObject;
        const schemaBody = getSchemaOfResponseBody(operationObject);
        const schemaName = cast(schemaBody?.properties?.data)?.$ref;
        if (!schemaName) return;
        return self.getSchema(schemaName).data;
      },
      get paged() {
        const operationObject = sdk.data?.operationObject;
        const schemaBody = getSchemaOfResponseBody(operationObject);
        if (!schemaBody) return;
        const schemaName = cast(schemaBody?.properties?.data)?.items?.$ref;
        if (schemaName) return;
        return this.responseBody;
      },
      get row() {
        const operationObject = sdk.data?.operationObject;
        const schemaBody = getSchemaOfResponseBody(operationObject);
        if (!schemaBody) return;
        let schemaData;
        if (schemaBody?.properties?.data.$ref) {
          schemaData = self.getSchema(schemaBody?.properties?.data.$ref).data;
        } else {
          schemaData = schemaBody?.properties?.data;
        }
        const schemaName = cast(schemaData)?.items?.$ref;
        if (schemaName) {
          return self.getSchema(schemaName).data;
        }
        const schemaRow = cast(schemaData?.properties?.list)?.items;
        if (schemaRow?.$ref) {
          return self.getSchema(schemaRow?.$ref).data;
        }
        return schemaRow;
      }
    };
  }
  loadSchemaProperties(schema, scene) {
    if (!schema) return;
    const properties = schema.properties;
    const result = [];
    for (let key in properties) {
      let property = properties[key];
      if (property.$ref) {
        property = this.getSchema(property.$ref).data;
      }
      if (!property) continue;
      const customKey = property.rest?.customKey;
      if (customKey) {
        const parts = customKey.split(".");
        const propertyParent = parts[0] === key ? property : result.find((item) => item.key === parts[0]);
        property = propertyParent?.properties[parts[1]];
        key = customKey;
      }
      if (!property) continue;
      property = deepExtend({
        key
      }, property, {
        rest: property.rest?.[scene] ?? {}
      });
      result.push(property);
    }
    result.sort((a, b) => {
      return (a.rest?.order ?? OrderUnknownBase) - (b.rest?.order ?? OrderUnknownBase);
    });
    return result;
  }
}, _applyDecoratedDescriptor(_class2.prototype, "$$sysSdk", [_dec3, _dec4, _dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "$$sysSdk"), _class2.prototype), _class2)) || _class$2) || _class$2);
const SymbolOpenapiSchemaName = "__schemaName__";
var _dec$1, _dec2$1, _class$1;
let SysSdk = (_dec$1 = Sys(), _dec2$1 = BeanInfo({
  module: "a-openapi"
}), _dec$1(_class$1 = _dec2$1(_class$1 = class SysSdk2 extends BeanBase {
  constructor(...args) {
    super(...args);
    this.locale = void 0;
    this.bootstraps = void 0;
    this.schemas = void 0;
    this.sdks = void 0;
    this._eventSsrHmrReload = void 0;
    this._fetch = void 0;
  }
  async __init__(locale) {
    this.locale = locale;
    this.bootstraps = shallowReactive({});
    this.schemas = shallowReactive({});
    this.sdks = shallowReactive({});
    if (this.sys.env.SSR_HMR === "true") {
      this._eventSsrHmrReload = this.sys.meta.event.on("a-ssrhmr:reload", async (_data, next) => {
        await this.reload();
        return next();
      });
    }
  }
  __dispose__() {
    if (this._eventSsrHmrReload) {
      this._eventSsrHmrReload();
    }
  }
  async reload() {
    const bootstraps = this.bootstraps;
    this.bootstraps = shallowReactive({});
    for (const resource in bootstraps) {
      await this.loadBootstrap(this._fetch, resource);
    }
    const sdks = this.sdks;
    this.sdks = shallowReactive({});
    for (const api in sdks) {
      for (const apiMethod in sdks[api]) {
        await this.loadSdk(this._fetch, api, apiMethod, {
          authToken: false
        });
      }
    }
  }
  getBootstrap(resource) {
    return this.bootstraps[resource];
  }
  getSdk(api, apiMethod) {
    if (!api) return;
    const [api2, apiMethod2] = this.prepareApiMeta(api, apiMethod);
    return this.sdks[api2]?.[apiMethod2];
  }
  getSchema(schemaName) {
    return this.schemas[schemaName];
  }
  async loadBootstrap($fetch, resource) {
    {
      this._fetch = $fetch;
    }
    if (!this.bootstraps[resource]) {
      this.bootstraps[resource] = await $fetch.get(this.sys.util.apiActionPathTranslate(this.scope.config.api.bootstrap, {
        resource
      }), this.sys.util.apiActionConfigPrepare(void 0, void 0, false));
    }
    return this.bootstraps[resource];
  }
  async loadSdk($fetch, api, apiMethod, apiOptions) {
    {
      this._fetch = $fetch;
    }
    if (!api) return;
    const [api2, apiMethod2] = this.prepareApiMeta(api, apiMethod);
    if (this.sdks[api2]?.[apiMethod2]) return this.sdks[api2][apiMethod2];
    const params = [this.sys.util.apiActionPathTranslate(api2)];
    if (!["get", "delete"].includes(apiMethod2)) {
      params.push(void 0);
    }
    const options = {
      authToken: apiOptions?.authToken,
      openapiSchema: true,
      headers: {}
    };
    const localeKey = this.sys.env.APP_LOCALE_HEADER_KEY;
    if (localeKey) {
      options.headers[localeKey] = this.locale;
    }
    params.push(this.sys.util.apiActionConfigPrepare(void 0, options));
    const data = await $fetch[apiMethod2](...params);
    const schemaNames = [];
    const schemas = data.doc.components?.schemas;
    if (schemas) {
      for (const key in schemas) {
        const schema = schemas[key];
        if (!schema[SymbolOpenapiSchemaName]) {
          schema[SymbolOpenapiSchemaName] = key;
        }
        this.schemas[key] = schema;
        schemaNames.push(key);
      }
    }
    const paths = data.doc.paths;
    if (paths) {
      for (const key in paths) {
        if (!this.sdks[api2]) this.sdks[api2] = shallowReactive({});
        for (const method in paths[key]) {
          this.sdks[api2][method] = {
            schemas: schemaNames,
            operationObject: paths[key][method],
            meta: data.meta
          };
        }
      }
    }
    return this.sdks[api2][apiMethod2];
  }
  prepareApiMeta(api, apiMethod) {
    return [api, apiMethod ?? "get"];
  }
}) || _class$1) || _class$1);
const config = (_sys) => {
  return {
    base: {
      provider: {
        components: {
          form: "a-form:form",
          table: "a-table:table"
        },
        actions: {
          actionLog: "a-actions:log"
        }
      },
      form: {
        provider: {
          components: {
            formField: "a-form:formField",
            text: "input",
            password: "input",
            currency: "a-currency:formFieldCurrency"
          },
          behaviors: {}
        }
      },
      table: {
        provider: {
          components: {
            currency: "a-currency.tableCell.currency",
            date: "a-date.tableCell.date"
          },
          actions: {}
        }
      }
    },
    resourceMeta: {},
    api: {
      bootstrap: "/api/openapischema/resource/bootstrap/:resource",
      permissions: "/api/home/base/permission/:resource"
    }
  };
};
class Monkey extends BeanSimple {
  constructor(moduleSelf) {
    super();
    this._moduleSelf = void 0;
    this._modelSdk = ref();
    this._moduleSelf = moduleSelf;
  }
  async moduleLoading(_module) {
  }
  async moduleLoaded(module) {
    if (this._moduleSelf === module) {
      await this._loadSdk();
      this.ctx.util.instanceScope(() => {
        return watch(() => {
          return this.app.meta.locale.current;
        }, async () => {
          await this._loadSdk();
        });
      });
    }
  }
  async beanInit(bean, beanInstance) {
    const self = this;
    bean.defineProperty(beanInstance, "$sdk", {
      enumerable: false,
      configurable: true,
      get() {
        return self._modelSdk;
      }
    });
  }
  async _loadSdk() {
    this._modelSdk.value = await this.app.bean._getBeanSelector("a-openapi.model.sdk", true, this.app.meta.locale.current);
  }
}
var _dec, _dec2, _class;
let ScopeModuleAOpenapi = (_dec = Scope(), _dec2 = BeanInfo({
  module: "a-openapi"
}), _dec(_class = _dec2(_class = class ScopeModuleAOpenapi2 extends BeanScopeBase {
}) || _class) || _class);
const renderFieldJsxPropsSystem = ["children", "v-slot", "v-slot-scope", "v-if", "v-for", "v-each", "key"];
const __propsMapper = {
  className: "class"
};
function isNativeElement(Component) {
  return typeof Component === "string" && !Component.includes(":") && Component.charAt(0) >= "a" && Component.charAt(0) <= "z";
}
function isZovaComponent(Component) {
  return typeof Component === "string" && Component.includes(":");
}
function isJsxComponent(Component) {
  return typeof Component === "object" && Component.$$typeof === "zova-jsx:component";
}
function isJsxEvent(Component) {
  return typeof Component === "object" && Component.$$typeof === "zova-jsx:event";
}
function invokeProp(prop) {
  if (typeof prop === "function") return prop();
  return prop;
}
function normalizePropName(name) {
  return __propsMapper[name] ?? name;
}
class ZovaJsx extends BeanSimple {
  constructor(components, actions, celEnv) {
    super();
    this._components = void 0;
    this._actions = void 0;
    this._celEnv = void 0;
    this._transientObject = void 0;
    this._components = components;
    this._actions = actions;
    this._celEnv = this._prepareCelEnv(celEnv ?? celEnvBase);
  }
  _prepareCelEnv(celEnv) {
    celEnv = celEnv.clone();
    celEnv.registerFunction("getEvent():dyn", () => {
      return this.transientObject.eventObject ?? null;
    });
    celEnv.registerFunction("getEventProp(string):dyn", (prop) => {
      return getProperty(this.transientObject.eventObject, prop) ?? null;
    });
    return celEnv;
  }
  setTransientObject(transientObject, fnMethod) {
    const transientObjectPrev = this._transientObject;
    this._transientObject = transientObject;
    try {
      return fnMethod();
    } finally {
      this._transientObject = transientObjectPrev;
    }
  }
  get transientObject() {
    return this._transientObject;
  }
  get event() {
    return this.transientObject?.eventObject;
  }
  get components() {
    return this._components;
  }
  get actions() {
    return this._actions;
  }
  get celEnv() {
    return this._celEnv;
  }
  evaluateExpression(expression, celScope) {
    return evaluateExpressions(expression, celScope, this.celEnv);
  }
  renderJsxOrCel(componentOptions, props, celScope, renderContext) {
    if (isJsxComponent(componentOptions)) {
      const transientObject = this.transientObject;
      return () => {
        return this.setTransientObject(transientObject, () => {
          return this.render(componentOptions, props, celScope, renderContext);
        });
      };
    }
    if (isJsxEvent(componentOptions)) {
      let transientObject = this.transientObject;
      return (event) => {
        transientObject = {
          ...transientObject,
          eventObject: event
        };
        return this.setTransientObject(transientObject, () => {
          return this.renderEvent(event, componentOptions, celScope, renderContext);
        });
      };
    }
    return this.evaluateExpression(componentOptions, celScope);
  }
  renderEvent(event, componentOptions, celScope, renderContext) {
    if (event && event instanceof Event) {
      const props = this.renderJsxProps(componentOptions.props, {}, celScope, renderContext);
      if (props.stop) event.stopPropagation();
      if (props.prevent) event.preventDefault();
    }
    const eventRes = [];
    celScope = objectAssignReactive({}, celScope, {
      res: eventRes
    });
    return this.renderEventDirect(componentOptions, celScope, renderContext, eventRes);
  }
  renderEventDirect(componentOptions, celScope, renderContext, eventRes, next) {
    const actions = this._collectEventActions(componentOptions, celScope, renderContext, eventRes);
    if (!actions || actions.length === 0) return next ? next(void 0) : void 0;
    const transientObject = this.transientObject;
    return compose(actions)(void 0, (actionRes) => {
      if (!next) return actionRes;
      return this.setTransientObject(transientObject, () => {
        return next(actionRes);
      });
    });
  }
  _collectEventActions(componentOptions, celScope, renderContext, eventRes) {
    let actionChildren = componentOptions.props?.children;
    if (!actionChildren) return;
    if (!Array.isArray(actionChildren)) actionChildren = [actionChildren];
    const actions = [];
    const transientObject = this.transientObject;
    for (let index2 = 0; index2 < actionChildren.length; index2++) {
      const actionChild = actionChildren[index2];
      const action = (actionRes, next) => {
        if (isPromise(actionRes)) {
          return actionRes.then((actionRes2) => {
            return this._actionHandler(index2, actionChild, actionRes2, next, actionChildren, celScope, renderContext, eventRes, transientObject);
          });
        } else {
          return this._actionHandler(index2, actionChild, actionRes, next, actionChildren, celScope, renderContext, eventRes, transientObject);
        }
      };
      actions.push(action);
    }
    return actions;
  }
  _actionHandler(index2, actionChild, actionRes, next, actionChildren, celScope, renderContext, eventRes, transientObject) {
    return this.setTransientObject(transientObject, () => {
      if (index2 > 0) {
        if (actionRes === void 0) actionRes = null;
        eventRes[index2 - 1] = actionRes;
        const actionChildPrev = actionChildren[index2 - 1];
        const resName = cast(actionChildPrev.props)?.res;
        if (resName) {
          celScope = objectAssignReactive({}, celScope, {
            [resName]: actionRes
          });
        }
      }
      const vIf = this.evaluateExpression(actionChild.props?.["v-if"], celScope);
      if (vIf === false) return next(void 0);
      if (actionChild.type === "actionVar") {
        const props = this.renderJsxProps(actionChild.props, {}, celScope, renderContext);
        celScope = objectAssignReactive({}, celScope, {
          [cast(props).name]: cast(props).value
        });
        return next(void 0);
      } else if (actionChild.type === "actionExpr") {
        const expression = this.evaluateExpression(cast(actionChild.props)?.expression, celScope);
        return next(expression);
      } else if (isJsxEvent(actionChild)) {
        eventRes[index2] = [];
        return this.renderEventDirect(actionChild, objectAssignReactive({}, celScope), renderContext, eventRes[index2], next);
      } else {
        return this._renderEventActionNormal(actionChild, celScope, renderContext, next);
      }
    });
  }
  _renderEventActionNormal(actionChild, celScope, renderContext, next) {
    const actionName = this.normalizeAction(actionChild.type);
    const beanFullName = beanFullNameFromOnionName(actionName, "action");
    const beanInstance = this.sys.bean._getBeanSyncOnly(beanFullName);
    if (beanInstance) {
      return this._renderEventActionNormal_inner(beanInstance, actionChild, celScope, renderContext, next);
    }
    const transientObject = this.transientObject;
    return this.sys.bean._getBean(beanFullName, false).then((beanInstance2) => {
      return this.setTransientObject(transientObject, () => {
        return this._renderEventActionNormal_inner(beanInstance2, actionChild, celScope, renderContext, next);
      });
    });
  }
  _renderEventActionNormal_inner(beanInstance, actionChild, celScope, renderContext, next) {
    const onionOptions = beanInstance.$onionOptions;
    let props = this.renderJsxProps(actionChild.props, {}, celScope, renderContext);
    if (onionOptions) {
      props = deepExtend({}, onionOptions, props);
    }
    if (!renderContext) throw new Error("should provide renderContext");
    return beanInstance.execute(props, renderContext, next);
  }
  render(componentOptions, props, celScope, renderContext) {
    props = props ?? {};
    componentOptions = this.normalizeComponenOptions(componentOptions);
    const vIf = this.evaluateExpression(componentOptions.props?.["v-if"], celScope);
    if (vIf === false) return;
    const Component = this.normalizeComponent(componentOptions.type);
    const vFor = this.evaluateExpression(componentOptions.props?.["v-for"], celScope);
    if (!vFor) return this._renderJsxSingle(Component, componentOptions, props, celScope, renderContext);
    const children = [];
    for (let index2 = 0; index2 < vFor.length; index2++) {
      const each = vFor[index2];
      const eachName = this.evaluateExpression(componentOptions.props?.["v-each"], celScope) ?? "each";
      const celScopeEach = objectAssignReactive({}, celScope, {
        [eachName]: each,
        [`${eachName}Index`]: index2
      });
      const propsEach = {
        ...props
      };
      const child = this._renderJsxSingle(Component, componentOptions, propsEach, celScopeEach, renderContext);
      if (child) {
        children.push(child);
      }
    }
    return children;
  }
  normalizeComponenOptions(componentOptions) {
    if (typeof componentOptions === "object") return componentOptions;
    return {
      type: componentOptions
    };
  }
  normalizeComponent(type) {
    if (typeof type === "function") return type;
    if (typeof type === "string") {
      type = this.components?.[type] ?? type;
    }
    if (typeof type === "string" && ["script", "style", "link"].includes(type)) {
      throw new Error(`not valid zova jsx component: ${type}`);
    }
    return type;
  }
  normalizeAction(type) {
    return this.actions?.[type] ?? type;
  }
  _renderJsxSingle(Component, componentOptions, props, celScope, renderContext) {
    const _isZovaComponent = isZovaComponent(Component);
    if (!cast(props).key && componentOptions.key) {
      cast(props).key = this.evaluateExpression(componentOptions.key, celScope);
    }
    this.renderJsxProps(componentOptions.props, props, celScope, renderContext);
    let children;
    const propsChildren = componentOptions.props?.children;
    if (!propsChildren) {
      children = void 0;
    } else {
      if (isNativeElement(Component)) {
        children = this.renderJsxChildrenDirect(componentOptions.props.children, celScope, renderContext);
      } else {
        const childrenCollect = this._renderJsxChildrenCollect(componentOptions.props.children, celScope, renderContext);
        if (_isZovaComponent) {
          for (const key in childrenCollect) {
            const slot = childrenCollect[key];
            if (key === "default") {
              children = slot;
            } else {
              props[`slot${toUpperCaseFirstChar(key)}`] = slot;
            }
          }
        } else {
          children = childrenCollect;
        }
      }
    }
    if (_isZovaComponent) {
      Component = this.sys.meta.component.getZovaComponent(Component);
    }
    const vnode = h(Component, props, children);
    if (_isZovaComponent && renderContext) {
      cast(vnode).zovaHostProviders = {
        $$renderContext: renderContext
      };
    }
    return vnode;
  }
  renderJsxProps(jsxProps, props, celScope, renderContext) {
    if (!jsxProps) return props;
    const keys = Object.keys(jsxProps).filter((item) => !renderFieldJsxPropsSystem.includes(item));
    if (keys.length === 0) return props;
    for (const key of keys) {
      let keyValue = this.renderJsxOrCel(jsxProps[key], void 0, celScope, renderContext);
      const propName = normalizePropName(key);
      if (propName === "class") {
        keyValue = classes(props[propName], keyValue);
      }
      props[propName] = keyValue;
    }
    return props;
  }
  _renderJsxChildrenCollect(jsxChildren, celScope, renderContext) {
    if (!Array.isArray(jsxChildren)) jsxChildren = [jsxChildren];
    const children = [];
    const slots = {};
    const transientObject = this.transientObject;
    for (const jsxChild of jsxChildren) {
      if (jsxChild && typeof jsxChild === "object" && jsxChild.props?.["v-slot"]) {
        const slotName = jsxChild.props?.["v-slot"];
        const slotScopeName = jsxChild.props?.["v-slot-scope"];
        let slot;
        if (slotScopeName) {
          slot = (slotScope) => {
            return this.setTransientObject(transientObject, () => {
              const celScopeSub = objectAssignReactive({}, celScope, {
                [slotScopeName]: slotScope
              });
              return this.renderJsxChildrenDirect(jsxChild, celScopeSub, renderContext);
            });
          };
        } else {
          slot = () => {
            return this.setTransientObject(transientObject, () => {
              return this.renderJsxChildrenDirect(jsxChild, celScope, renderContext);
            });
          };
        }
        slots[slotName] = slot;
      } else {
        children.push(jsxChild);
      }
    }
    const slotDefault = children.length === 0 ? void 0 : () => {
      return this.setTransientObject(transientObject, () => {
        return this.renderJsxChildrenDirect(children, celScope, renderContext);
      });
    };
    return {
      ...slots,
      default: slotDefault
    };
  }
  renderJsxChildrenDirect(jsxChildren, celScope, renderContext) {
    if (!Array.isArray(jsxChildren)) jsxChildren = [jsxChildren];
    const children = [];
    for (const jsxChild of jsxChildren) {
      let child;
      if (isJsxComponent(jsxChild)) {
        if (jsxChild.type === "var") {
          const props = this.renderJsxProps(jsxChild.props, {}, celScope, renderContext);
          celScope = objectAssignReactive({}, celScope, {
            [cast(props).name]: cast(props).value
          });
          child = void 0;
        } else {
          child = this.render(jsxChild, void 0, celScope, renderContext);
        }
      } else {
        const childText = this.evaluateExpression(jsxChild, celScope);
        child = createTextVNode(childText ?? "");
      }
      if (child) {
        if (Array.isArray(child)) {
          children.push(...child);
        } else {
          children.push(child);
        }
      }
    }
    return children;
  }
}
const renderFormFieldTopPropsSystem = ["order", "table", "form", "filter"];
const renderTableColumnTopPropsSystem = ["order", "table", "form", "filter", "displayValue"];
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ModelSdk,
  Monkey,
  OrderBusinessBase,
  OrderCoreBase,
  OrderMaxBase,
  OrderUnknownBase,
  ScopeModuleAOpenapi,
  SymbolOpenapiSchemaName,
  SysSdk,
  config,
  getSchemaOfRequestBody,
  getSchemaOfRequestQuery,
  getSchemaOfRequestQueryFilter,
  getSchemaOfResponseBody,
  renderFormFieldTopPropsSystem,
  renderTableColumnTopPropsSystem,
  schemaToZodSchema
}, Symbol.toStringTag, { value: "Module" }));
export {
  SymbolOpenapiSchemaName as S,
  ZovaJsx as Z,
  renderFormFieldTopPropsSystem as a,
  invokeProp as b,
  index as c,
  isJsxComponent as i,
  renderTableColumnTopPropsSystem as r,
  schemaToZodSchema as s
};
