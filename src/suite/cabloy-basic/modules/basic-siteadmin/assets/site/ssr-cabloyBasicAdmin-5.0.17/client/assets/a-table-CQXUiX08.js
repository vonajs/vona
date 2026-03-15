import { L as BeanControllerBase, h as deepExtend, Q as deepEqual, j as appResource, H as objectAssignReactive, m as cast, E as celEnvBase, l as BeanInfo, X as UseScope, Y as BeanRenderBase, M as prepareComponentOptions, N as useController, v as BeanScopeBase, Z as BeanControllerPageBase, d as createBeanDecorator } from "./zova-QgocPMzS.js";
import { Z as ZovaJsx, i as isJsxComponent, r as renderTableColumnTopPropsSystem } from "./a-openapi-m8k_rTIU.js";
import { Controller, Render, Scope } from "./a-bean-Bxu0OKjI.js";
import { u as useVueTable, g as getCoreRowModel, c as createColumnHelper, F as FlexRender } from "./tanstack-table-JfOO9tPD.js";
import { m as markRaw, P as createVNode, o as defineComponent } from "./vue-CRNsYCTs.js";
import "./commonjsHelper-CCIqAdii.js";
import "./zod-DcU_E_GK.js";
import "./typestyle-BzUluVB3.js";
import "./openapi3-CmG_8H3_.js";
import "./a-model-DdQjWvuo.js";
import "./tanstack-query-D5lEwADt.js";
import "./localforage-DLcenR3h.js";
class BeanControllerTableBase extends BeanControllerBase {
  $useTable(initialOptions) {
    return this.ctx.util.instanceScope(() => {
      return markRaw(useVueTable(initialOptions));
    });
  }
}
const constColumnProps = "$$ColumnProps";
var _dec$2, _dec2$2, _dec3, _dec4, _class$2, _class2, _descriptor, _ControllerTable;
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
let ControllerTable = (_dec$2 = Controller(), _dec2$2 = BeanInfo({
  module: "a-table"
}), _dec3 = UseScope("a-openapi"), _dec4 = Reflect.metadata("design:type", typeof ScopeModuleAOpenapi === "undefined" ? Object : ScopeModuleAOpenapi), _dec$2(_class$2 = _dec2$2(_class$2 = (_class2 = (_ControllerTable = class ControllerTable2 extends BeanControllerTableBase {
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
  async __init__() {
    this.bean._setBean("$$table", this);
    this.tableProvider = this.$useComputed(() => {
      return deepExtend({}, this.$$scopeModuleAOpenapi.config.resourceMeta.provider, this.$$scopeModuleAOpenapi.config.resourceMeta.table?.provider, this.$props.tableProvider);
    });
    this.columnCelEnv = this._getColumnCelEnv();
    this.zovaJsx = this.app.bean._newBeanSimple(ZovaJsx, false, this.tableProvider.components, this.tableProvider.actions, this.columnCelEnv);
    this._createProperties();
    this.tableMeta = await this._createTableMeta();
    this.columns = await this._createColumns();
    this.$watch(() => this.$props.schema, async (newValue, oldValue) => {
      if (deepEqual(newValue, oldValue)) return;
      this.tableMeta = await this._createTableMeta();
      this.columns = await this._createColumns();
    });
    this._createTable();
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
  async _createColumns() {
    if (!this.properties) return [];
    if (!this.$props.getColumns) return await this._createColumnsMiddle(this.tableMeta.properties);
    return await this.$props.getColumns(async (properties) => {
      return await this._createColumnsMiddle(properties ?? this.tableMeta.properties);
    }, this);
  }
  async _createColumnsMiddle(properties) {
    const tableMeta = this.tableMeta;
    const columnHelper = createColumnHelper();
    const columns = [];
    for (const property of properties) {
      const key = property.key;
      columns.push(columnHelper.accessor(key, {
        id: key,
        header: (_props) => {
          return property?.title || key;
        },
        cell: (props) => tableMeta.renders[key](props)
      }));
    }
    return columns;
  }
  _createProperties() {
    this.properties = this.$useComputed(() => {
      return this.$sdk.loadSchemaProperties(this.schema, "table");
    });
  }
  async _createTableMeta() {
    const properties = [];
    const renders = {};
    if (!this.properties) return {
      properties,
      renders
    };
    const promises = [];
    for (const property of this.properties) {
      const key = property.key;
      const columnScope = this.getColumnScope(key);
      const jsxRenderContext = this.getColumnJsxRenderContext(columnScope);
      const columnProps = this.getColumnComponentPropsTop(key, columnScope, jsxRenderContext);
      if (columnProps.visible === false) continue;
      properties.push(property);
      promises.push(this._createColumnRender(columnProps.render, property, columnProps, columnScope));
    }
    const res = await Promise.all(promises);
    properties.forEach((item, index) => renders[item.key] = res[index]);
    return {
      properties,
      renders
    };
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
  async createColumnRender(key, render) {
    const columnScope = this.getColumnScope(key);
    return await this._createColumnRender(render, void 0, void 0, columnScope);
  }
  async _createColumnRender(render, property, columnProps, columnScope) {
    const renderProvider = this.getRenderProvider(render);
    let beanInstance;
    let onionOptions;
    if (typeof renderProvider === "string" && renderProvider.includes(".tableCell.")) {
      beanInstance = await this.sys.bean._getBean(renderProvider, true);
      const beanOptions = appResource.getBean(renderProvider);
      onionOptions = beanOptions?.options;
    }
    return (cellContext) => {
      if (!cellContext) return;
      return this._cellRender(render, property, columnProps, columnScope, cellContext, renderProvider, beanInstance, onionOptions);
    };
  }
  _cellRender(render, property, columnProps, columnScope, cellContext, renderProvider, beanInstance, onionOptions) {
    return this.zovaJsx.setTransientObject({
      getValue: (name) => {
        return cellContext.row.getValue(name);
      }
    }, () => {
      return this._cellRenderInner(render, property, columnProps, columnScope, cellContext, renderProvider, beanInstance, onionOptions);
    });
  }
  _cellRenderInner(render, property, columnProps, columnScope, cellContext, renderProvider, beanInstance, onionOptions) {
    const value = cellContext.getValue();
    const cellScope = objectAssignReactive({}, columnScope, {
      value
    });
    let displayValue = property?.rest?.displayValue !== void 0 ? this.zovaJsx.evaluateExpression(property?.rest?.displayValue, cellScope) : value;
    if (displayValue === void 0 || displayValue === null || displayValue === "") {
      displayValue = this.table.options.renderFallbackValue;
    }
    cellScope.displayValue = displayValue;
    if (renderProvider === "text") {
      return displayValue;
    }
    const jsxRenderContext = this.getCellJsxRenderContext(cellScope, cellContext);
    if (beanInstance) {
      let cellProps = isJsxComponent(render) ? this.zovaJsx.renderJsxProps(cast(render).props, {
        ...columnProps
      }, cellScope, jsxRenderContext) : columnProps;
      if (onionOptions) {
        cellProps = deepExtend({}, onionOptions, cellProps);
      }
      return beanInstance.render(cellProps ?? {}, jsxRenderContext, () => {
        const children = isJsxComponent(render) && cast(render).children;
        if (children && children.length > 0) {
          return this.zovaJsx.renderJsxChildrenDirect(children, cellScope, jsxRenderContext);
        } else {
          return displayValue;
        }
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
    return objectAssignReactive({}, this.$props.tableScope, {
      name,
      property: this.getColumnProperty(name),
      ...scopeExtra
    });
  }
  getColumnComponentPropsTop(name, celScope, renderContext) {
    const props = {
      [constColumnProps]: true,
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
      if (key === "render") {
        if (typeof value === "string") {
          keyValue = this.zovaJsx.evaluateExpression(value, celScope);
        } else {
          keyValue = value;
        }
      } else {
        keyValue = this.zovaJsx.renderJsxOrCel(value, void 0, celScope, renderContext);
      }
      props[key] = keyValue;
    }
    return props;
  }
  getRenderFlattern(render) {
    return isJsxComponent(render) ? cast(render).type : render;
  }
  getRenderProvider(render) {
    let renderProvider = this.getRenderFlattern(render);
    if (typeof renderProvider === "string") {
      renderProvider = this.tableProvider.components?.[renderProvider] ?? renderProvider;
    }
    return renderProvider ?? "text";
  }
}, _ControllerTable.$propsDefault = {}, _ControllerTable), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "$$scopeModuleAOpenapi", [_dec3, _dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2)) || _class$2) || _class$2);
var _dec$1, _dec2$1, _class$1;
let RenderTable = (_dec$1 = Render(), _dec2$1 = BeanInfo({
  module: "a-table"
}), _dec$1(_class$1 = _dec2$1(_class$1 = class RenderTable2 extends BeanRenderBase {
  _renderTableDefault() {
    const table = this.table;
    return createVNode("table", {
      "class": "table"
    }, [createVNode("thead", null, [createVNode("tr", null, [table.getFlatHeaders().map((header) => {
      return createVNode("th", {
        "key": header.id
      }, [createVNode(FlexRender, {
        "render": header.column.columnDef.header,
        "props": header.getContext()
      }, null)]);
    })])]), createVNode("tbody", null, [table.getRowModel().rows.map((row) => {
      return createVNode("tr", {
        "key": row.id
      }, [row.getVisibleCells().map((cell) => {
        return createVNode("td", {
          "key": cell.id
        }, [createVNode(FlexRender, {
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
const ZTable = defineComponent((_props) => {
  useController(ControllerTable, RenderTable, void 0);
  return () => {
  };
}, prepareComponentOptions());
const config = (_sys) => {
  return {
    renderFallbackValue: "--"
  };
};
var _dec, _dec2, _class;
const components = {
  "table": ZTable
};
let ScopeModuleATable = (_dec = Scope(), _dec2 = BeanInfo({
  module: "a-table"
}), _dec(_class = _dec2(_class = class ScopeModuleATable2 extends BeanScopeBase {
}) || _class) || _class);
class BeanControllerPageTableBase extends BeanControllerPageBase {
  $useTable(initialOptions) {
    return this.ctx.util.instanceScope(() => {
      return markRaw(useVueTable(initialOptions));
    });
  }
}
function TableCell(options) {
  return createBeanDecorator("tableCell", "sys", true, options);
}
export {
  BeanControllerPageTableBase,
  BeanControllerTableBase,
  ControllerTable,
  RenderTable,
  ScopeModuleATable,
  TableCell,
  ZTable,
  components,
  config,
  constColumnProps
};
