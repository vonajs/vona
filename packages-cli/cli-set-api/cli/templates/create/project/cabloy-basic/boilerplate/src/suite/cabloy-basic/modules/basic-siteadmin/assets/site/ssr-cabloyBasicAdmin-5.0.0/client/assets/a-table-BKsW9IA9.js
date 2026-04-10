import { n as __esmMin } from "./rolldown-runtime-CSj9S6Td.js";
import { d as markRaw } from "./vue-BuTKVo3e.js";
import { d as defineComponent, l as createVNode } from "./vue-DeT-l8pH.js";
import { n as init_vue_runtime_esm_bundler } from "./vue-C_EuNVEw.js";
import { D as celEnvBase, z as init_dist } from "./zova-C8-MPvXl.js";
import { d as _objectSpread2, f as init_objectSpread2, m as init_asyncToGenerator, p as _asyncToGenerator } from "./fecha-5qJk_cbF.js";
import { B as deepExtend, C as UseScope, I as appResource, O as createBeanDecorator, U as objectAssignReactive, X as cast, _ as BeanRenderBase, b as BeanControllerBase, h as BeanScopeBase, k as BeanInfo, l as prepareComponentOptions, u as useController, v as BeanControllerPageBase, z as deepEqual } from "./zova-BXlOOlVL.js";
import { t as init_src$1 } from "./zova-BJ0Q7wHc.js";
import { _ as Render, h as Controller, o as Scope, t as init_src$2 } from "./a-bean-BQjv0q8B.js";
import { i as isJsxComponent, n as ZovaJsx, t as init_src$3 } from "./zova-CWLB1h7H.js";
import { r as renderTableColumnTopPropsSystem, t as init_src$4 } from "./a-openapi-B6wN1jpJ.js";
import { r as getCoreRowModel, t as createColumnHelper } from "./tanstack-table-DpY9VKVZ.js";
import { n as init_lib$1, r as useVueTable, t as FlexRender } from "./tanstack-table-DfnL74Rh.js";
//#region src/suite-vendor/a-zova/modules/a-table/src/lib/beanControllerTableBase.ts
var BeanControllerTableBase;
var init_beanControllerTableBase = __esmMin((() => {
	init_lib$1();
	init_vue_runtime_esm_bundler();
	init_src$1();
	BeanControllerTableBase = class extends BeanControllerBase {
		$useTable(initialOptions) {
			return this.ctx.util.instanceScope(() => {
				return markRaw(useVueTable(initialOptions));
			});
		}
	};
}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-table/src/types/tableColumn.ts
var constColumnProps;
var init_tableColumn = __esmMin((() => {
	constColumnProps = "$$ColumnProps";
}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-table/src/component/table/controller.tsx
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
var _dec$2, _dec2$2, _dec3, _dec4, _class$2, _class2, _descriptor, _ControllerTable, ControllerTable;
var init_controller = __esmMin((() => {
	init_asyncToGenerator();
	init_objectSpread2();
	init_src$1();
	init_dist();
	init_lib$1();
	init_src$3();
	init_src$2();
	init_src$4();
	init_beanControllerTableBase();
	init_tableColumn();
	ControllerTable = (_dec$2 = Controller(), _dec2$2 = BeanInfo({ module: "a-table" }), _dec3 = UseScope("a-openapi"), _dec4 = Reflect.metadata("design:type", typeof ScopeModuleAOpenapi === "undefined" ? Object : ScopeModuleAOpenapi), _dec$2(_class$2 = _dec2$2(_class$2 = (_class2 = (_ControllerTable = class ControllerTable extends BeanControllerTableBase {
		constructor(...args) {
			super(...args);
			this.properties = void 0;
			this.columns = void 0;
			this.table = void 0;
			this.tableProvider = void 0;
			this.tableMeta = void 0;
			this.zovaJsx = void 0;
			this.columnCelEnv = void 0;
			_initializerDefineProperty(this, "$$scopeModuleAOpenapi", _descriptor, this);
		}
		__init__() {
			var _this = this;
			return _asyncToGenerator(function* () {
				_this.bean._setBean("$$table", _this);
				_this.tableProvider = _this.$useComputed(() => {
					var _this$$$scopeModuleAO;
					return deepExtend({}, _this.$$scopeModuleAOpenapi.config.resourceMeta.provider, (_this$$$scopeModuleAO = _this.$$scopeModuleAOpenapi.config.resourceMeta.table) === null || _this$$$scopeModuleAO === void 0 ? void 0 : _this$$$scopeModuleAO.provider, _this.$props.tableProvider);
				});
				_this.columnCelEnv = _this._getColumnCelEnv();
				_this.zovaJsx = _this.app.bean._newBeanSimple(ZovaJsx, false, _this.tableProvider.components, _this.tableProvider.actions, _this.columnCelEnv);
				_this._createProperties();
				_this.tableMeta = yield _this._createTableMeta();
				_this.columns = yield _this._createColumns();
				_this.$watch(() => _this.$props.schema, function() {
					var _ref = _asyncToGenerator(function* (newValue, oldValue) {
						if (deepEqual(newValue, oldValue)) return;
						_this.tableMeta = yield _this._createTableMeta();
						_this.columns = yield _this._createColumns();
					});
					return function(_x, _x2) {
						return _ref.apply(this, arguments);
					};
				}());
				_this._createTable();
			})();
		}
		get schema() {
			return this.$props.schema;
		}
		get data() {
			return this.$props.data;
		}
		_createTable() {
			const self = this;
			const tableOptions = {
				getRowId: (row) => cast(row).id,
				getCoreRowModel: getCoreRowModel(),
				renderFallbackValue: this.scope.config.renderFallbackValue,
				manualPagination: true,
				get data() {
					return self.data || [];
				},
				get columns() {
					return self.columns;
				}
			};
			this.table = this.$useTable(tableOptions);
		}
		_createColumns() {
			var _this2 = this;
			return _asyncToGenerator(function* () {
				if (!_this2.properties) return [];
				if (!_this2.$props.getColumns) return yield _this2._createColumnsMiddle(_this2.tableMeta.properties);
				return yield _this2.$props.getColumns(function() {
					var _ref2 = _asyncToGenerator(function* (properties) {
						return yield _this2._createColumnsMiddle(properties !== null && properties !== void 0 ? properties : _this2.tableMeta.properties);
					});
					return function(_x3) {
						return _ref2.apply(this, arguments);
					};
				}(), _this2);
			})();
		}
		_createColumnsMiddle(properties) {
			var _this3 = this;
			return _asyncToGenerator(function* () {
				const tableMeta = _this3.tableMeta;
				const columnHelper = createColumnHelper();
				const columns = [];
				for (const property of properties) {
					const key = property.key;
					columns.push(columnHelper.accessor(key, {
						id: key,
						header: (_props) => {
							return (property === null || property === void 0 ? void 0 : property.title) || key;
						},
						cell: (props) => tableMeta.renders[key](props)
					}));
				}
				return columns;
			})();
		}
		_createProperties() {
			this.properties = this.$useComputed(() => {
				return this.$sdk.loadSchemaProperties(this.schema, "table");
			});
		}
		_createTableMeta() {
			var _this4 = this;
			return _asyncToGenerator(function* () {
				const properties = [];
				const renders = {};
				if (!_this4.properties) return {
					properties,
					renders
				};
				const promises = [];
				for (const property of _this4.properties) {
					const key = property.key;
					const columnScope = _this4.getColumnScope(key);
					const jsxRenderContext = _this4.getColumnJsxRenderContext(columnScope);
					const columnProps = _this4.getColumnComponentPropsTop(key, columnScope, jsxRenderContext);
					if (columnProps.visible === false) continue;
					properties.push(property);
					promises.push(_this4._createColumnRender(columnProps.render, property, columnProps, columnScope));
				}
				const res = yield Promise.all(promises);
				properties.forEach((item, index) => renders[item.key] = res[index]);
				return {
					properties,
					renders
				};
			})();
		}
		getColumnJsxRenderContext(celScope) {
			return {
				app: this.app,
				ctx: this.ctx,
				$scene: "tableColumn",
				$host: this,
				$celScope: celScope,
				$jsx: this.zovaJsx,
				$$table: this
			};
		}
		getCellJsxRenderContext(celScope, cellContext) {
			return {
				app: this.app,
				ctx: this.ctx,
				$scene: "tableCell",
				$host: this,
				$celScope: celScope,
				$jsx: this.zovaJsx,
				$$table: this,
				cellContext
			};
		}
		createColumnRender(key, render) {
			var _this5 = this;
			return _asyncToGenerator(function* () {
				const columnScope = _this5.getColumnScope(key);
				return yield _this5._createColumnRender(render, void 0, void 0, columnScope);
			})();
		}
		_createColumnRender(render, property, columnProps, columnScope) {
			var _this6 = this;
			return _asyncToGenerator(function* () {
				const renderProvider = _this6.getRenderProvider(render);
				let beanInstance;
				let onionOptions;
				if (typeof renderProvider === "string" && renderProvider.includes(".tableCell.")) {
					beanInstance = yield _this6.sys.bean._getBean(renderProvider, true);
					const beanOptions = appResource.getBean(renderProvider);
					onionOptions = beanOptions === null || beanOptions === void 0 ? void 0 : beanOptions.options;
				}
				return (cellContext) => {
					if (!cellContext) return;
					return _this6._cellRender(render, property, columnProps, columnScope, cellContext, renderProvider, beanInstance, onionOptions);
				};
			})();
		}
		_cellRender(render, property, columnProps, columnScope, cellContext, renderProvider, beanInstance, onionOptions) {
			return this.zovaJsx.setTransientObject({ getValue: (name) => {
				return cellContext.row.getValue(name);
			} }, () => {
				return this._cellRenderInner(render, property, columnProps, columnScope, cellContext, renderProvider, beanInstance, onionOptions);
			});
		}
		_cellRenderInner(render, property, columnProps, columnScope, cellContext, renderProvider, beanInstance, onionOptions) {
			var _property$rest, _property$rest2;
			const value = cellContext.getValue();
			const cellScope = objectAssignReactive({}, columnScope, { value });
			let displayValue = (property === null || property === void 0 || (_property$rest = property.rest) === null || _property$rest === void 0 ? void 0 : _property$rest.displayValue) !== void 0 ? this.zovaJsx.evaluateExpression(property === null || property === void 0 || (_property$rest2 = property.rest) === null || _property$rest2 === void 0 ? void 0 : _property$rest2.displayValue, cellScope) : value;
			if (displayValue === void 0 || displayValue === null || displayValue === "") displayValue = this.table.options.renderFallbackValue;
			cellScope.displayValue = displayValue;
			if (renderProvider === "text") return displayValue;
			const jsxRenderContext = this.getCellJsxRenderContext(cellScope, cellContext);
			if (beanInstance) {
				var _cellProps;
				let cellProps = isJsxComponent(render) ? this.zovaJsx.renderJsxProps(cast(render).props, _objectSpread2({}, columnProps), cellScope, jsxRenderContext) : columnProps;
				if (onionOptions) cellProps = deepExtend({}, onionOptions, cellProps);
				return beanInstance.render((_cellProps = cellProps) !== null && _cellProps !== void 0 ? _cellProps : {}, jsxRenderContext, () => {
					const children = isJsxComponent(render) && cast(render).children;
					if (children && children.length > 0) return this.zovaJsx.renderJsxChildrenDirect(children, cellScope, jsxRenderContext);
					else return displayValue;
				});
			}
			return this.zovaJsx.render(render, {}, cellScope, jsxRenderContext);
		}
		getColumnProperty(name) {
			if (!this.properties) return;
			return this.properties.find((item) => item.key === name);
		}
		_getColumnCelEnv() {
			const celEnv = celEnvBase.clone();
			celEnv.registerFunction("getProperty(string):dyn", (name) => {
				return this.getColumnProperty(name);
			});
			celEnv.registerFunction("getValue(string):dyn", (name) => {
				return this.zovaJsx.transientObject.getValue(name);
			});
			return celEnv;
		}
		getColumnScope(name, scopeExtra) {
			return objectAssignReactive({}, this.$props.tableScope, _objectSpread2({
				name,
				property: this.getColumnProperty(name)
			}, scopeExtra));
		}
		getColumnComponentPropsTop(name, celScope, renderContext) {
			const props = {
				["$$ColumnProps"]: true,
				key: name,
				name
			};
			const property = this.getColumnProperty(name);
			if (!property) return props;
			const rest = property.rest;
			if (!rest) return props;
			const keys = Object.keys(rest).filter((item) => !renderTableColumnTopPropsSystem.includes(item));
			if (keys.length === 0) return props;
			for (const key of keys) {
				const value = rest[key];
				let keyValue;
				if (key === "render") if (typeof value === "string") keyValue = this.zovaJsx.evaluateExpression(value, celScope);
				else keyValue = value;
				else keyValue = this.zovaJsx.renderJsxOrCel(value, void 0, celScope, renderContext);
				props[key] = keyValue;
			}
			return props;
		}
		getRenderFlattern(render) {
			return isJsxComponent(render) ? cast(render).type : render;
		}
		getRenderProvider(render) {
			var _renderProvider;
			let renderProvider = this.getRenderFlattern(render);
			if (typeof renderProvider === "string") {
				var _this$tableProvider$c, _this$tableProvider$c2;
				renderProvider = (_this$tableProvider$c = (_this$tableProvider$c2 = this.tableProvider.components) === null || _this$tableProvider$c2 === void 0 ? void 0 : _this$tableProvider$c2[renderProvider]) !== null && _this$tableProvider$c !== void 0 ? _this$tableProvider$c : renderProvider;
			}
			return (_renderProvider = renderProvider) !== null && _renderProvider !== void 0 ? _renderProvider : "text";
		}
	}, _ControllerTable.$propsDefault = {}, _ControllerTable), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "$$scopeModuleAOpenapi", [_dec3, _dec4], {
		configurable: true,
		enumerable: true,
		writable: true,
		initializer: null
	}), _class2)) || _class$2) || _class$2);
}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-table/src/component/table/render.tsx
var _dec$1, _dec2$1, _class$1, RenderTable;
var init_render = __esmMin((() => {
	init_vue_runtime_esm_bundler();
	init_src$1();
	init_lib$1();
	init_src$2();
	RenderTable = (_dec$1 = Render(), _dec2$1 = BeanInfo({ module: "a-table" }), _dec$1(_class$1 = _dec2$1(_class$1 = class RenderTable extends BeanRenderBase {
		_renderTableDefault() {
			const table = this.table;
			return createVNode("table", { "class": "table" }, [createVNode("thead", null, [createVNode("tr", null, [table.getFlatHeaders().map((header) => {
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
			})])]);
		}
		render() {
			return this.$slotDefault ? this.$slotDefault(this) : this._renderTableDefault();
		}
	}) || _class$1) || _class$1);
}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-table/src/.metadata/component/table.ts
var ZTable;
var init_table$1 = __esmMin((() => {
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
//#region src/suite-vendor/a-zova/modules/a-table/src/config/config.ts
var config;
var init_config = __esmMin((() => {
	config = (_sys) => {
		return { renderFallbackValue: "--" };
	};
}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-table/src/.metadata/index.ts
/** config: end */
/** scope: begin */
var _dec, _dec2, _class, components, ScopeModuleATable;
var init__metadata = __esmMin((() => {
	init_src$1();
	init_controller();
	init_table$1();
	init_table$1();
	init_render();
	init_config();
	init_src$2();
	components = { "table": ZTable };
	ScopeModuleATable = (_dec = Scope(), _dec2 = BeanInfo({ module: "a-table" }), _dec(_class = _dec2(_class = class ScopeModuleATable extends BeanScopeBase {}) || _class) || _class);
}));
/** scope: end */
//#endregion
//#region src/suite-vendor/a-zova/modules/a-table/src/lib/beanControllerPageTableBase.ts
var BeanControllerPageTableBase;
var init_beanControllerPageTableBase = __esmMin((() => {
	init_lib$1();
	init_vue_runtime_esm_bundler();
	init_src$1();
	BeanControllerPageTableBase = class extends BeanControllerPageBase {
		$useTable(initialOptions) {
			return this.ctx.util.instanceScope(() => {
				return markRaw(useVueTable(initialOptions));
			});
		}
	};
}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-table/src/lib/tableCell.ts
function TableCell(options) {
	return createBeanDecorator("tableCell", "sys", true, options);
}
var init_tableCell$1 = __esmMin((() => {
	init_src$1();
}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-table/src/lib/index.ts
var init_lib = __esmMin((() => {
	init_beanControllerPageTableBase();
	init_beanControllerTableBase();
	init_tableCell$1();
}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-table/src/types/providers.ts
var init_providers = __esmMin((() => {}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-table/src/types/table.ts
var init_table = __esmMin((() => {}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-table/src/types/tableCell.ts
var init_tableCell = __esmMin((() => {}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-table/src/types/index.ts
var init_types = __esmMin((() => {
	init_providers();
	init_table();
	init_tableCell();
	init_tableColumn();
}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-table/src/index.ts
var init_src = __esmMin((() => {
	init__metadata();
	init_lib();
	init_types();
}));
//#endregion
export { components as a, RenderTable as c, BeanControllerTableBase as d, ScopeModuleATable as i, ControllerTable as l, TableCell as n, config as o, BeanControllerPageTableBase as r, ZTable as s, init_src as t, constColumnProps as u };
