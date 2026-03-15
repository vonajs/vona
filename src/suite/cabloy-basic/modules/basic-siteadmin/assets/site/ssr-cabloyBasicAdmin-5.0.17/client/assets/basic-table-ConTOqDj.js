import { L as BeanControllerBase, l as BeanInfo, U as Use, M as prepareComponentOptions, N as useController, Y as BeanRenderBase, W as createZovaComponentAsync, n as BeanBase, v as BeanScopeBase, aa as useApp, a7 as useComputed } from "./zova-QgocPMzS.js";
import { P as createVNode, o as defineComponent, Q as mergeProps } from "./vue-CRNsYCTs.js";
import { Controller, Render, Scope } from "./a-bean-Bxu0OKjI.js";
import { F as FlexRender } from "./tanstack-table-JfOO9tPD.js";
import { TableCell } from "./a-table-CQXUiX08.js";
import "./commonjsHelper-CCIqAdii.js";
import "./zod-DcU_E_GK.js";
import "./a-openapi-m8k_rTIU.js";
import "./typestyle-BzUluVB3.js";
import "./openapi3-CmG_8H3_.js";
import "./a-model-DdQjWvuo.js";
import "./tanstack-query-D5lEwADt.js";
import "./localforage-DLcenR3h.js";
var _dec$5, _dec2$5, _dec3, _dec4, _class$5, _class2, _descriptor;
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
let ControllerActionOperationsTable = (_dec$5 = Controller(), _dec2$5 = BeanInfo({
  module: "basic-table"
}), _dec3 = Use({
  injectionScope: "host"
}), _dec4 = Reflect.metadata("design:type", typeof IJsxRenderContextPage === "undefined" ? Object : IJsxRenderContextPage), _dec$5(_class$5 = _dec2$5(_class$5 = (_class2 = class ControllerActionOperationsTable2 extends BeanControllerBase {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "$$renderContext", _descriptor, this);
  }
  async __init__() {
  }
  get permissions() {
    return this.$$renderContext.$celScope.permissions;
  }
  _renderCreate() {
    const permissionCreate = this.$passport.checkPermission(this.permissions, "create");
    if (!permissionCreate) return;
    const {
      $jsx
    } = this.$$renderContext;
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
var _dec$4, _dec2$4, _class$4, _ControllerTable;
let ControllerTable = (_dec$4 = Controller(), _dec2$4 = BeanInfo({
  module: "basic-table"
}), _dec$4(_class$4 = _dec2$4(_class$4 = (_ControllerTable = class ControllerTable2 extends BeanControllerBase {
  async __init__() {
  }
}, _ControllerTable.$propsDefault = {}, _ControllerTable)) || _class$4) || _class$4);
const ZActionOperationsTable = defineComponent((_props) => {
  useController(ControllerActionOperationsTable, void 0, void 0);
  return () => {
  };
}, prepareComponentOptions());
var _dec$3, _dec2$3, _class$3;
const ZTable$1 = createZovaComponentAsync("a-table", "table");
let RenderTable = (_dec$3 = Render(), _dec2$3 = BeanInfo({
  module: "basic-table"
}), _dec$3(_class$3 = _dec2$3(_class$3 = class RenderTable2 extends BeanRenderBase {
  render() {
    return createVNode(ZTable$1, mergeProps(this.$props, {
      "slotDefault": ($$table) => {
        return this._renderTable($$table);
      }
    }), null);
  }
  _renderTable($$table) {
    const table = $$table.table;
    return createVNode("div", {
      "class": "overflow-x-auto"
    }, [createVNode("table", {
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
    })])])]);
  }
}) || _class$3) || _class$3);
const ZTable = defineComponent((_props) => {
  useController(ControllerTable, RenderTable, void 0);
  return () => {
  };
}, prepareComponentOptions());
var _dec$2, _dec2$2, _class$2;
const ZIcon = createZovaComponentAsync("a-icon", "icon");
let TableCellActionOperationsRow = (_dec$2 = TableCell(), _dec2$2 = BeanInfo({
  module: "basic-table"
}), _dec$2(_class$2 = _dec2$2(_class$2 = class TableCellActionOperationsRow2 extends BeanBase {
  render(_options, renderContext, _next) {
    const {
      $jsx,
      $celScope,
      $host
    } = renderContext;
    const permissions = $celScope.permissions;
    const permissionUpdate = $host.$passport.checkPermission(permissions, "update");
    const permissionDelete = $host.$passport.checkPermission(permissions, "delete");
    return createVNode("div", {
      "class": "flex gap-2"
    }, [permissionUpdate && createVNode("button", {
      "class": "btn btn-outline btn-primary",
      "onClick": async () => {
        const actionName = $jsx.normalizeAction("actionEdit");
        await $host.$performAction(actionName, void 0, renderContext);
      }
    }, [createVNode(ZIcon, {
      "name": "::draft"
    }, null)]), permissionDelete && createVNode("button", {
      "class": "btn btn-outline btn-error",
      "onClick": async () => {
        if (!window.confirm(this.scope.locale.DeleteConfirm())) return;
        const actionName = $jsx.normalizeAction("actionDelete");
        await $host.$performAction(actionName, void 0, renderContext);
      }
    }, [createVNode(ZIcon, {
      "name": "::delete"
    }, null)])]);
  }
}) || _class$2) || _class$2);
var _dec$1, _dec2$1, _class$1;
let TableCellActionView = (_dec$1 = TableCell(), _dec2$1 = BeanInfo({
  module: "basic-table"
}), _dec$1(_class$1 = _dec2$1(_class$1 = class TableCellActionView2 extends BeanBase {
  render(options, renderContext, next) {
    const {
      $jsx,
      $host
    } = renderContext;
    const value = next();
    return createVNode("a", {
      "class": "hover:text-blue-500",
      "href": "#",
      "onClick": async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const actionName = $jsx.normalizeAction("actionView");
        await $host.$performAction(actionName, options, renderContext);
      }
    }, [value]);
  }
}) || _class$1) || _class$1);
var _dec, _dec2, _class;
const components = {
  "actionOperationsTable": ZActionOperationsTable,
  "table": ZTable
};
let ScopeModuleBasicTable = (_dec = Scope(), _dec2 = BeanInfo({
  module: "basic-table"
}), _dec(_class = _dec2(_class = class ScopeModuleBasicTable2 extends BeanScopeBase {
}) || _class) || _class);
function locale(key) {
  return `basic-table::${key}`;
}
const locale_en_us = {
  Create: "Create",
  DeleteConfirm: "Are you sure you want to delete this item?"
};
const locale_zh_cn = {
  Create: "创建",
  DeleteConfirm: "您确认要删除本数据吗？"
};
const locales = {
  "en-us": locale_en_us,
  "zh-cn": locale_zh_cn
};
function $useLocale(key, ...args) {
  const app = useApp();
  const str = `basic-table::${key}`;
  return useComputed(() => {
    return app.meta.text(str, ...args);
  });
}
export {
  $useLocale,
  ControllerActionOperationsTable,
  ControllerTable,
  RenderTable,
  ScopeModuleBasicTable,
  TableCellActionOperationsRow,
  TableCellActionView,
  ZActionOperationsTable,
  ZTable,
  components,
  locale,
  locales
};
