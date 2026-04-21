import { n as __esmMin } from "./rolldown-runtime-CSj9S6Td.js";
import { d as defineComponent, l as createVNode, v as mergeProps } from "./vue-Cbj8Orto.js";
import { n as init_vue_runtime_esm_bundler } from "./vue-CnyVupzE.js";
import { m as init_asyncToGenerator, p as _asyncToGenerator } from "./fecha-DgbeIgox.js";
import { K as useComputed, _ as BeanRenderBase, b as BeanControllerBase, h as BeanScopeBase, j as BeanBase, k as BeanInfo, l as prepareComponentOptions, m as createZovaComponentAsync, s as useApp, u as useController, w as Use } from "./zova-DlmeBQBK.js";
import { t as init_src$1 } from "./zova-B7GgTsx0.js";
import { _ as Render, h as Controller, o as Scope, t as init_src$2 } from "./a-bean-BnjLZzu4.js";
import { n as init_lib, t as FlexRender } from "./tanstack-table-CVT5dwVz.js";
import { n as TableCell, t as init_src$3 } from "./a-table-Dz7ksKZd.js";
//#region src/suite/cabloy-basic/modules/basic-table/src/component/actionOperationsTable/controller.tsx
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
var _dec$5, _dec2$5, _dec3, _dec4, _class$5, _class2, _descriptor, ControllerActionOperationsTable;
var init_controller$1 = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_asyncToGenerator();
	init_src$1();
	init_src$2();
	ControllerActionOperationsTable = (_dec$5 = Controller(), _dec2$5 = BeanInfo({ module: "basic-table" }), _dec3 = Use({ injectionScope: "host" }), _dec4 = Reflect.metadata("design:type", typeof IJsxRenderContextPage === "undefined" ? Object : IJsxRenderContextPage), _dec$5(_class$5 = _dec2$5(_class$5 = (_class2 = class ControllerActionOperationsTable extends BeanControllerBase {
		constructor(...args) {
			super(...args);
			_initializerDefineProperty(this, "$$renderContext", _descriptor, this);
		}
		__init__() {
			return _asyncToGenerator(function* () {})();
		}
		get permissions() {
			return this.$$renderContext.$celScope.permissions;
		}
		_renderCreate() {
			if (!this.$passport.checkPermission(this.permissions, "create")) return;
			const { $jsx } = this.$$renderContext;
			return createVNode("button", {
				"class": "btn btn-primary",
				"type": "button",
				"onClick": () => {
					const actionName = $jsx.normalizeAction("actionCreate");
					this.$performAction(actionName, void 0, this.$$renderContext);
				}
			}, [this.scope.locale.Create()]);
		}
		render() {
			return createVNode("div", null, [this._renderCreate()]);
		}
	}, _descriptor = _applyDecoratedDescriptor(_class2.prototype, "$$renderContext", [_dec3, _dec4], {
		configurable: true,
		enumerable: true,
		writable: true,
		initializer: null
	}), _class2)) || _class$5) || _class$5);
}));
//#endregion
//#region src/suite/cabloy-basic/modules/basic-table/src/component/table/controller.tsx
var _dec$4, _dec2$4, _class$4, _ControllerTable, ControllerTable;
var init_controller = __esmMin((() => {
	init_asyncToGenerator();
	init_src$1();
	init_src$2();
	ControllerTable = (_dec$4 = Controller(), _dec2$4 = BeanInfo({ module: "basic-table" }), _dec$4(_class$4 = _dec2$4(_class$4 = (_ControllerTable = class ControllerTable extends BeanControllerBase {
		__init__() {
			return _asyncToGenerator(function* () {})();
		}
	}, _ControllerTable.$propsDefault = {}, _ControllerTable)) || _class$4) || _class$4);
}));
//#endregion
//#region src/suite/cabloy-basic/modules/basic-table/src/.metadata/component/actionOperationsTable.ts
var ZActionOperationsTable;
var init_actionOperationsTable = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_src$1();
	init_controller$1();
	ZActionOperationsTable = defineComponent((_props) => {
		useController(ControllerActionOperationsTable, void 0, void 0);
		return () => {};
	}, prepareComponentOptions());
}));
//#endregion
//#region src/suite/cabloy-basic/modules/basic-table/src/component/table/render.tsx
var _dec$3, _dec2$3, _class$3, ZTable$1, RenderTable;
var init_render = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_src$1();
	init_lib();
	init_src$2();
	ZTable$1 = createZovaComponentAsync("a-table", "table");
	RenderTable = (_dec$3 = Render(), _dec2$3 = BeanInfo({ module: "basic-table" }), _dec$3(_class$3 = _dec2$3(_class$3 = class RenderTable extends BeanRenderBase {
		render() {
			return createVNode(ZTable$1, mergeProps(this.$props, { "slotDefault": ($$table) => {
				return this._renderTable($$table);
			} }), null);
		}
		_renderTable($$table) {
			const table = $$table.table;
			return createVNode("div", { "class": "overflow-x-auto" }, [createVNode("table", { "class": "table" }, [createVNode("thead", null, [createVNode("tr", null, [table.getFlatHeaders().map((header) => {
				return createVNode("th", { "key": header.id }, [createVNode(FlexRender, {
					"render": header.column.columnDef.header,
					"props": header.getContext()
				}, null)]);
			})])]), createVNode("tbody", null, [table.getRowModel().rows.map((row) => {
				return createVNode("tr", { "key": row.id }, [row.getVisibleCells().map((cell) => {
					return createVNode("td", { "key": cell.id }, [createVNode(FlexRender, {
						"render": cell.column.columnDef.cell,
						"props": cell.getContext()
					}, null)]);
				})]);
			})])])]);
		}
	}) || _class$3) || _class$3);
}));
//#endregion
//#region src/suite/cabloy-basic/modules/basic-table/src/.metadata/component/table.ts
var ZTable;
var init_table = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_src$1();
	init_controller();
	init_render();
	ZTable = defineComponent((_props) => {
		useController(ControllerTable, RenderTable, void 0);
		return () => {};
	}, prepareComponentOptions());
}));
//#endregion
//#region src/suite/cabloy-basic/modules/basic-table/src/bean/tableCell.actionOperationsRow.tsx
var _dec$2, _dec2$2, _class$2, ZIcon, TableCellActionOperationsRow;
var init_tableCell_actionOperationsRow = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_asyncToGenerator();
	init_src$1();
	init_src$3();
	ZIcon = createZovaComponentAsync("a-icon", "icon");
	TableCellActionOperationsRow = (_dec$2 = TableCell(), _dec2$2 = BeanInfo({ module: "basic-table" }), _dec$2(_class$2 = _dec2$2(_class$2 = class TableCellActionOperationsRow extends BeanBase {
		render(_options, renderContext, _next) {
			var _this = this;
			const { $jsx, $celScope, $host } = renderContext;
			const permissions = $celScope.permissions;
			const permissionUpdate = $host.$passport.checkPermission(permissions, "update");
			const permissionDelete = $host.$passport.checkPermission(permissions, "delete");
			return createVNode("div", { "class": "flex gap-2" }, [permissionUpdate && createVNode("button", {
				"class": "btn btn-outline btn-primary",
				"onClick": function() {
					var _ref = _asyncToGenerator(function* () {
						const actionName = $jsx.normalizeAction("actionEdit");
						yield $host.$performAction(actionName, void 0, renderContext);
					});
					return function onClick() {
						return _ref.apply(this, arguments);
					};
				}()
			}, [createVNode(ZIcon, {
				"name": "::draft",
				"width": 24
			}, null)]), permissionDelete && createVNode("button", {
				"class": "btn btn-outline btn-error",
				"onClick": function() {
					var _ref2 = _asyncToGenerator(function* () {
						if (!window.confirm(_this.scope.locale.DeleteConfirm())) return;
						const actionName = $jsx.normalizeAction("actionDelete");
						yield $host.$performAction(actionName, void 0, renderContext);
					});
					return function onClick() {
						return _ref2.apply(this, arguments);
					};
				}()
			}, [createVNode(ZIcon, {
				"name": "::delete",
				"width": 24
			}, null)])]);
		}
	}) || _class$2) || _class$2);
}));
//#endregion
//#region src/suite/cabloy-basic/modules/basic-table/src/bean/tableCell.actionView.tsx
var _dec$1, _dec2$1, _class$1, TableCellActionView;
var init_tableCell_actionView = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_asyncToGenerator();
	init_src$1();
	init_src$3();
	TableCellActionView = (_dec$1 = TableCell(), _dec2$1 = BeanInfo({ module: "basic-table" }), _dec$1(_class$1 = _dec2$1(_class$1 = class TableCellActionView extends BeanBase {
		render(options, renderContext, next) {
			const { $jsx, $host } = renderContext;
			const value = next();
			return createVNode("a", {
				"class": "hover:text-blue-500",
				"href": "#",
				"onClick": function() {
					var _ref = _asyncToGenerator(function* (e) {
						e.preventDefault();
						e.stopPropagation();
						const actionName = $jsx.normalizeAction("actionView");
						yield $host.$performAction(actionName, options, renderContext);
					});
					return function onClick(_x) {
						return _ref.apply(this, arguments);
					};
				}()
			}, [value]);
		}
	}) || _class$1) || _class$1);
}));
//#endregion
//#region src/suite/cabloy-basic/modules/basic-table/src/.metadata/index.ts
/** tableCell: end */
/** locale: begin */
/** locale: end */
/** scope: begin */
function locale(key) {
	return `basic-table::${key}`;
}
var _dec, _dec2, _class, components, ScopeModuleBasicTable;
var init__metadata = __esmMin((() => {
	init_src$1();
	init_controller$1();
	init_controller();
	init_actionOperationsTable();
	init_actionOperationsTable();
	init_table();
	init_table();
	init_render();
	init_tableCell_actionOperationsRow();
	init_tableCell_actionView();
	init_src$3();
	init_src$2();
	components = {
		"actionOperationsTable": ZActionOperationsTable,
		"table": ZTable
	};
	ScopeModuleBasicTable = (_dec = Scope(), _dec2 = BeanInfo({ module: "basic-table" }), _dec(_class = _dec2(_class = class ScopeModuleBasicTable extends BeanScopeBase {}) || _class) || _class);
}));
/** scope: end */
//#endregion
//#region src/suite/cabloy-basic/modules/basic-table/src/config/locale/en-us.ts
var en_us_default;
var init_en_us = __esmMin((() => {
	en_us_default = {
		Create: "Create",
		DeleteConfirm: "Are you sure you want to delete this item?"
	};
}));
//#endregion
//#region src/suite/cabloy-basic/modules/basic-table/src/config/locale/zh-cn.ts
var zh_cn_default;
var init_zh_cn = __esmMin((() => {
	zh_cn_default = {
		Create: "创建",
		DeleteConfirm: "您确认要删除本数据吗？"
	};
}));
//#endregion
//#region src/suite/cabloy-basic/modules/basic-table/src/.metadata/locales.ts
function $useLocale(key, ...args) {
	const app = useApp();
	const str = `basic-table::${key}`;
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
//#region src/suite/cabloy-basic/modules/basic-table/src/index.ts
var init_src = __esmMin((() => {
	init__metadata();
	init_locales();
}));
//#endregion
export { components as a, TableCellActionOperationsRow as c, ZActionOperationsTable as d, ControllerTable as f, ScopeModuleBasicTable as i, ZTable as l, $useLocale as n, locale as o, ControllerActionOperationsTable as p, locales as r, TableCellActionView as s, init_src as t, RenderTable as u };
