import { h as deepExtend, ak as hashkey, o as isNil, l as BeanInfo, X as UseScope, Z as BeanControllerPageBase, D as usePrepareArg, y as useCustomRef, E as celEnvBase, W as createZovaComponentAsync, U as Use, V as Virtual, ae as createZovaComponentPage, v as BeanScopeBase } from "./zova-QgocPMzS.js";
import { formSceneFromFormMeta, formMetaFromFormScene } from "./a-form-ae5PgLrA.js";
import { BeanModelBase, $QueryAutoLoad, Model } from "./a-model-DdQjWvuo.js";
import { S as SymbolOpenapiSchemaName, Z as ZovaJsx } from "./a-openapi-m8k_rTIU.js";
import "./typestyle-BzUluVB3.js";
import "./openapi3-CmG_8H3_.js";
import { P as createVNode, ab as isVNode } from "./vue-CRNsYCTs.js";
import { Controller, Scope } from "./a-bean-Bxu0OKjI.js";
import { o as object, c as string } from "./zod-DcU_E_GK.js";
import "./commonjsHelper-CCIqAdii.js";
import "./tanstack-form-c5sVeo1k.js";
import "./tanstack-query-D5lEwADt.js";
import "./localforage-DLcenR3h.js";
var _dec$4, _dec2$4, _dec3$3, _dec4$2, _class$4, _class2$2, _descriptor;
function _initializerDefineProperty(e, i, r, l) {
  r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 });
}
function _applyDecoratedDescriptor$2(i, e, r, n, l) {
  var a = {};
  return Object.keys(n).forEach(function(i2) {
    a[i2] = n[i2];
  }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = true), a = r.slice().reverse().reduce(function(r2, n2) {
    return n2(i, e, r2) || r2;
  }, a), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a;
}
let ModelResource = (_dec$4 = Model({
  enableSelector: true
}), _dec2$4 = BeanInfo({
  module: "rest-resource"
}), _dec3$3 = UseScope("a-openapi"), _dec4$2 = Reflect.metadata("design:type", typeof ScopeModuleAOpenapi === "undefined" ? Object : ScopeModuleAOpenapi), _dec$4(_class$4 = _dec2$4(_class$4 = (_class2$2 = class ModelResource2 extends BeanModelBase {
  constructor(...args) {
    super(...args);
    this.resource = void 0;
    this.resourceApi = void 0;
    this.resourceMeta = void 0;
    this.permissions = void 0;
    this.formProvider = void 0;
    this.tableProvider = void 0;
    this.schemaView = void 0;
    this.schemaCreate = void 0;
    this.schemaUpdate = void 0;
    this.schemaFilter = void 0;
    this.schemaRow = void 0;
    this.schemaPages = void 0;
    _initializerDefineProperty(this, "$$scopeModuleAOpenapi", _descriptor, this);
  }
  async __init__(resource) {
    if (!resource) throw new Error("resource not specified");
    await super.__init__(resource);
    this.resource = resource;
    this.resourceMeta = this.$useComputed(() => {
      const resourceMeta = this.$sdk.getBootstrap(this.resource);
      return deepExtend({}, this.$$scopeModuleAOpenapi.config.resourceMeta, resourceMeta.data?.resourceMeta);
    });
    this.permissions = this.$useComputed(() => {
      const permissions = this.$sdk.getPermissions(this.resource);
      return permissions.data;
    });
    this.formProvider = this.$useComputed(() => {
      return deepExtend({}, this.resourceMeta.provider, this.resourceMeta.form?.provider);
    });
    this.tableProvider = this.$useComputed(() => {
      return deepExtend({}, this.resourceMeta.provider, this.resourceMeta.table?.provider);
    });
    this.schemaView = this.$useComputed(() => {
      return this.apiSchemasView.responseBody;
    });
    this.schemaCreate = this.$useComputed(() => {
      return this.apiSchemasCreate.requestBody;
    });
    this.schemaUpdate = this.$useComputed(() => {
      return this.apiSchemasUpdate.requestBody;
    });
    this.schemaFilter = this.$useComputed(() => {
      return this.apiSchemasSelect.filter;
    });
    this.schemaRow = this.$useComputed(() => {
      return this.apiSchemasSelect.row;
    });
    this.schemaPages = this.$useComputed(() => {
      return this.apiSchemasSelect.paged;
    });
    await this._bootstrap();
  }
  selectGeneral(actionPath, query) {
    const queryHash = hashkey(query);
    return this.$useStateData({
      queryKey: ["select", actionPath ?? "", queryHash],
      queryFn: async () => {
        const apiPath = actionPath ? `${this.resourceApi}/${actionPath}` : this.resourceApi;
        return this.$fetch.get(this.sys.util.apiActionPathTranslate(apiPath), this.sys.util.apiActionConfigPrepare(void 0, {
          query
        }));
      }
    });
  }
  select(query) {
    return this.selectGeneral(void 0, query);
  }
  view(id) {
    if (isNil(id)) throw new Error("row id cannot empty");
    return this.$useStateData({
      queryKey: ["get", id],
      queryFn: async () => {
        const res = await this.$fetch.get(this.sys.util.apiActionPathTranslate(`${this.resourceApi}/:id`, {
          id
        }), this.sys.util.apiActionConfigPrepare());
        return res ?? null;
      }
    });
  }
  create() {
    return this.$useMutationData({
      mutationKey: ["create"],
      mutationFn: async (params) => {
        return this.$fetch.post(this.sys.util.apiActionPathTranslate(this.resourceApi), params, this.sys.util.apiActionConfigPrepare());
      },
      onSuccess: () => {
        this.$invalidateQueries({
          queryKey: ["select"]
        });
      }
    });
  }
  update(id) {
    return this.$useMutationData({
      mutationKey: ["update", id],
      mutationFn: async (params) => {
        return this.$fetch.patch(this.sys.util.apiActionPathTranslate(`${this.resourceApi}/:id`, {
          id
        }), params, this.sys.util.apiActionConfigPrepare());
      },
      onSuccess: () => {
        this.$invalidateQueries({
          queryKey: ["select"]
        });
        this.$invalidateQueries({
          queryKey: ["get", id]
        });
      }
    });
  }
  delete(id) {
    return this.$useMutationData({
      mutationKey: ["delete", id],
      mutationFn: async () => {
        return this.$fetch.delete(this.sys.util.apiActionPathTranslate(`${this.resourceApi}/:id`, {
          id
        }), this.sys.util.apiActionConfigPrepare());
      },
      onSuccess: () => {
        this.$invalidateQueries({
          queryKey: ["select"]
        });
        this.$invalidateQueries({
          queryKey: ["get", id]
        });
      }
    });
  }
  get apiSchemasSelect() {
    return this.$sdk.createApiSchemas(this.resourceApi, "get");
  }
  get apiSchemasView() {
    return this.$sdk.createApiSchemas(`${this.resourceApi}/:id`, "get");
  }
  get apiSchemasCreate() {
    return this.$sdk.createApiSchemas(this.resourceApi, "post");
  }
  get apiSchemasUpdate() {
    return this.$sdk.createApiSchemas(`${this.resourceApi}/:id`, "patch");
  }
  get componentRestPage() {
    return this.resourceMeta.provider.components.restPage;
  }
  get componentRestPageEntry() {
    return this.resourceMeta.provider.components.restPageEntry;
  }
  get componentTable() {
    return this.resourceMeta.provider.components.table;
  }
  get componentForm() {
    return this.resourceMeta.provider.components.form;
  }
  getFormSchema(formMeta) {
    const formScene = formMeta.formScene ?? formSceneFromFormMeta(formMeta);
    if (formScene === "view") return this.schemaView;
    if (formScene === "create") return this.schemaCreate;
    if (formScene === "edit") return this.schemaUpdate;
  }
  getFormApiSchemas(formMeta) {
    const formScene = formMeta.formScene ?? formSceneFromFormMeta(formMeta);
    if (formScene === "view") return this.apiSchemasView;
    if (formScene === "create") return this.apiSchemasCreate;
    if (formScene === "edit") return this.apiSchemasUpdate;
    throw new Error("invalid parameters");
  }
  getFormMutationSubmit(formMeta, id) {
    if (formMeta.formMode !== "edit") return;
    if (formMeta.editMode === "create") {
      return this.create();
    } else if (formMeta.editMode === "update") {
      return this.update(id);
    }
  }
  getFormData(formMeta, id) {
    if (formMeta.formMode === "edit" && formMeta.editMode === "create") {
      return this.getQueryDataDefaultValue(this.schemaCreate);
    }
    if (isNil(id)) return void 0;
    return this.view(id).data;
  }
  getQueryDataDefaultValue(schemaName) {
    if (!schemaName) return;
    if (typeof schemaName === "object") {
      schemaName = schemaName[SymbolOpenapiSchemaName];
    }
    return this.$sdk.getSchemaDefaultValue(schemaName);
  }
  async _bootstrap() {
    const queryBootstrap = await $QueryAutoLoad(() => this.$sdk.getBootstrap(this.resource));
    if (!queryBootstrap?.data) {
      throw new Error(`not found sdk of resource: ${this.resource}`);
    }
    this.resourceApi = this.sys.util.parseResourceApi(this.resource, queryBootstrap.data.apiPath);
  }
}, _descriptor = _applyDecoratedDescriptor$2(_class2$2.prototype, "$$scopeModuleAOpenapi", [_dec3$3, _dec4$2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2$2)) || _class$4) || _class$4);
var _dec$3, _dec2$3, _dec3$2, _dec4$1, _dec5$1, _class$3, _class2$1;
function _applyDecoratedDescriptor$1(i, e, r, n, l) {
  var a = {};
  return Object.keys(n).forEach(function(i2) {
    a[i2] = n[i2];
  }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = true), a = r.slice().reverse().reduce(function(r2, n2) {
    return n2(i, e, r2) || r2;
  }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a;
}
const ZPage$1 = createZovaComponentAsync("home-base", "page");
function _isSlot$1(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const ControllerPageEntrySchemaParams = object({
  resource: string(),
  id: string().optional(),
  formScene: string().optional()
});
let ControllerPageEntry = (_dec$3 = Controller(), _dec2$3 = BeanInfo({
  module: "rest-resource"
}), _dec3$2 = Use({
  beanFullName: "rest-resource.model.resource"
}), _dec4$1 = Reflect.metadata("design:type", Function), _dec5$1 = Reflect.metadata("design:paramtypes", []), _dec$3(_class$3 = _dec2$3(_class$3 = (_class2$1 = class ControllerPageEntry2 extends BeanControllerPageBase {
  constructor(...args) {
    super(...args);
    this.formMeta = void 0;
    this.formProvider = void 0;
    this.pageEntryWrapperScope = void 0;
    this.zovaJsx = void 0;
    this.pageEntryWrapperCelEnv = void 0;
  }
  get $$modelResource() {
    return usePrepareArg(this.$params.resource, true);
  }
  get resource() {
    return this.$params.resource;
  }
  get entryId() {
    return this.$params.id;
  }
  get formScene() {
    return this.$params.formScene ?? (isNil(this.entryId) ? "create" : "view");
  }
  async __init__() {
    this.bean._setBean("$$pageEntryWrapper", this);
    this.formMeta = this.$useComputed(() => {
      const formScene = this.formScene;
      return {
        ...formMetaFromFormScene(formScene),
        formScene
      };
    });
    this.formProvider = this.$useComputed(() => {
      return this.$$modelResource.formProvider;
    });
    this.pageEntryWrapperScope = this._getPageEntryWrapperScope();
    this.pageEntryWrapperCelEnv = this._getPageEntryWrapperCelEnv();
    this.zovaJsx = this.app.bean._newBeanSimple(ZovaJsx, false, this.formProvider.components, this.formProvider.actions, this.pageEntryWrapperCelEnv);
  }
  async onActionTable(_action) {
  }
  async onActionRow(action) {
    if (!this.entryId) return;
    if (action === "delete") {
      const mutation = this.$$modelResource.delete(this.entryId);
      await mutation.mutateAsync();
    }
  }
  _getPageEntryWrapperScope() {
    const self = this;
    const permissions = useCustomRef(() => {
      return {
        get() {
          return self.$$modelResource.permissions;
        },
        set(_value) {
        }
      };
    });
    return {
      resource: this.$params.resource,
      id: this.entryId,
      permissions,
      onActionTable: (action) => {
        return this.onActionTable(action);
      },
      onActionRow: (action) => {
        return this.onActionRow(action);
      }
    };
  }
  _getPageEntryWrapperCelEnv() {
    const celEnv = celEnvBase.clone();
    return celEnv;
  }
  getJsxRenderContextPageEntryWrapper(celScope) {
    return {
      app: this.app,
      ctx: this.ctx,
      $scene: "pageEntryWrapper",
      $host: this,
      $celScope: celScope,
      $jsx: this.zovaJsx,
      $$pageEntryWrapper: this
    };
  }
  render() {
    const celScope = this.pageEntryWrapperScope;
    const jsxRenderContext = this.getJsxRenderContextPageEntryWrapper(celScope);
    const domRestPageEntry = this.zovaJsx.render(this.$$modelResource.componentRestPageEntry, {}, celScope, jsxRenderContext);
    return createVNode(ZPage$1, null, _isSlot$1(domRestPageEntry) ? domRestPageEntry : {
      default: () => [domRestPageEntry]
    });
  }
}, _applyDecoratedDescriptor$1(_class2$1.prototype, "$$modelResource", [_dec3$2, _dec4$1, _dec5$1], Object.getOwnPropertyDescriptor(_class2$1.prototype, "$$modelResource"), _class2$1.prototype), _class2$1)) || _class$3) || _class$3);
var _dec$2, _dec2$2, _dec3$1, _class$2;
const ControllerPageEntryCreateSchemaParams = ControllerPageEntrySchemaParams;
let ControllerPageEntryCreate = (_dec$2 = Controller(), _dec2$2 = Virtual(), _dec3$1 = BeanInfo({
  module: "rest-resource"
}), _dec$2(_class$2 = _dec2$2(_class$2 = _dec3$1(_class$2 = class ControllerPageEntryCreate2 extends ControllerPageEntry {
}) || _class$2) || _class$2) || _class$2);
var _dec$1, _dec2$1, _dec3, _dec4, _dec5, _class$1, _class2;
function _applyDecoratedDescriptor(i, e, r, n, l) {
  var a = {};
  return Object.keys(n).forEach(function(i2) {
    a[i2] = n[i2];
  }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = true), a = r.slice().reverse().reduce(function(r2, n2) {
    return n2(i, e, r2) || r2;
  }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a;
}
const ZPage = createZovaComponentAsync("home-base", "page");
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const ControllerPageResourceSchemaParams = object({
  resource: string()
});
let ControllerPageResource = (_dec$1 = Controller(), _dec2$1 = BeanInfo({
  module: "rest-resource"
}), _dec3 = Use({
  beanFullName: "rest-resource.model.resource"
}), _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", []), _dec$1(_class$1 = _dec2$1(_class$1 = (_class2 = class ControllerPageResource2 extends BeanControllerPageBase {
  constructor(...args) {
    super(...args);
    this.tableProvider = void 0;
    this.pageWrapperScope = void 0;
    this.zovaJsx = void 0;
    this.pageWrapperCelEnv = void 0;
  }
  get $$modelResource() {
    return usePrepareArg(this.$params.resource, true);
  }
  async __init__() {
    this.bean._setBean("$$pageWrapper", this);
    this.tableProvider = this.$useComputed(() => {
      return this.$$modelResource.tableProvider;
    });
    this.pageWrapperScope = this._getPageWrapperScope();
    this.pageWrapperCelEnv = this._getPageWrapperCelEnv();
    this.zovaJsx = this.app.bean._newBeanSimple(ZovaJsx, false, this.tableProvider.components, this.tableProvider.actions, this.pageWrapperCelEnv);
  }
  get resource() {
    return this.$params.resource;
  }
  async onActionTable(_action) {
  }
  async onActionRow(action, id) {
    if (action === "delete") {
      const mutation = this.$$modelResource.delete(id);
      await mutation.mutateAsync();
    }
  }
  _getPageWrapperScope() {
    const self = this;
    const permissions = useCustomRef(() => {
      return {
        get() {
          return self.$$modelResource.permissions;
        },
        set(_value) {
        }
      };
    });
    return {
      resource: this.$$modelResource.resource,
      permissions,
      onActionTable: (action) => {
        return this.onActionTable(action);
      },
      onActionRow: (action, id) => {
        return this.onActionRow(action, id);
      }
    };
  }
  _getPageWrapperCelEnv() {
    const celEnv = celEnvBase.clone();
    return celEnv;
  }
  getJsxRenderContextPageWrapper(celScope) {
    return {
      app: this.app,
      ctx: this.ctx,
      $scene: "pageWrapper",
      $host: this,
      $celScope: celScope,
      $jsx: this.zovaJsx,
      $$pageWrapper: this
    };
  }
  render() {
    const celScope = this.pageWrapperScope;
    const jsxRenderContext = this.getJsxRenderContextPageWrapper(celScope);
    const domRestPage = this.zovaJsx.render(this.$$modelResource.componentRestPage, {}, celScope, jsxRenderContext);
    return createVNode(ZPage, null, _isSlot(domRestPage) ? domRestPage : {
      default: () => [domRestPage]
    });
  }
}, _applyDecoratedDescriptor(_class2.prototype, "$$modelResource", [_dec3, _dec4, _dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "$$modelResource"), _class2.prototype), _class2)) || _class$1) || _class$1);
let NSControllerPageEntry;
(function(_NSControllerPageEntry) {
  _NSControllerPageEntry.paramsSchema = ControllerPageEntrySchemaParams;
})(NSControllerPageEntry || (NSControllerPageEntry = {}));
const ZPageEntry = createZovaComponentPage(ControllerPageEntry, void 0, void 0);
let NSControllerPageEntryCreate;
(function(_NSControllerPageEntryCreate) {
  _NSControllerPageEntryCreate.paramsSchema = ControllerPageEntryCreateSchemaParams;
})(NSControllerPageEntryCreate || (NSControllerPageEntryCreate = {}));
const ZPageEntryCreate = createZovaComponentPage(ControllerPageEntryCreate, void 0, void 0);
let NSControllerPageResource;
(function(_NSControllerPageResource) {
  _NSControllerPageResource.paramsSchema = ControllerPageResourceSchemaParams;
})(NSControllerPageResource || (NSControllerPageResource = {}));
const ZPageResource = createZovaComponentPage(ControllerPageResource, void 0, void 0);
const routes = [{
  name: "resource",
  path: ":resource",
  component: ZPageResource,
  meta: {
    tabKey
  }
}, {
  name: "entryCreate",
  path: ":resource/create",
  component: ZPageEntryCreate,
  meta: {
    tabKey
  }
}, {
  name: "entry",
  path: ":resource/:id/:formScene?",
  component: ZPageEntry,
  meta: {
    tabKey
  }
}];
function tabKey(route) {
  return `/rest/resource/${encodeURIComponent(route.params.resource)}`;
}
var _dec, _dec2, _class;
const pagePathSchemas = {};
const pageNameSchemas = {
  "rest-resource:entry": {
    params: NSControllerPageEntry.paramsSchema
  },
  "rest-resource:entryCreate": {
    params: NSControllerPageEntryCreate.paramsSchema
  },
  "rest-resource:resource": {
    params: NSControllerPageResource.paramsSchema
  }
};
let ScopeModuleRestResource = (_dec = Scope(), _dec2 = BeanInfo({
  module: "rest-resource"
}), _dec(_class = _dec2(_class = class ScopeModuleRestResource2 extends BeanScopeBase {
}) || _class) || _class);
export {
  ControllerPageEntry,
  ControllerPageEntryCreate,
  ControllerPageEntryCreateSchemaParams,
  ControllerPageEntrySchemaParams,
  ControllerPageResource,
  ControllerPageResourceSchemaParams,
  ModelResource,
  NSControllerPageEntry,
  NSControllerPageEntryCreate,
  NSControllerPageResource,
  ScopeModuleRestResource,
  ZPageEntry,
  ZPageEntryCreate,
  ZPageResource,
  pageNameSchemas,
  pagePathSchemas,
  routes
};
