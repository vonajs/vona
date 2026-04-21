import { n as __esmMin } from "./rolldown-runtime-CSj9S6Td.js";
import { _ as isVNode, l as createVNode } from "./vue-Cbj8Orto.js";
import { n as init_vue_runtime_esm_bundler } from "./vue-CnyVupzE.js";
import { C as init_zod, D as string, E as object, F as celEnvBase, J as init_dist, Z as isNil, q as hashkey } from "./zova-DqTMfDEW.js";
import { d as _objectSpread2, f as init_objectSpread2, m as init_asyncToGenerator, p as _asyncToGenerator } from "./fecha-DgbeIgox.js";
import { C as UseScope, S as Virtual, T as usePrepareArg, c as createZovaComponentPage, h as BeanScopeBase, k as BeanInfo, m as createZovaComponentAsync, n as useCustomRef, t as init_src$1, v as BeanControllerPageBase, w as Use, z as deepExtend } from "./zova-DlmeBQBK.js";
import { t as init_src$2 } from "./zova-B7GgTsx0.js";
import { h as Controller, o as Scope, t as init_src$3 } from "./a-bean-BnjLZzu4.js";
import { n as ZovaJsx, t as init_src$4 } from "./zova-59AmBDzk.js";
import { i as Model, l as BeanModelBase, r as $QueryAutoLoad, t as init_src$5 } from "./a-model-Aj0LQ34C.js";
import { t as init_src$6 } from "./a-openapi-B7MhZ_Zt.js";
import { n as formMetaFromFormScene, r as formSceneFromFormMeta, t as init_src$7 } from "./a-form-B3mWhtj_.js";
//#region src/suite-vendor/a-cabloy/modules/rest-resource/src/model/resource.ts
function _initializerDefineProperty(e, i, r, l) {
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
var _dec$4, _dec2$4, _dec3$3, _dec4$2, _class$4, _class2$2, _descriptor, ModelResource;
var init_resource$2 = __esmMin((() => {
	init_asyncToGenerator();
	init_src$2();
	init_dist();
	init_src$7();
	init_src$5();
	init_src$6();
	ModelResource = (_dec$4 = Model({ enableSelector: true }), _dec2$4 = BeanInfo({ module: "rest-resource" }), _dec3$3 = UseScope("a-openapi"), _dec4$2 = Reflect.metadata("design:type", typeof ScopeModuleAOpenapi === "undefined" ? Object : ScopeModuleAOpenapi), _dec$4(_class$4 = _dec2$4(_class$4 = (_class2$2 = class ModelResource extends BeanModelBase {
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
		__init__(resource) {
			var _superprop_get__init__ = () => super.__init__, _this = this;
			return _asyncToGenerator(function* () {
				if (!resource) throw new Error("resource not specified");
				yield _superprop_get__init__().call(_this, resource);
				_this.resource = resource;
				_this.resourceMeta = _this.$useComputed(() => {
					var _resourceMeta$data;
					const resourceMeta = _this.$sdk.getBootstrap(_this.resource);
					return deepExtend({}, _this.$$scopeModuleAOpenapi.config.resourceMeta, (_resourceMeta$data = resourceMeta.data) === null || _resourceMeta$data === void 0 ? void 0 : _resourceMeta$data.resourceMeta);
				});
				_this.permissions = _this.$useComputed(() => {
					return _this.$sdk.getPermissions(_this.resource).data;
				});
				_this.formProvider = _this.$useComputed(() => {
					var _this$resourceMeta$fo;
					return deepExtend({}, _this.resourceMeta.provider, (_this$resourceMeta$fo = _this.resourceMeta.form) === null || _this$resourceMeta$fo === void 0 ? void 0 : _this$resourceMeta$fo.provider);
				});
				_this.tableProvider = _this.$useComputed(() => {
					var _this$resourceMeta$ta;
					return deepExtend({}, _this.resourceMeta.provider, (_this$resourceMeta$ta = _this.resourceMeta.table) === null || _this$resourceMeta$ta === void 0 ? void 0 : _this$resourceMeta$ta.provider);
				});
				_this.schemaView = _this.$useComputed(() => {
					return _this.apiSchemasView.responseBody;
				});
				_this.schemaCreate = _this.$useComputed(() => {
					return _this.apiSchemasCreate.requestBody;
				});
				_this.schemaUpdate = _this.$useComputed(() => {
					return _this.apiSchemasUpdate.requestBody;
				});
				_this.schemaFilter = _this.$useComputed(() => {
					return _this.apiSchemasSelect.filter;
				});
				_this.schemaRow = _this.$useComputed(() => {
					return _this.apiSchemasSelect.row;
				});
				_this.schemaPages = _this.$useComputed(() => {
					return _this.apiSchemasSelect.paged;
				});
				yield _this._bootstrap();
			})();
		}
		selectGeneral(actionPath, query) {
			var _this2 = this;
			const queryHash = hashkey(query);
			return this.$useStateData({
				queryKey: [
					"select",
					actionPath !== null && actionPath !== void 0 ? actionPath : "",
					queryHash
				],
				queryFn: function() {
					var _ref = _asyncToGenerator(function* () {
						const apiPath = actionPath ? `${_this2.resourceApi}/${actionPath}` : _this2.resourceApi;
						return _this2.$fetch.get(_this2.sys.util.apiActionPathTranslate(apiPath), _this2.sys.util.apiActionConfigPrepare(void 0, { query }));
					});
					return function queryFn() {
						return _ref.apply(this, arguments);
					};
				}()
			});
		}
		select(query) {
			return this.selectGeneral(void 0, query);
		}
		view(id) {
			var _this3 = this;
			if (isNil(id)) throw new Error("row id cannot empty");
			return this.$useStateData({
				queryKey: ["get", id],
				queryFn: function() {
					var _ref2 = _asyncToGenerator(function* () {
						const res = yield _this3.$fetch.get(_this3.sys.util.apiActionPathTranslate(`${_this3.resourceApi}/:id`, { id }), _this3.sys.util.apiActionConfigPrepare());
						return res !== null && res !== void 0 ? res : null;
					});
					return function queryFn() {
						return _ref2.apply(this, arguments);
					};
				}()
			});
		}
		create() {
			var _this4 = this;
			return this.$useMutationData({
				mutationKey: ["create"],
				mutationFn: function() {
					var _ref3 = _asyncToGenerator(function* (params) {
						return _this4.$fetch.post(_this4.sys.util.apiActionPathTranslate(_this4.resourceApi), params, _this4.sys.util.apiActionConfigPrepare());
					});
					return function mutationFn(_x) {
						return _ref3.apply(this, arguments);
					};
				}(),
				onSuccess: () => {
					this.$invalidateQueries({ queryKey: ["select"] });
				}
			});
		}
		update(id) {
			var _this5 = this;
			return this.$useMutationData({
				mutationKey: ["update", id],
				mutationFn: function() {
					var _ref4 = _asyncToGenerator(function* (params) {
						return _this5.$fetch.patch(_this5.sys.util.apiActionPathTranslate(`${_this5.resourceApi}/:id`, { id }), params, _this5.sys.util.apiActionConfigPrepare());
					});
					return function mutationFn(_x2) {
						return _ref4.apply(this, arguments);
					};
				}(),
				onSuccess: () => {
					this.$invalidateQueries({ queryKey: ["select"] });
					this.$invalidateQueries({ queryKey: ["get", id] });
				}
			});
		}
		delete(id) {
			var _this6 = this;
			return this.$useMutationData({
				mutationKey: ["delete", id],
				mutationFn: function() {
					var _ref5 = _asyncToGenerator(function* () {
						return _this6.$fetch.delete(_this6.sys.util.apiActionPathTranslate(`${_this6.resourceApi}/:id`, { id }), _this6.sys.util.apiActionConfigPrepare());
					});
					return function mutationFn() {
						return _ref5.apply(this, arguments);
					};
				}(),
				onSuccess: () => {
					this.$invalidateQueries({ queryKey: ["select"] });
					this.$invalidateQueries({ queryKey: ["get", id] });
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
			var _formMeta$formScene;
			const formScene = (_formMeta$formScene = formMeta.formScene) !== null && _formMeta$formScene !== void 0 ? _formMeta$formScene : formSceneFromFormMeta(formMeta);
			if (formScene === "view") return this.schemaView;
			if (formScene === "create") return this.schemaCreate;
			if (formScene === "edit") return this.schemaUpdate;
		}
		getFormApiSchemas(formMeta) {
			var _formMeta$formScene2;
			const formScene = (_formMeta$formScene2 = formMeta.formScene) !== null && _formMeta$formScene2 !== void 0 ? _formMeta$formScene2 : formSceneFromFormMeta(formMeta);
			if (formScene === "view") return this.apiSchemasView;
			if (formScene === "create") return this.apiSchemasCreate;
			if (formScene === "edit") return this.apiSchemasUpdate;
			throw new Error("invalid parameters");
		}
		getFormMutationSubmit(formMeta, id) {
			if (formMeta.formMode !== "edit") return;
			if (formMeta.editMode === "create") return this.create();
			else if (formMeta.editMode === "update") return this.update(id);
		}
		getFormData(formMeta, id) {
			if (formMeta.formMode === "edit" && formMeta.editMode === "create") return this.getQueryDataDefaultValue(this.schemaCreate);
			if (isNil(id)) return void 0;
			return this.view(id).data;
		}
		getQueryDataDefaultValue(schemaName) {
			if (!schemaName) return;
			if (typeof schemaName === "object") schemaName = schemaName["__schemaName__"];
			return this.$sdk.getSchemaDefaultValue(schemaName);
		}
		_bootstrap() {
			var _this7 = this;
			return _asyncToGenerator(function* () {
				const queryBootstrap = yield $QueryAutoLoad(() => _this7.$sdk.getBootstrap(_this7.resource));
				if (!(queryBootstrap === null || queryBootstrap === void 0 ? void 0 : queryBootstrap.data)) throw new Error(`not found sdk of resource: ${_this7.resource}`);
				_this7.resourceApi = _this7.sys.util.parseResourceApi(_this7.resource, queryBootstrap.data.apiPath);
			})();
		}
	}, _descriptor = _applyDecoratedDescriptor$2(_class2$2.prototype, "$$scopeModuleAOpenapi", [_dec3$3, _dec4$2], {
		configurable: true,
		enumerable: true,
		writable: true,
		initializer: null
	}), _class2$2)) || _class$4) || _class$4);
}));
//#endregion
//#region src/suite-vendor/a-cabloy/modules/rest-resource/src/page/entry/controller.tsx
function _applyDecoratedDescriptor$1(i, e, r, n, l) {
	var a = {};
	return Object.keys(n).forEach(function(i) {
		a[i] = n[i];
	}), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function(r, n) {
		return n(i, e, r) || r;
	}, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a;
}
function _isSlot$1(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
var _dec$3, _dec2$3, _dec3$2, _dec4$1, _dec5$1, _class$3, _class2$1, ZPage$1, ControllerPageEntrySchemaParams, ControllerPageEntry;
var init_controller$2 = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_objectSpread2();
	init_asyncToGenerator();
	init_src$2();
	init_dist();
	init_zod();
	init_src$4();
	init_src$3();
	init_src$7();
	ZPage$1 = createZovaComponentAsync("home-base", "page");
	ControllerPageEntrySchemaParams = object({
		resource: string(),
		id: string().optional(),
		formScene: string().optional()
	});
	ControllerPageEntry = (_dec$3 = Controller(), _dec2$3 = BeanInfo({ module: "rest-resource" }), _dec3$2 = Use({ beanFullName: "rest-resource.model.resource" }), _dec4$1 = Reflect.metadata("design:type", Function), _dec5$1 = Reflect.metadata("design:paramtypes", []), _dec$3(_class$3 = _dec2$3(_class$3 = (_class2$1 = class ControllerPageEntry extends BeanControllerPageBase {
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
			var _this$$params$formSce;
			return (_this$$params$formSce = this.$params.formScene) !== null && _this$$params$formSce !== void 0 ? _this$$params$formSce : isNil(this.entryId) ? "create" : "view";
		}
		__init__() {
			var _this = this;
			return _asyncToGenerator(function* () {
				_this.bean._setBean("$$pageEntryWrapper", _this);
				_this.formMeta = _this.$useComputed(() => {
					const formScene = _this.formScene;
					return _objectSpread2(_objectSpread2({}, formMetaFromFormScene(formScene)), {}, { formScene });
				});
				_this.formProvider = _this.$useComputed(() => {
					return _this.$$modelResource.formProvider;
				});
				_this.pageEntryWrapperScope = _this._getPageEntryWrapperScope();
				_this.pageEntryWrapperCelEnv = _this._getPageEntryWrapperCelEnv();
				_this.zovaJsx = _this.app.bean._newBeanSimple(ZovaJsx, false, _this.formProvider.components, _this.formProvider.actions, _this.pageEntryWrapperCelEnv);
			})();
		}
		onActionTable(_action) {
			return _asyncToGenerator(function* () {})();
		}
		onActionRow(action) {
			var _this2 = this;
			return _asyncToGenerator(function* () {
				if (!_this2.entryId) return;
				if (action === "delete") yield _this2.$$modelResource.delete(_this2.entryId).mutateAsync();
			})();
		}
		_getPageEntryWrapperScope() {
			const self = this;
			const permissions = useCustomRef(() => {
				return {
					get() {
						return self.$$modelResource.permissions;
					},
					set(_value) {}
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
			return celEnvBase.clone();
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
			return createVNode(ZPage$1, null, _isSlot$1(domRestPageEntry) ? domRestPageEntry : { default: () => [domRestPageEntry] });
		}
	}, _applyDecoratedDescriptor$1(_class2$1.prototype, "$$modelResource", [
		_dec3$2,
		_dec4$1,
		_dec5$1
	], Object.getOwnPropertyDescriptor(_class2$1.prototype, "$$modelResource"), _class2$1.prototype), _class2$1)) || _class$3) || _class$3);
}));
//#endregion
//#region src/suite-vendor/a-cabloy/modules/rest-resource/src/page/entryCreate/controller.tsx
var _dec$2, _dec2$2, _dec3$1, _class$2, ControllerPageEntryCreateSchemaParams, ControllerPageEntryCreate;
var init_controller$1 = __esmMin((() => {
	init_src$2();
	init_src$1();
	init_src$3();
	init_controller$2();
	ControllerPageEntryCreateSchemaParams = ControllerPageEntrySchemaParams;
	ControllerPageEntryCreate = (_dec$2 = Controller(), _dec2$2 = Virtual(), _dec3$1 = BeanInfo({ module: "rest-resource" }), _dec$2(_class$2 = _dec2$2(_class$2 = _dec3$1(_class$2 = class ControllerPageEntryCreate extends ControllerPageEntry {}) || _class$2) || _class$2) || _class$2);
}));
//#endregion
//#region src/suite-vendor/a-cabloy/modules/rest-resource/src/page/resource/controller.tsx
function _applyDecoratedDescriptor(i, e, r, n, l) {
	var a = {};
	return Object.keys(n).forEach(function(i) {
		a[i] = n[i];
	}), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function(r, n) {
		return n(i, e, r) || r;
	}, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a;
}
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
var _dec$1, _dec2$1, _dec3, _dec4, _dec5, _class$1, _class2, ZPage, ControllerPageResourceSchemaParams, ControllerPageResource;
var init_controller = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_asyncToGenerator();
	init_src$2();
	init_dist();
	init_zod();
	init_src$4();
	init_src$3();
	ZPage = createZovaComponentAsync("home-base", "page");
	ControllerPageResourceSchemaParams = object({ resource: string() });
	ControllerPageResource = (_dec$1 = Controller(), _dec2$1 = BeanInfo({ module: "rest-resource" }), _dec3 = Use({ beanFullName: "rest-resource.model.resource" }), _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", []), _dec$1(_class$1 = _dec2$1(_class$1 = (_class2 = class ControllerPageResource extends BeanControllerPageBase {
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
		__init__() {
			var _this = this;
			return _asyncToGenerator(function* () {
				_this.bean._setBean("$$pageWrapper", _this);
				_this.tableProvider = _this.$useComputed(() => {
					return _this.$$modelResource.tableProvider;
				});
				_this.pageWrapperScope = _this._getPageWrapperScope();
				_this.pageWrapperCelEnv = _this._getPageWrapperCelEnv();
				_this.zovaJsx = _this.app.bean._newBeanSimple(ZovaJsx, false, _this.tableProvider.components, _this.tableProvider.actions, _this.pageWrapperCelEnv);
			})();
		}
		get resource() {
			return this.$params.resource;
		}
		onActionTable(_action) {
			return _asyncToGenerator(function* () {})();
		}
		onActionRow(action, id) {
			var _this2 = this;
			return _asyncToGenerator(function* () {
				if (action === "delete") yield _this2.$$modelResource.delete(id).mutateAsync();
			})();
		}
		_getPageWrapperScope() {
			const self = this;
			const permissions = useCustomRef(() => {
				return {
					get() {
						return self.$$modelResource.permissions;
					},
					set(_value) {}
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
			return celEnvBase.clone();
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
			return createVNode(ZPage, null, _isSlot(domRestPage) ? domRestPage : { default: () => [domRestPage] });
		}
	}, _applyDecoratedDescriptor(_class2.prototype, "$$modelResource", [
		_dec3,
		_dec4,
		_dec5
	], Object.getOwnPropertyDescriptor(_class2.prototype, "$$modelResource"), _class2.prototype), _class2)) || _class$1) || _class$1);
}));
//#endregion
//#region src/suite-vendor/a-cabloy/modules/rest-resource/src/.metadata/page/entry.ts
var NSControllerPageEntry, ZPageEntry;
var init_entry = __esmMin((() => {
	init_src$2();
	init_controller$2();
	(function(_NSControllerPageEntry) {
		_NSControllerPageEntry.paramsSchema = ControllerPageEntrySchemaParams;
	})(NSControllerPageEntry || (NSControllerPageEntry = {}));
	ZPageEntry = createZovaComponentPage(ControllerPageEntry, void 0, void 0);
}));
//#endregion
//#region src/suite-vendor/a-cabloy/modules/rest-resource/src/.metadata/page/entryCreate.ts
var NSControllerPageEntryCreate, ZPageEntryCreate;
var init_entryCreate = __esmMin((() => {
	init_src$2();
	init_controller$1();
	(function(_NSControllerPageEntryCreate) {
		_NSControllerPageEntryCreate.paramsSchema = ControllerPageEntryCreateSchemaParams;
	})(NSControllerPageEntryCreate || (NSControllerPageEntryCreate = {}));
	ZPageEntryCreate = createZovaComponentPage(ControllerPageEntryCreate, void 0, void 0);
}));
//#endregion
//#region src/suite-vendor/a-cabloy/modules/rest-resource/src/.metadata/page/resource.ts
var NSControllerPageResource, ZPageResource;
var init_resource$1 = __esmMin((() => {
	init_src$2();
	init_controller();
	(function(_NSControllerPageResource) {
		_NSControllerPageResource.paramsSchema = ControllerPageResourceSchemaParams;
	})(NSControllerPageResource || (NSControllerPageResource = {}));
	ZPageResource = createZovaComponentPage(ControllerPageResource, void 0, void 0);
}));
//#endregion
//#region src/suite-vendor/a-cabloy/modules/rest-resource/src/routes.ts
function tabKey(route) {
	return `/rest/resource/${encodeURIComponent(route.params.resource)}`;
}
var routes;
var init_routes = __esmMin((() => {
	init_entry();
	init_entryCreate();
	init_resource$1();
	routes = [
		{
			name: "resource",
			path: ":resource",
			component: ZPageResource,
			meta: { tabKey }
		},
		{
			name: "entryCreate",
			path: ":resource/create",
			component: ZPageEntryCreate,
			meta: { tabKey }
		},
		{
			name: "entry",
			path: ":resource/:id/:formScene?",
			component: ZPageEntry,
			meta: { tabKey }
		}
	];
}));
//#endregion
//#region src/suite-vendor/a-cabloy/modules/rest-resource/src/.metadata/index.ts
/** pages: end */
/** scope: begin */
var _dec, _dec2, _class, pagePathSchemas, pageNameSchemas, ScopeModuleRestResource;
var init__metadata = __esmMin((() => {
	init_src$2();
	init_resource$2();
	init_src$5();
	init_controller$2();
	init_controller$1();
	init_controller();
	init_entry();
	init_entry();
	init_entryCreate();
	init_entryCreate();
	init_resource$1();
	init_resource$1();
	init_routes();
	init_src$3();
	pagePathSchemas = {};
	pageNameSchemas = {
		"rest-resource:entry": { params: NSControllerPageEntry.paramsSchema },
		"rest-resource:entryCreate": { params: NSControllerPageEntryCreate.paramsSchema },
		"rest-resource:resource": { params: NSControllerPageResource.paramsSchema }
	};
	ScopeModuleRestResource = (_dec = Scope(), _dec2 = BeanInfo({ module: "rest-resource" }), _dec(_class = _dec2(_class = class ScopeModuleRestResource extends BeanScopeBase {}) || _class) || _class);
}));
/** scope: end */
//#endregion
//#region src/suite-vendor/a-cabloy/modules/rest-resource/src/types/pageEntryWrapper.ts
var init_pageEntryWrapper = __esmMin((() => {}));
//#endregion
//#region src/suite-vendor/a-cabloy/modules/rest-resource/src/types/pageWrapper.ts
var init_pageWrapper = __esmMin((() => {}));
//#endregion
//#region src/suite-vendor/a-cabloy/modules/rest-resource/src/types/resource.ts
var init_resource = __esmMin((() => {}));
//#endregion
//#region src/suite-vendor/a-cabloy/modules/rest-resource/src/types/index.ts
var init_types = __esmMin((() => {
	init_pageEntryWrapper();
	init_pageWrapper();
	init_resource();
}));
//#endregion
//#region src/suite-vendor/a-cabloy/modules/rest-resource/src/index.ts
var init_src = __esmMin((() => {
	init__metadata();
	init_types();
}));
//#endregion
export { ControllerPageEntrySchemaParams as _, routes as a, NSControllerPageEntryCreate as c, ZPageEntry as d, ControllerPageResource as f, ControllerPageEntry as g, ControllerPageEntryCreateSchemaParams as h, pagePathSchemas as i, ZPageEntryCreate as l, ControllerPageEntryCreate as m, ScopeModuleRestResource as n, NSControllerPageResource as o, ControllerPageResourceSchemaParams as p, pageNameSchemas as r, ZPageResource as s, init_src as t, NSControllerPageEntry as u, ModelResource as v };
