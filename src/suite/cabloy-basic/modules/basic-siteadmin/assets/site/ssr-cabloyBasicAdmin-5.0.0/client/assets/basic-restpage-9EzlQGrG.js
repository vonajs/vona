import { n as __esmMin } from "./rolldown-runtime-CSj9S6Td.js";
import { c as createTextVNode, d as defineComponent, l as createVNode, r as Fragment } from "./vue-Cbj8Orto.js";
import { n as init_vue_runtime_esm_bundler } from "./vue-CnyVupzE.js";
import { J as init_dist, Q as isNilOrEmptyString, Z as isNil } from "./zova-DqTMfDEW.js";
import { m as init_asyncToGenerator, p as _asyncToGenerator } from "./fecha-DgbeIgox.js";
import { K as useComputed, _ as BeanRenderBase, b as BeanControllerBase, h as BeanScopeBase, k as BeanInfo, l as prepareComponentOptions, s as useApp, u as useController, w as Use } from "./zova-DlmeBQBK.js";
import { t as init_src$1 } from "./zova-B7GgTsx0.js";
import { _ as Render, h as Controller, o as Scope, t as init_src$2 } from "./a-bean-BnjLZzu4.js";
import { i as init_lib_es2015, o as classes } from "./typestyle-DvkYjGD4.js";
import { n as $QueriesAutoLoad, t as init_src$3 } from "./a-model-Aj0LQ34C.js";
import { t as init_src$4 } from "./a-form-B3mWhtj_.js";
import { i as init_lib, t as createColumnHelper } from "./tanstack-table-CJVHZTZs.js";
import { d as BeanControllerTableBase, t as init_src$5 } from "./a-table-Dz7ksKZd.js";
//#region src/suite/cabloy-basic/modules/basic-restpage/src/component/restPage/controller.tsx
function _initializerDefineProperty$2(e, i, r, l) {
	r && Object.defineProperty(e, i, {
		enumerable: r.enumerable,
		configurable: r.configurable,
		writable: r.writable,
		value: r.initializer ? r.initializer.call(l) : void 0
	});
}
function _applyDecoratedDescriptor$2(i, e, r, n, l) {
	var a = {};
	return Object.keys(n).forEach(function(i) {
		a[i] = n[i];
	}), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function(r, n) {
		return n(i, e, r) || r;
	}, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a;
}
var _dec$6, _dec2$6, _dec3$2, _dec4$2, _dec5$1, _dec6$1, _class$6, _class2$2, _descriptor$2, _descriptor2$1, _ControllerRestPage, ControllerRestPage;
var init_controller$2 = __esmMin((() => {
	init_asyncToGenerator();
	init_src$1();
	init_lib();
	init_src$2();
	init_src$3();
	init_src$5();
	ControllerRestPage = (_dec$6 = Controller(), _dec2$6 = BeanInfo({ module: "basic-restpage" }), _dec3$2 = Use({ injectionScope: "host" }), _dec4$2 = Reflect.metadata("design:type", typeof ControllerPageResource === "undefined" ? Object : ControllerPageResource), _dec5$1 = Use({ injectionScope: "host" }), _dec6$1 = Reflect.metadata("design:type", typeof ModelResource === "undefined" ? Object : ModelResource), _dec$6(_class$6 = _dec2$6(_class$6 = (_class2$2 = (_ControllerRestPage = class ControllerRestPage extends BeanControllerTableBase {
		constructor(...args) {
			super(...args);
			this.queryFilterData = void 0;
			this.queryPaged = void 0;
			this.query = void 0;
			_initializerDefineProperty$2(this, "$$pageWrapper", _descriptor$2, this);
			_initializerDefineProperty$2(this, "$$modelResource", _descriptor2$1, this);
		}
		__init__() {
			var _this = this;
			return _asyncToGenerator(function* () {
				_this.bean._setBean("$$page", _this);
				_this.queryFilterData = {};
				_this.queryPaged = { pageNo: 1 };
				_this.query = _this.$useComputed(() => {
					return Object.assign({}, _this.queryFilterData, _this.queryPaged);
				});
				yield $QueriesAutoLoad(() => _this.$$modelResource.apiSchemasSelect.sdk, () => _this.queryData);
			})();
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
			var _this$queryData$data;
			return (_this$queryData$data = this.queryData.data) === null || _this$queryData$data === void 0 ? void 0 : _this$queryData$data.list;
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
		getColumns(next, $$table) {
			var _this2 = this;
			return _asyncToGenerator(function* () {
				const columns = yield next();
				const permissionUpdate = _this2.$passport.checkPermission(_this2.permissions, "update");
				const permissionDelete = _this2.$passport.checkPermission(_this2.permissions, "delete");
				if (!permissionUpdate && !permissionDelete) return columns;
				const columnHelper = createColumnHelper();
				const columnRender = yield $$table.createColumnRender("actions", "actionOperationsRow");
				columns.push(columnHelper.display({
					id: "actions",
					header: () => _this2.scope.locale.TableActions(),
					cell: columnRender
				}));
				return columns;
			})();
		}
		gotoPage(pageNo) {
			if (this.queryPaged.pageNo !== pageNo) this.queryPaged.pageNo = pageNo;
		}
		onFilter(data) {
			this.queryFilterData = data;
		}
	}, _ControllerRestPage.$propsDefault = { showFilter: true }, _ControllerRestPage), _descriptor$2 = _applyDecoratedDescriptor$2(_class2$2.prototype, "$$pageWrapper", [_dec3$2, _dec4$2], {
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
}));
//#endregion
//#region src/suite/cabloy-basic/modules/basic-restpage/src/component/restPageEntry/controller.tsx
function _initializerDefineProperty$1(e, i, r, l) {
	r && Object.defineProperty(e, i, {
		enumerable: r.enumerable,
		configurable: r.configurable,
		writable: r.writable,
		value: r.initializer ? r.initializer.call(l) : void 0
	});
}
function _applyDecoratedDescriptor$1(i, e, r, n, l) {
	var a = {};
	return Object.keys(n).forEach(function(i) {
		a[i] = n[i];
	}), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function(r, n) {
		return n(i, e, r) || r;
	}, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a;
}
var _dec$5, _dec2$5, _dec3$1, _dec4$1, _dec5, _dec6, _class$5, _class2$1, _descriptor$1, _descriptor2, _ControllerRestPageEntry, ControllerRestPageEntry;
var init_controller$1 = __esmMin((() => {
	init_asyncToGenerator();
	init_src$1();
	init_dist();
	init_src$2();
	init_src$3();
	ControllerRestPageEntry = (_dec$5 = Controller(), _dec2$5 = BeanInfo({ module: "basic-restpage" }), _dec3$1 = Use({ injectionScope: "host" }), _dec4$1 = Reflect.metadata("design:type", typeof ControllerPageEntry === "undefined" ? Object : ControllerPageEntry), _dec5 = Use({ injectionScope: "host" }), _dec6 = Reflect.metadata("design:type", typeof ModelResource === "undefined" ? Object : ModelResource), _dec$5(_class$5 = _dec2$5(_class$5 = (_class2$1 = (_ControllerRestPageEntry = class ControllerRestPageEntry extends BeanControllerBase {
		constructor(...args) {
			super(...args);
			this.controllerForm = void 0;
			this.formSchema = void 0;
			this.formData = void 0;
			_initializerDefineProperty$1(this, "$$pageEntryWrapper", _descriptor$1, this);
			_initializerDefineProperty$1(this, "$$modelResource", _descriptor2, this);
		}
		__init__() {
			var _this = this;
			return _asyncToGenerator(function* () {
				_this.bean._setBean("$$pageEntry", _this);
				_this.formSchema = _this.$useComputed(() => {
					return _this.$$modelResource.getFormSchema(_this.formMeta);
				});
				_this.formData = _this.$useComputed(() => {
					return _this.$$modelResource.getFormData(_this.formMeta, _this.entryId);
				});
				yield $QueriesAutoLoad(() => {
					var _this$$$modelResource;
					return (_this$$$modelResource = _this.$$modelResource.getFormApiSchemas(_this.formMeta)) === null || _this$$$modelResource === void 0 ? void 0 : _this$$$modelResource.sdk;
				}, () => _this.queryData);
				_this.setPageMeta(_this.formData, false);
			})();
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
		onSubmit(data) {
			var _this2 = this;
			return _asyncToGenerator(function* () {
				const mutationSubmit = _this2.$$modelResource.getFormMutationSubmit(_this2.formMeta, _this2.entryId);
				yield mutationSubmit === null || mutationSubmit === void 0 ? void 0 : mutationSubmit.mutateAsync(data.value);
				_this2.setPageMeta(data.value, false);
			})();
		}
		setPageMeta(data, pageDirty) {
			if (!this.$pageRoute) return;
			const pageTitle = data === null || data === void 0 ? void 0 : data.name;
			this.$router.setPageMeta(this.$pageRoute, {
				pageTitle,
				pageDirty
			});
		}
	}, _ControllerRestPageEntry.$propsDefault = { toolbarPosition: "bottom" }, _ControllerRestPageEntry), _descriptor$1 = _applyDecoratedDescriptor$1(_class2$1.prototype, "$$pageEntryWrapper", [_dec3$1, _dec4$1], {
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
}));
//#endregion
//#region src/suite/cabloy-basic/modules/basic-restpage/src/component/wrapperFilter/controller.tsx
function _initializerDefineProperty(e, i, r, l) {
	r && Object.defineProperty(e, i, {
		enumerable: r.enumerable,
		configurable: r.configurable,
		writable: r.writable,
		value: r.initializer ? r.initializer.call(l) : void 0
	});
}
function _applyDecoratedDescriptor(i, e, r, n, l) {
	var a = {};
	return Object.keys(n).forEach(function(i) {
		a[i] = n[i];
	}), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function(r, n) {
		return n(i, e, r) || r;
	}, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a;
}
var _dec$4, _dec2$4, _dec3, _dec4, _class$4, _class2, _descriptor, _ControllerWrapperFilter, ControllerWrapperFilter;
var init_controller = __esmMin((() => {
	init_asyncToGenerator();
	init_src$1();
	init_dist();
	init_src$2();
	ControllerWrapperFilter = (_dec$4 = Controller(), _dec2$4 = BeanInfo({ module: "basic-restpage" }), _dec3 = Use({ injectionScope: "host" }), _dec4 = Reflect.metadata("design:type", typeof ModelResource === "undefined" ? Object : ModelResource), _dec$4(_class$4 = _dec2$4(_class$4 = (_class2 = (_ControllerWrapperFilter = class ControllerWrapperFilter extends BeanControllerBase {
		constructor(...args) {
			super(...args);
			this.formMeta = void 0;
			this.formFieldLayout = void 0;
			_initializerDefineProperty(this, "$$modelResource", _descriptor, this);
		}
		__init__() {
			var _this = this;
			return _asyncToGenerator(function* () {
				_this.formMeta = { formMode: "edit" };
				_this.formFieldLayout = { inline: true };
			})();
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
			var _this$$props$onFilter, _this$$props;
			const dataNew = {};
			for (const key in dataOld) {
				const value = dataOld[key];
				if (!isNilOrEmptyString(value)) dataNew[key] = value;
			}
			(_this$$props$onFilter = (_this$$props = this.$props).onFilter) === null || _this$$props$onFilter === void 0 || _this$$props$onFilter.call(_this$$props, dataNew);
		}
	}, _ControllerWrapperFilter.$propsDefault = {}, _ControllerWrapperFilter), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "$$modelResource", [_dec3, _dec4], {
		configurable: true,
		enumerable: true,
		writable: true,
		initializer: null
	}), _class2)) || _class$4) || _class$4);
}));
//#endregion
//#region src/suite/cabloy-basic/modules/basic-restpage/src/component/wrapperFilter/render.tsx
var _dec$3, _dec2$3, _class$3, RenderWrapperFilter;
var init_render$2 = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_src$1();
	init_src$2();
	RenderWrapperFilter = (_dec$3 = Render(), _dec2$3 = BeanInfo({ module: "basic-restpage" }), _dec$3(_class$3 = _dec2$3(_class$3 = class RenderWrapperFilter extends BeanRenderBase {
		render() {
			return createVNode(this.$zovaComponent(this.$$modelResource.componentForm), {
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
}));
//#endregion
//#region src/suite/cabloy-basic/modules/basic-restpage/src/.metadata/component/wrapperFilter.ts
var ZWrapperFilter;
var init_wrapperFilter = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_src$1();
	init_controller();
	init_render$2();
	ZWrapperFilter = defineComponent((_props) => {
		useController(ControllerWrapperFilter, RenderWrapperFilter, void 0);
		return () => {};
	}, prepareComponentOptions());
}));
//#endregion
//#region src/suite/cabloy-basic/modules/basic-restpage/src/component/restPage/render.tsx
var _dec$2, _dec2$2, _class$2, RenderRestPage;
var init_render$1 = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_src$1();
	init_src$2();
	init_wrapperFilter();
	RenderRestPage = (_dec$2 = Render(), _dec2$2 = BeanInfo({ module: "basic-restpage" }), _dec$2(_class$2 = _dec2$2(_class$2 = class RenderRestPage extends BeanRenderBase {
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
			return this.zovaJsx.render(render, {}, celScope, jsxRenderContext);
		}
		_renderTable() {
			return createVNode(this.$zovaComponent(this.$$modelResource.componentTable), {
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
			return createVNode("div", { "class": "join" }, [
				createVNode("button", { "class": "join-item btn btn-disabled" }, [`${this.scope.locale.PagedTotalItems()}: ${this.paged.total}`]),
				createVNode("button", { "class": "join-item btn btn-disabled" }, [`${this.scope.locale.PagedTotalPages()}: ${this.paged.pageCount}`]),
				this.paged.pageNo > 1 && createVNode("button", {
					"class": "join-item btn",
					"onClick": () => {
						this.gotoPage(this.paged.pageNo - 1);
					}
				}, [createTextVNode("«")]),
				this.paged.pageCount > 0 && createVNode("button", { "class": "join-item btn" }, [this.paged.pageNo]),
				this.paged.pageNo < this.paged.pageCount && createVNode("button", {
					"class": "join-item btn",
					"onClick": () => {
						this.gotoPage(this.paged.pageNo + 1);
					}
				}, [createTextVNode("»")])
			]);
		}
		render() {
			return createVNode("div", null, [
				this._renderFilter(),
				this._renderOperationsTable(),
				this._renderTable(),
				this._renderPages()
			]);
		}
	}) || _class$2) || _class$2);
}));
//#endregion
//#region src/suite/cabloy-basic/modules/basic-restpage/src/.metadata/component/restPage.ts
var ZRestPage;
var init_restPage = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_src$1();
	init_controller$2();
	init_render$1();
	ZRestPage = defineComponent((_props) => {
		useController(ControllerRestPage, RenderRestPage, void 0);
		return () => {};
	}, prepareComponentOptions());
}));
//#endregion
//#region src/suite/cabloy-basic/modules/basic-restpage/src/component/restPageEntry/render.tsx
var _dec$1, _dec2$1, _class$1, RenderRestPageEntry;
var init_render = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_asyncToGenerator();
	init_src$1();
	init_lib_es2015();
	init_src$2();
	RenderRestPageEntry = (_dec$1 = Render(), _dec2$1 = BeanInfo({ module: "basic-restpage" }), _dec$1(_class$1 = _dec2$1(_class$1 = class RenderRestPageEntry extends BeanRenderBase {
		_renderForm() {
			return createVNode(this.$zovaComponent(this.$$modelResource.componentForm), {
				"controllerRef": (ref) => {
					this.controllerForm = ref;
				},
				"data": this.formData,
				"schema": this.formSchema,
				"formMeta": this.formMeta,
				"formProvider": this.formProvider,
				"formScope": this.pageEntryScope,
				"onSubmitData": (data) => this.onSubmit(data),
				"onShowError": ({ error }) => {
					window.alert(error.message);
				},
				"onChanged": (data) => {
					this.setPageMeta(data, true);
				}
			}, null);
		}
		_renderToolbar() {
			var _this = this;
			var _this$controllerForm, _this$controllerForm2, _this$controllerForm3;
			return createVNode("div", null, [
				((_this$controllerForm = this.controllerForm) === null || _this$controllerForm === void 0 ? void 0 : _this$controllerForm.formState.isSubmitting) && createVNode("span", { "class": "loading loading-spinner text-primary" }, null),
				this.formMeta.formMode === "edit" && createVNode("button", {
					"class": classes("btn btn-primary", ((_this$controllerForm2 = this.controllerForm) === null || _this$controllerForm2 === void 0 ? void 0 : _this$controllerForm2.formState.isSubmitting) && "btn-disabled"),
					"onClick": function() {
						var _ref = _asyncToGenerator(function* () {
							if (yield _this.controllerForm.submit()) _this.$router.back();
						});
						return function onClick() {
							return _ref.apply(this, arguments);
						};
					}()
				}, [this.scope.locale.Submit()]),
				createVNode("button", {
					"class": classes("btn", ((_this$controllerForm3 = this.controllerForm) === null || _this$controllerForm3 === void 0 ? void 0 : _this$controllerForm3.formState.isSubmitting) && "btn-disabled"),
					"onClick": () => {
						this.$router.back();
					}
				}, [this.scope.locale.Back()])
			]);
		}
		render() {
			const toolbarPosition = this.$props.toolbarPosition;
			const domToolbar = this._renderToolbar();
			if (!this.formData) return createVNode("div", null, [this.scope.locale.EntryNotExist()]);
			return createVNode("div", null, [
				toolbarPosition === "top" && domToolbar,
				this._renderForm(),
				toolbarPosition === "bottom" && domToolbar
			]);
		}
	}) || _class$1) || _class$1);
}));
//#endregion
//#region src/suite/cabloy-basic/modules/basic-restpage/src/.metadata/component/restPageEntry.ts
var ZRestPageEntry;
var init_restPageEntry = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_src$1();
	init_controller$1();
	init_render();
	ZRestPageEntry = defineComponent((_props) => {
		useController(ControllerRestPageEntry, RenderRestPageEntry, void 0);
		return () => {};
	}, prepareComponentOptions());
}));
//#endregion
//#region src/suite/cabloy-basic/modules/basic-restpage/src/.metadata/index.ts
/** render: end */
/** locale: begin */
/** locale: end */
/** scope: begin */
function locale(key) {
	return `basic-restpage::${key}`;
}
var _dec, _dec2, _class, components, ScopeModuleBasicRestpage;
var init__metadata = __esmMin((() => {
	init_src$1();
	init_controller$2();
	init_controller$1();
	init_controller();
	init_restPage();
	init_restPage();
	init_restPageEntry();
	init_restPageEntry();
	init_wrapperFilter();
	init_wrapperFilter();
	init_render$1();
	init_render();
	init_render$2();
	init_src$2();
	components = {
		"restPage": ZRestPage,
		"restPageEntry": ZRestPageEntry,
		"wrapperFilter": ZWrapperFilter
	};
	ScopeModuleBasicRestpage = (_dec = Scope(), _dec2 = BeanInfo({ module: "basic-restpage" }), _dec(_class = _dec2(_class = class ScopeModuleBasicRestpage extends BeanScopeBase {}) || _class) || _class);
}));
/** scope: end */
//#endregion
//#region src/suite/cabloy-basic/modules/basic-restpage/src/config/locale/en-us.ts
var en_us_default;
var init_en_us = __esmMin((() => {
	en_us_default = {
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
}));
//#endregion
//#region src/suite/cabloy-basic/modules/basic-restpage/src/config/locale/zh-cn.ts
var zh_cn_default;
var init_zh_cn = __esmMin((() => {
	zh_cn_default = {
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
}));
//#endregion
//#region src/suite/cabloy-basic/modules/basic-restpage/src/.metadata/locales.ts
function $useLocale(key, ...args) {
	const app = useApp();
	const str = `basic-restpage::${key}`;
	return useComputed(() => {
		return app.meta.text(str, ...args);
	});
}
var locales;
var init_locales = __esmMin((() => {
	init_src$1();
	init_en_us();
	init_zh_cn();
	locales = {
		"en-us": en_us_default,
		"zh-cn": zh_cn_default
	};
}));
//#endregion
//#region src/suite/cabloy-basic/modules/basic-restpage/src/types/page.ts
var init_page = __esmMin((() => {
	init_src$5();
}));
//#endregion
//#region src/suite/cabloy-basic/modules/basic-restpage/src/types/pageEntry.ts
var init_pageEntry = __esmMin((() => {
	init_src$4();
}));
//#endregion
//#region src/suite/cabloy-basic/modules/basic-restpage/src/types/index.ts
var init_types = __esmMin((() => {
	init_page();
	init_pageEntry();
}));
//#endregion
//#region src/suite/cabloy-basic/modules/basic-restpage/src/index.ts
var init_src = __esmMin((() => {
	init__metadata();
	init_locales();
	init_types();
}));
//#endregion
export { components as a, RenderRestPageEntry as c, ZWrapperFilter as d, RenderWrapperFilter as f, ControllerRestPage as h, ScopeModuleBasicRestpage as i, ZRestPage as l, ControllerRestPageEntry as m, $useLocale as n, locale as o, ControllerWrapperFilter as p, locales as r, ZRestPageEntry as s, init_src as t, RenderRestPage as u };
