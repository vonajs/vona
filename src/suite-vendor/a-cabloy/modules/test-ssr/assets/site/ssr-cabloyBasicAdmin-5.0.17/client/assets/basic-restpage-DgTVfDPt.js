import { BeanControllerTableBase } from "./a-table-CQXUiX08.js";
import { l as BeanInfo, U as Use, L as BeanControllerBase, o as isNil, aj as isNilOrEmptyString, Y as BeanRenderBase, M as prepareComponentOptions, N as useController, v as BeanScopeBase, aa as useApp, a7 as useComputed } from "./zova-QgocPMzS.js";
import "./a-form-ae5PgLrA.js";
import { c as createColumnHelper } from "./tanstack-table-JfOO9tPD.js";
import { Controller, Render, Scope } from "./a-bean-Bxu0OKjI.js";
import { $QueriesAutoLoad } from "./a-model-DdQjWvuo.js";
import { P as createVNode, R as Fragment, o as defineComponent, N as createTextVNode } from "./vue-CRNsYCTs.js";
import { c as classes } from "./typestyle-BzUluVB3.js";
import "./a-openapi-m8k_rTIU.js";
import "./openapi3-CmG_8H3_.js";
import "./zod-DcU_E_GK.js";
import "./commonjsHelper-CCIqAdii.js";
import "./tanstack-query-D5lEwADt.js";
import "./localforage-DLcenR3h.js";
import "./tanstack-form-c5sVeo1k.js";
var _dec$6, _dec2$6, _dec3$2, _dec4$2, _dec5$1, _dec6$1, _class$6, _class2$2, _descriptor$2, _descriptor2$1, _ControllerRestPage;
function _initializerDefineProperty$2(e, i, r, l) {
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
let ControllerRestPage = (_dec$6 = Controller(), _dec2$6 = BeanInfo({
  module: "basic-restpage"
}), _dec3$2 = Use({
  injectionScope: "host"
}), _dec4$2 = Reflect.metadata("design:type", typeof ControllerPageResource === "undefined" ? Object : ControllerPageResource), _dec5$1 = Use({
  injectionScope: "host"
}), _dec6$1 = Reflect.metadata("design:type", typeof ModelResource === "undefined" ? Object : ModelResource), _dec$6(_class$6 = _dec2$6(_class$6 = (_class2$2 = (_ControllerRestPage = class ControllerRestPage2 extends BeanControllerTableBase {
  constructor(...args) {
    super(...args);
    this.queryFilterData = void 0;
    this.queryPaged = void 0;
    this.query = void 0;
    _initializerDefineProperty$2(this, "$$pageWrapper", _descriptor$2, this);
    _initializerDefineProperty$2(this, "$$modelResource", _descriptor2$1, this);
  }
  async __init__() {
    this.bean._setBean("$$page", this);
    this.queryFilterData = {};
    this.queryPaged = {
      pageNo: 1
    };
    this.query = this.$useComputed(() => {
      return Object.assign({}, this.queryFilterData, this.queryPaged);
    });
    await $QueriesAutoLoad(() => this.$$modelResource.apiSchemasSelect.sdk, () => this.queryData);
  }
  get resource() {
    return this.$$pageWrapper.resource;
  }
  get tableProvider() {
    return this.$$pageWrapper.tableProvider;
  }
  get pageScope() {
    return this.$$pageWrapper.pageWrapperScope;
  }
  get zovaJsx() {
    return this.$$pageWrapper.zovaJsx;
  }
  get pageCelEnv() {
    return this.$$pageWrapper.pageWrapperCelEnv;
  }
  getJsxRenderContextPage(celScope) {
    return {
      app: this.app,
      ctx: this.ctx,
      $scene: "page",
      $host: this,
      $celScope: celScope,
      $jsx: this.zovaJsx,
      $$page: this
    };
  }
  get queryData() {
    return this.$$modelResource.select(this.query);
  }
  get data() {
    return this.queryData.data?.list;
  }
  get paged() {
    return this.queryData.data;
  }
  get schema() {
    return this.$$modelResource.schemaRow;
  }
  get permissions() {
    return this.$$modelResource.permissions;
  }
  async getColumns(next, $$table) {
    const columns = await next();
    const permissionUpdate = this.$passport.checkPermission(this.permissions, "update");
    const permissionDelete = this.$passport.checkPermission(this.permissions, "delete");
    if (!permissionUpdate && !permissionDelete) return columns;
    const columnHelper = createColumnHelper();
    const id = "actions";
    const columnRender = await $$table.createColumnRender(id, "actionOperationsRow");
    columns.push(columnHelper.display({
      id: "actions",
      header: () => this.scope.locale.TableActions(),
      cell: columnRender
    }));
    return columns;
  }
  gotoPage(pageNo) {
    if (this.queryPaged.pageNo !== pageNo) {
      this.queryPaged.pageNo = pageNo;
    }
  }
  onFilter(data) {
    this.queryFilterData = data;
  }
}, _ControllerRestPage.$propsDefault = {
  showFilter: true
}, _ControllerRestPage), _descriptor$2 = _applyDecoratedDescriptor$2(_class2$2.prototype, "$$pageWrapper", [_dec3$2, _dec4$2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2$1 = _applyDecoratedDescriptor$2(_class2$2.prototype, "$$modelResource", [_dec5$1, _dec6$1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2$2)) || _class$6) || _class$6);
var _dec$5, _dec2$5, _dec3$1, _dec4$1, _dec5, _dec6, _class$5, _class2$1, _descriptor$1, _descriptor2, _ControllerRestPageEntry;
function _initializerDefineProperty$1(e, i, r, l) {
  r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 });
}
function _applyDecoratedDescriptor$1(i, e, r, n, l) {
  var a = {};
  return Object.keys(n).forEach(function(i2) {
    a[i2] = n[i2];
  }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = true), a = r.slice().reverse().reduce(function(r2, n2) {
    return n2(i, e, r2) || r2;
  }, a), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a;
}
let ControllerRestPageEntry = (_dec$5 = Controller(), _dec2$5 = BeanInfo({
  module: "basic-restpage"
}), _dec3$1 = Use({
  injectionScope: "host"
}), _dec4$1 = Reflect.metadata("design:type", typeof ControllerPageEntry === "undefined" ? Object : ControllerPageEntry), _dec5 = Use({
  injectionScope: "host"
}), _dec6 = Reflect.metadata("design:type", typeof ModelResource === "undefined" ? Object : ModelResource), _dec$5(_class$5 = _dec2$5(_class$5 = (_class2$1 = (_ControllerRestPageEntry = class ControllerRestPageEntry2 extends BeanControllerBase {
  constructor(...args) {
    super(...args);
    this.controllerForm = void 0;
    this.formSchema = void 0;
    this.formData = void 0;
    _initializerDefineProperty$1(this, "$$pageEntryWrapper", _descriptor$1, this);
    _initializerDefineProperty$1(this, "$$modelResource", _descriptor2, this);
  }
  async __init__() {
    this.bean._setBean("$$pageEntry", this);
    this.formSchema = this.$useComputed(() => {
      return this.$$modelResource.getFormSchema(this.formMeta);
    });
    this.formData = this.$useComputed(() => {
      return this.$$modelResource.getFormData(this.formMeta, this.entryId);
    });
    await $QueriesAutoLoad(() => this.$$modelResource.getFormApiSchemas(this.formMeta)?.sdk, () => this.queryData);
  }
  get formProvider() {
    return this.$$pageEntryWrapper.formProvider;
  }
  get pageEntryScope() {
    return this.$$pageEntryWrapper.pageEntryWrapperScope;
  }
  get zovaJsx() {
    return this.$$pageEntryWrapper.zovaJsx;
  }
  get pageEntryCelEnv() {
    return this.$$pageEntryWrapper.pageEntryWrapperCelEnv;
  }
  getJsxRenderContextPageEntry(celScope) {
    return {
      app: this.app,
      ctx: this.ctx,
      $scene: "pageEntry",
      $host: this,
      $celScope: celScope,
      $jsx: this.zovaJsx,
      $$pageEntry: this
    };
  }
  get resource() {
    return this.$$pageEntryWrapper.resource;
  }
  get entryId() {
    return this.$$pageEntryWrapper.entryId;
  }
  get formMeta() {
    return this.$$pageEntryWrapper.formMeta;
  }
  get queryData() {
    if (isNil(this.entryId)) return;
    return this.$$modelResource.view(this.entryId);
  }
  async onSubmit(data) {
    const mutationSubmit = this.$$modelResource.getFormMutationSubmit(this.formMeta, this.entryId);
    await mutationSubmit?.mutateAsync(data.value);
  }
}, _ControllerRestPageEntry.$propsDefault = {
  toolbarPosition: "bottom"
}, _ControllerRestPageEntry), _descriptor$1 = _applyDecoratedDescriptor$1(_class2$1.prototype, "$$pageEntryWrapper", [_dec3$1, _dec4$1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor$1(_class2$1.prototype, "$$modelResource", [_dec5, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2$1)) || _class$5) || _class$5);
var _dec$4, _dec2$4, _dec3, _dec4, _class$4, _class2, _descriptor, _ControllerWrapperFilter;
function _initializerDefineProperty(e, i, r, l) {
  r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 });
}
function _applyDecoratedDescriptor(i, e, r, n, l) {
  var a = {};
  return Object.keys(n).forEach(function(i2) {
    a[i2] = n[i2];
  }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = true), a = r.slice().reverse().reduce(function(r2, n2) {
    return n2(i, e, r2) || r2;
  }, a), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a;
}
let ControllerWrapperFilter = (_dec$4 = Controller(), _dec2$4 = BeanInfo({
  module: "basic-restpage"
}), _dec3 = Use({
  injectionScope: "host"
}), _dec4 = Reflect.metadata("design:type", typeof ModelResource === "undefined" ? Object : ModelResource), _dec$4(_class$4 = _dec2$4(_class$4 = (_class2 = (_ControllerWrapperFilter = class ControllerWrapperFilter2 extends BeanControllerBase {
  constructor(...args) {
    super(...args);
    this.formMeta = void 0;
    this.formFieldLayout = void 0;
    _initializerDefineProperty(this, "$$modelResource", _descriptor, this);
  }
  async __init__() {
    this.formMeta = {
      formMode: "edit"
    };
    this.formFieldLayout = {
      inline: true
    };
  }
  get schema() {
    return this.$$modelResource.schemaFilter;
  }
  onSubmit(data) {
    this._onFilter(data.value);
  }
  onReset(data) {
    this._onFilter(data);
  }
  _onFilter(dataOld) {
    const dataNew = {};
    for (const key in dataOld) {
      const value = dataOld[key];
      if (!isNilOrEmptyString(value)) {
        dataNew[key] = value;
      }
    }
    this.$props.onFilter?.(dataNew);
  }
}, _ControllerWrapperFilter.$propsDefault = {}, _ControllerWrapperFilter), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "$$modelResource", [_dec3, _dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2)) || _class$4) || _class$4);
var _dec$3, _dec2$3, _class$3;
let RenderWrapperFilter = (_dec$3 = Render(), _dec2$3 = BeanInfo({
  module: "basic-restpage"
}), _dec$3(_class$3 = _dec2$3(_class$3 = class RenderWrapperFilter2 extends BeanRenderBase {
  render() {
    const ComponentForm = this.$zovaComponent(this.$$modelResource.componentForm);
    return createVNode(ComponentForm, {
      "inline": true,
      "data": this.$props.formData,
      "schema": this.schema,
      "schemaScene": "filter",
      "formMeta": this.formMeta,
      "formFieldLayout": this.formFieldLayout,
      "formProvider": this.$props.formProvider,
      "onSubmitData": (data) => this.onSubmit(data),
      "slotFooter": ($$form) => {
        return createVNode(Fragment, null, [createVNode("button", {
          "class": "btn btn-primary",
          "onClick": () => {
            $$form.submit();
          }
        }, [this.scope.locale.Search()]), createVNode("button", {
          "class": "btn",
          "onClick": () => {
            const data = $$form.reset();
            this.onReset(data);
          }
        }, [this.scope.locale.Reset()])]);
      }
    }, null);
  }
}) || _class$3) || _class$3);
const ZWrapperFilter = defineComponent((_props) => {
  useController(ControllerWrapperFilter, RenderWrapperFilter, void 0);
  return () => {
  };
}, prepareComponentOptions());
var _dec$2, _dec2$2, _class$2;
let RenderRestPage = (_dec$2 = Render(), _dec2$2 = BeanInfo({
  module: "basic-restpage"
}), _dec$2(_class$2 = _dec2$2(_class$2 = class RenderRestPage2 extends BeanRenderBase {
  _renderFilter() {
    if (!this.$props.showFilter) return;
    return createVNode(ZWrapperFilter, {
      "formData": this.queryFilterData,
      "onFilter": (data) => {
        this.onFilter(data);
      }
    }, null);
  }
  _renderOperationsTable() {
    const render = this.tableProvider.components.actionOperationsTable;
    const celScope = this.pageScope;
    const jsxRenderContext = this.getJsxRenderContextPage(celScope);
    const domRestPageEntry = this.zovaJsx.render(render, {}, celScope, jsxRenderContext);
    return domRestPageEntry;
  }
  _renderTable() {
    const ComponentTable = this.$zovaComponent(this.$$modelResource.componentTable);
    return createVNode(ComponentTable, {
      "data": this.data,
      "schema": this.schema,
      "tableProvider": this.tableProvider,
      "tableScope": this.pageScope,
      "getColumns": (next, $$table) => {
        return this.getColumns(next, $$table);
      }
    }, null);
  }
  _renderPages() {
    if (!this.paged) return;
    return createVNode("div", {
      "class": "join"
    }, [createVNode("button", {
      "class": "join-item btn btn-disabled"
    }, [`${this.scope.locale.PagedTotalItems()}: ${this.paged.total}`]), createVNode("button", {
      "class": "join-item btn btn-disabled"
    }, [`${this.scope.locale.PagedTotalPages()}: ${this.paged.pageCount}`]), this.paged.pageNo > 1 && createVNode("button", {
      "class": "join-item btn",
      "onClick": () => {
        this.gotoPage(this.paged.pageNo - 1);
      }
    }, [createTextVNode("«")]), this.paged.pageCount > 0 && createVNode("button", {
      "class": "join-item btn"
    }, [this.paged.pageNo]), this.paged.pageNo < this.paged.pageCount && createVNode("button", {
      "class": "join-item btn",
      "onClick": () => {
        this.gotoPage(this.paged.pageNo + 1);
      }
    }, [createTextVNode("»")])]);
  }
  render() {
    return createVNode("div", null, [this._renderFilter(), this._renderOperationsTable(), this._renderTable(), this._renderPages()]);
  }
}) || _class$2) || _class$2);
const ZRestPage = defineComponent((_props) => {
  useController(ControllerRestPage, RenderRestPage, void 0);
  return () => {
  };
}, prepareComponentOptions());
var _dec$1, _dec2$1, _class$1;
let RenderRestPageEntry = (_dec$1 = Render(), _dec2$1 = BeanInfo({
  module: "basic-restpage"
}), _dec$1(_class$1 = _dec2$1(_class$1 = class RenderRestPageEntry2 extends BeanRenderBase {
  _renderForm() {
    const ComponentForm = this.$zovaComponent(this.$$modelResource.componentForm);
    return createVNode(ComponentForm, {
      "controllerRef": (ref) => {
        this.controllerForm = ref;
      },
      "data": this.formData,
      "schema": this.formSchema,
      "formMeta": this.formMeta,
      "formProvider": this.formProvider,
      "formScope": this.pageEntryScope,
      "onSubmitData": (data) => this.onSubmit(data),
      "onShowError": ({
        error
      }) => {
        window.alert(error.message);
      }
    }, null);
  }
  _renderToolbar() {
    return createVNode("div", null, [this.controllerForm?.formState.isSubmitting && createVNode("span", {
      "class": "loading loading-spinner text-primary"
    }, null), this.formMeta.formMode === "edit" && createVNode("button", {
      "class": classes("btn btn-primary", this.controllerForm?.formState.isSubmitting && "btn-disabled"),
      "onClick": async () => {
        const res = await this.controllerForm.submit();
        if (res) {
          this.$router.back();
        }
      }
    }, [this.scope.locale.Submit()]), createVNode("button", {
      "class": classes("btn", this.controllerForm?.formState.isSubmitting && "btn-disabled"),
      "onClick": () => {
        this.$router.back();
      }
    }, [this.scope.locale.Back()])]);
  }
  render() {
    const toolbarPosition = this.$props.toolbarPosition;
    const domToolbar = this._renderToolbar();
    if (!this.formData) {
      return createVNode("div", null, [this.scope.locale.EntryNotExist()]);
    }
    return createVNode("div", null, [toolbarPosition === "top" && domToolbar, this._renderForm(), toolbarPosition === "bottom" && domToolbar]);
  }
}) || _class$1) || _class$1);
const ZRestPageEntry = defineComponent((_props) => {
  useController(ControllerRestPageEntry, RenderRestPageEntry, void 0);
  return () => {
  };
}, prepareComponentOptions());
var _dec, _dec2, _class;
const components = {
  "restPage": ZRestPage,
  "restPageEntry": ZRestPageEntry,
  "wrapperFilter": ZWrapperFilter
};
let ScopeModuleBasicRestpage = (_dec = Scope(), _dec2 = BeanInfo({
  module: "basic-restpage"
}), _dec(_class = _dec2(_class = class ScopeModuleBasicRestpage2 extends BeanScopeBase {
}) || _class) || _class);
function locale(key) {
  return `basic-restpage::${key}`;
}
const locale_en_us = {
  Back: "Back",
  Close: "Close",
  Create: "Create",
  Submit: "Submit",
  Search: "Search",
  Reset: "Reset",
  TableActions: "Actions",
  PagedTotalItems: "Total",
  PagedTotalPages: "Pages",
  EntryNotExist: "The entry does not exist"
};
const locale_zh_cn = {
  Back: "回退",
  Close: "关闭",
  Create: "创建",
  Submit: "提交",
  Search: "搜索",
  Reset: "重置",
  TableActions: "操作",
  PagedTotalItems: "总条数",
  PagedTotalPages: "总页数",
  EntryNotExist: "该条目不存在"
};
const locales = {
  "en-us": locale_en_us,
  "zh-cn": locale_zh_cn
};
function $useLocale(key, ...args) {
  const app = useApp();
  const str = `basic-restpage::${key}`;
  return useComputed(() => {
    return app.meta.text(str, ...args);
  });
}
export {
  $useLocale,
  ControllerRestPage,
  ControllerRestPageEntry,
  ControllerWrapperFilter,
  RenderRestPage,
  RenderRestPageEntry,
  RenderWrapperFilter,
  ScopeModuleBasicRestpage,
  ZRestPage,
  ZRestPageEntry,
  ZWrapperFilter,
  components,
  locale,
  locales
};
