import { l as BeanInfo, L as BeanControllerBase, U as Use, W as createZovaComponentAsync, Z as BeanControllerPageBase, a7 as useComputed, ae as createZovaComponentPage, Y as BeanRenderBase, M as prepareComponentOptions, N as useController, af as BeanAopBase, ag as polyfillDispose, n as BeanBase, v as BeanScopeBase, aa as useApp } from "./zova-QgocPMzS.js";
import { BeanModelBase, Model, $QueryAutoLoad } from "./a-model-DdQjWvuo.js";
import { Store, Controller, Render, Aop, Scope } from "./a-bean-Bxu0OKjI.js";
import { BeanPiniaStoreBase } from "./a-pinia-BGHj6dhI.js";
import { d as defineStore } from "./pinia-BolmCbMV.js";
import { l as ref, a2 as openBlock, a3 as createElementBlock, a4 as createBaseVNode, a5 as toDisplayString, F as unref, c as computed, P as createVNode, N as createTextVNode, Q as mergeProps, R as Fragment, a6 as _export_sfc, a7 as renderSlot, o as defineComponent } from "./vue-CRNsYCTs.js";
import { ZBehavior, BeanBehaviorBase, Behavior } from "./a-behavior-BVEM_kq-.js";
import { o as object, n as number, c as string, d as array, e as boolean } from "./zod-DcU_E_GK.js";
import { $getThemeName, BeanThemeBase, Theme } from "./a-style-uiQyot3t.js";
import { BeanControllerPageFormBase } from "./a-form-ae5PgLrA.js";
import { d as RouterLink } from "./vue-router-DwxCgNw3.js";
import { c as classes } from "./typestyle-BzUluVB3.js";
import { TableCell } from "./a-table-CQXUiX08.js";
function useCounter() {
  const count = ref(0);
  function increment() {
    count.value++;
  }
  function decrement() {
    count.value--;
  }
  return {
    count,
    increment,
    decrement
  };
}
const _sfc_main$1 = {
  __name: "Counter",
  setup(__props) {
    const { count, increment, decrement } = useCounter();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createBaseVNode("div", null, toDisplayString(`count: ${unref(count)}`), 1),
        createBaseVNode("button", {
          class: "btn btn-primary",
          onClick: _cache[0] || (_cache[0] = (...args) => unref(increment) && unref(increment)(...args))
        }, " Increment "),
        createBaseVNode("button", {
          class: "btn btn-secondary",
          onClick: _cache[1] || (_cache[1] = (...args) => unref(decrement) && unref(decrement)(...args))
        }, " Decrement ")
      ]);
    };
  }
};
var _dec$n, _dec2$n, _class$n;
let ModelTest = (_dec$n = Model(), _dec2$n = BeanInfo({
  module: "demo-basic"
}), _dec$n(_class$n = _dec2$n(_class$n = class ModelTest2 extends BeanModelBase {
  test() {
    return this.$useStateData({
      queryKey: ["test"],
      queryFn: async () => {
        const data = await this.$api.testSsrToolOne.test({
          id: "1",
          name: "Tom",
          married: true,
          details: []
        }, {
          params: {
            id: "1"
          },
          query: {
            name: "Tom"
          }
        });
        return data;
      }
    });
  }
}) || _class$n) || _class$n);
const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  const name = ref("apple");
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }
  return {
    count,
    name,
    doubleCount,
    increment
  };
});
var _dec$m, _dec2$m, _class$m;
let StoreCounter = (_dec$m = Store(), _dec2$m = BeanInfo({
  module: "demo-basic"
}), _dec$m(_class$m = _dec2$m(_class$m = class StoreCounter2 extends BeanPiniaStoreBase {
  async __init__() {
    await super.__init__(useCounterStore);
  }
}) || _class$m) || _class$m);
var _dec$l, _dec2$l, _dec3$5, _dec4$5, _class$l, _class2$5, _descriptor$5, _ControllerActionView;
function _initializerDefineProperty$5(e, i, r, l) {
  r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 });
}
function _applyDecoratedDescriptor$5(i, e, r, n, l) {
  var a = {};
  return Object.keys(n).forEach(function(i2) {
    a[i2] = n[i2];
  }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = true), a = r.slice().reverse().reduce(function(r2, n2) {
    return n2(i, e, r2) || r2;
  }, a), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a;
}
let ControllerActionView = (_dec$l = Controller(), _dec2$l = BeanInfo({
  module: "demo-basic"
}), _dec3$5 = Use({
  injectionScope: "host"
}), _dec4$5 = Reflect.metadata("design:type", typeof IJsxRenderContextTableCell === "undefined" ? Object : IJsxRenderContextTableCell), _dec$l(_class$l = _dec2$l(_class$l = (_class2$5 = (_ControllerActionView = class ControllerActionView2 extends BeanControllerBase {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty$5(this, "$$renderContext", _descriptor$5, this);
  }
  async __init__() {
  }
  render() {
    if (!this.$$renderContext) throw new Error("should used in table");
    const {
      $jsx,
      $celScope
    } = this.$$renderContext;
    return createVNode("a", {
      "class": "hover:text-blue-500",
      "href": "#",
      "onClick": async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const actionName = $jsx.normalizeAction("actionView");
        await this.$performAction(actionName, void 0, this.$$renderContext);
      }
    }, [this.$slotDefault ? this.$slotDefault() : $celScope.displayValue]);
  }
}, _ControllerActionView.$propsDefault = {}, _ControllerActionView), _descriptor$5 = _applyDecoratedDescriptor$5(_class2$5.prototype, "$$renderContext", [_dec3$5, _dec4$5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2$5)) || _class$l) || _class$l);
var _dec$k, _dec2$k, _class$k, _ControllerCard;
let ControllerCard = (_dec$k = Controller(), _dec2$k = BeanInfo({
  module: "demo-basic"
}), _dec$k(_class$k = _dec2$k(_class$k = (_ControllerCard = class ControllerCard2 extends BeanControllerBase {
  render() {
    return createVNode("div", null, [createVNode("button", {
      "class": "btn btn-primary",
      "onClick": () => {
        this.$props.onReset?.(/* @__PURE__ */ new Date());
      }
    }, [createTextVNode("Reset Time")]), createVNode("div", null, [createVNode("div", {
      "style": {
        backgroundColor: "teal"
      }
    }, [createVNode("div", null, [createVNode("div", null, [createTextVNode("Slot:")]), this.$props.slotHeader?.()]), createVNode("div", null, [`Prop: ${this.$props.header}`])]), createVNode("div", {
      "style": {
        backgroundColor: "orange"
      }
    }, [createVNode("div", null, [createVNode("div", null, [createTextVNode("Slot:")]), this.$slotDefault?.()]), createVNode("div", null, [`Prop: ${this.$props.content}`])]), createVNode("div", {
      "style": {
        backgroundColor: "green"
      }
    }, [createVNode("div", null, [createVNode("div", null, [createTextVNode("Slot")]), this.$props.slotFooter?.()]), createVNode("div", null, [`Prop: ${this.$props.footer}`])])])]);
  }
}, _ControllerCard.$propsDefault = {
  header: "default header"
}, _ControllerCard)) || _class$k) || _class$k);
var _dec$j, _dec2$j, _class$j, _ControllerFormFieldTest;
const ZFormField$1 = createZovaComponentAsync("a-form", "formField");
let ControllerFormFieldTest = (_dec$j = Controller(), _dec2$j = BeanInfo({
  module: "demo-basic"
}), _dec$j(_class$j = _dec2$j(_class$j = (_ControllerFormFieldTest = class ControllerFormFieldTest2 extends BeanControllerBase {
  async __init__() {
  }
  render() {
    const domField = this.$slotDefault ? this.$slotDefault() : createVNode(ZFormField$1, mergeProps(this.$props, {
      "render": "text"
    }), null);
    return createVNode(Fragment, null, [this.$props.slotHeader?.({
      name: "kevin"
    }), domField, this.$props.showLog && createVNode("div", null, [`log: ${this.$props.name}`]), this.$props.slotFooter?.({
      name: "jimmy"
    })]);
  }
}, _ControllerFormFieldTest.$propsDefault = {}, _ControllerFormFieldTest.$componentOptions = {
  inheritAttrs: false
}, _ControllerFormFieldTest)) || _class$j) || _class$j);
var _dec$i, _dec2$i, _dec3$4, _dec4$4, _class$i, _class2$4, _descriptor$4, _ControllerTableCellTest;
function _initializerDefineProperty$4(e, i, r, l) {
  r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 });
}
function _applyDecoratedDescriptor$4(i, e, r, n, l) {
  var a = {};
  return Object.keys(n).forEach(function(i2) {
    a[i2] = n[i2];
  }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = true), a = r.slice().reverse().reduce(function(r2, n2) {
    return n2(i, e, r2) || r2;
  }, a), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a;
}
let ControllerTableCellTest = (_dec$i = Controller(), _dec2$i = BeanInfo({
  module: "demo-basic"
}), _dec3$4 = Use({
  injectionScope: "host"
}), _dec4$4 = Reflect.metadata("design:type", typeof IJsxRenderContextTableCell === "undefined" ? Object : IJsxRenderContextTableCell), _dec$i(_class$i = _dec2$i(_class$i = (_class2$4 = (_ControllerTableCellTest = class ControllerTableCellTest2 extends BeanControllerBase {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty$4(this, "$$renderContext", _descriptor$4, this);
  }
  async __init__() {
  }
  render() {
    const {
      name,
      displayValue
    } = this.$$renderContext.$celScope;
    const domCell = this.$slotDefault ? this.$slotDefault() : displayValue;
    return createVNode(Fragment, null, [this.$props.slotHeader?.({
      name: "kevin"
    }), domCell, this.$props.showLog && createVNode("div", null, [`log: ${name}`]), this.$props.slotFooter?.({
      name: "jimmy"
    })]);
  }
}, _ControllerTableCellTest.$propsDefault = {}, _ControllerTableCellTest), _descriptor$4 = _applyDecoratedDescriptor$4(_class2$4.prototype, "$$renderContext", [_dec3$4, _dec4$4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2$4)) || _class$i) || _class$i);
var _dec$h, _dec2$h, _class$h;
const ZPage$8 = createZovaComponentAsync("home-base", "page");
let ControllerPageComponent = (_dec$h = Controller(), _dec2$h = BeanInfo({
  module: "demo-basic"
}), _dec$h(_class$h = _dec2$h(_class$h = class ControllerPageComponent2 extends BeanControllerPageBase {
  constructor(...args) {
    super(...args);
    this.resetTime = /* @__PURE__ */ new Date();
    this.cardRef = void 0;
  }
  render() {
    return createVNode(ZPage$8, null, {
      default: () => [createVNode(ZCard, {
        "controllerRef": (ref2) => {
          this.cardRef = ref2;
          console.log("cardRef.$props: ", this.cardRef?.$props);
        },
        "header": "header",
        "content": this.resetTime.toString(),
        "footer": "footer",
        "onReset": (time) => {
          this.resetTime = time;
        },
        "slotHeader": () => {
          return createVNode("div", null, [createTextVNode("this is a header slot from parent")]);
        },
        "slotFooter": () => {
          return createVNode("div", null, [createTextVNode("this is a footer slot from parent")]);
        }
      }, {
        default: () => [createVNode("div", null, [createTextVNode("this is a default slot from parent")])]
      }), createVNode("label", null, [createTextVNode("Input: ")]), createVNode(ZBehavior, {
        "type": "text",
        "class": "input input-bordered w-full max-w-xs",
        "value": this.resetTime.toString(),
        "ref": (ref2) => {
          console.log("outer:", ref2);
        },
        "behaviors": ["a-behaviors:focus"],
        "behaviorTag": {
          component: "input",
          name: "input"
        }
      }, {
        default: () => []
      })]
    });
  }
}) || _class$h) || _class$h);
var _dec$g, _dec2$g, _class$g;
const ZPage$7 = createZovaComponentAsync("home-base", "page");
let ControllerPageLegacy = (_dec$g = Controller(), _dec2$g = BeanInfo({
  module: "demo-basic"
}), _dec$g(_class$g = _dec2$g(_class$g = class ControllerPageLegacy2 extends BeanControllerPageBase {
  async __init__() {
  }
  render() {
    return createVNode(ZPage$7, null, {
      default: () => [createVNode("div", null, [createTextVNode("Legacy Vue3 composables/components can be used directly in Zova")]), createVNode(_sfc_main$1, null, null)]
    });
  }
}) || _class$g) || _class$g);
var _dec$f, _dec2$f, _class$f;
const ZPage$6 = createZovaComponentAsync("home-base", "page");
let ControllerPageLocale = (_dec$f = Controller(), _dec2$f = BeanInfo({
  module: "demo-basic"
}), _dec$f(_class$f = _dec2$f(_class$f = class ControllerPageLocale2 extends BeanControllerPageBase {
  async __init__() {
  }
  render() {
    return createVNode(ZPage$6, null, {
      default: () => [createVNode("div", null, [this.app.meta.locale.current, createTextVNode(":"), this.scope.locale.HelloWorld()]), createVNode("div", null, [this.scope.locale.HelloWorld()]), createVNode("button", {
        "class": "btn btn-primary",
        "onClick": () => {
          if (this.app.meta.locale.current === "en-us") {
            this.app.meta.locale.current = "zh-cn";
          } else {
            this.app.meta.locale.current = "en-us";
          }
        }
      }, [this.scope.locale.ChangeLanguage()])]
    });
  }
}) || _class$f) || _class$f);
var _dec$e, _dec2$e, _dec3$3, _dec4$3, _class$e, _class2$3, _descriptor$3;
function _initializerDefineProperty$3(e, i, r, l) {
  r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 });
}
function _applyDecoratedDescriptor$3(i, e, r, n, l) {
  var a = {};
  return Object.keys(n).forEach(function(i2) {
    a[i2] = n[i2];
  }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = true), a = r.slice().reverse().reduce(function(r2, n2) {
    return n2(i, e, r2) || r2;
  }, a), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a;
}
const ZPage$5 = createZovaComponentAsync("home-base", "page");
let ControllerPagePinia = (_dec$e = Controller(), _dec2$e = BeanInfo({
  module: "demo-basic"
}), _dec3$3 = Use(), _dec4$3 = Reflect.metadata("design:type", typeof StoreCounter === "undefined" ? Object : StoreCounter), _dec$e(_class$e = _dec2$e(_class$e = (_class2$3 = class ControllerPagePinia2 extends BeanControllerPageBase {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty$3(this, "$$counter", _descriptor$3, this);
  }
  async __init__() {
  }
  render() {
    return createVNode(ZPage$5, null, {
      default: () => [createVNode("div", null, [`count: ${this.$$counter.count}`]), createVNode("div", null, [`doubleCount: ${this.$$counter.doubleCount}`]), createVNode("div", null, [`name: ${this.$$counter.name}`]), createVNode("button", {
        "class": "btn btn-primary",
        "onClick": () => {
          this.$$counter.increment();
        }
      }, [createTextVNode("Increment")])]
    });
  }
}, _descriptor$3 = _applyDecoratedDescriptor$3(_class2$3.prototype, "$$counter", [_dec3$3, _dec4$3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2$3)) || _class$e) || _class$e);
var _dec$d, _dec2$d, _class$d;
const ZPage$4 = createZovaComponentAsync("home-base", "page");
const ControllerPageRouteParamsSchemaParams = object({
  id: number().optional().default(0)
});
const ControllerPageRouteParamsSchemaQuery = object({});
let ControllerPageRouteParams = (_dec$d = Controller(), _dec2$d = BeanInfo({
  module: "demo-basic"
}), _dec$d(_class$d = _dec2$d(_class$d = class ControllerPageRouteParams2 extends BeanControllerPageBase {
  async __init__() {
  }
  render() {
    return createVNode(ZPage$4, null, {
      default: () => [this.$pageRoute?.fullPath, createVNode("div", {
        "class": "overflow-x-auto"
      }, [createVNode("table", {
        "class": "table"
      }, [createVNode("thead", null, [createVNode("tr", null, [createVNode("th", null, [createTextVNode("Name")]), createVNode("th", null, [createTextVNode("Value")]), createVNode("th", null, [createTextVNode("Type")])])]), createVNode("tbody", null, [createVNode("tr", null, [createVNode("td", null, [createTextVNode("$params.id")]), createVNode("td", null, [this.$params.id]), createVNode("td", null, [typeof this.$params.id])])])]), createVNode("button", {
        "class": "btn btn-primary",
        "onClick": () => {
          const id = this.$params.id + 1;
          const url = this.$router.getPagePath("/demo/basic/routeParams/:id?", {
            params: {
              id
            }
          });
          this.$router.push(url);
        }
      }, [createTextVNode("Go to current page with different params value")])])]
    });
  }
}) || _class$d) || _class$d);
var _dec$c, _dec2$c, _class$c;
const ZPage$3 = createZovaComponentAsync("home-base", "page");
const ControllerPageRouteQuerySchemaParams = object({});
const ControllerPageRouteQuerySchemaQuery = object({
  name: string().optional(),
  age: number().optional()
});
let ControllerPageRouteQuery = (_dec$c = Controller(), _dec2$c = BeanInfo({
  module: "demo-basic"
}), _dec$c(_class$c = _dec2$c(_class$c = class ControllerPageRouteQuery2 extends BeanControllerPageBase {
  async __init__() {
  }
  render() {
    return createVNode(ZPage$3, null, {
      default: () => [createVNode("div", {
        "class": "overflow-x-auto"
      }, [createVNode("table", {
        "class": "table"
      }, [createVNode("thead", null, [createVNode("tr", null, [createVNode("th", null, [createTextVNode("Name")]), createVNode("th", null, [createTextVNode("Value")]), createVNode("th", null, [createTextVNode("Type")])])]), createVNode("tbody", null, [createVNode("tr", null, [createVNode("td", null, [createTextVNode("$query.name")]), createVNode("td", null, [this.$query.name]), createVNode("td", null, [typeof this.$query.name])]), createVNode("tr", null, [createVNode("td", null, [createTextVNode("$query.age")]), createVNode("td", null, [this.$query.age]), createVNode("td", null, [typeof this.$query.age])])])]), createVNode("button", {
        "class": "btn btn-primary",
        "onClick": () => {
          const name = this.$query.name === "tom" ? "kevin" : "tom";
          const age = (this.$query.age ?? 0) + 1;
          const url = this.$router.getPagePath("/demo/basic/routeQuery", {
            query: {
              name,
              age
            }
          });
          this.$router.push(url);
        }
      }, [createTextVNode("Go to current page with different query value")])])]
    });
  }
}) || _class$c) || _class$c);
var _dec$b, _dec2$b, _class$b;
const ZPage$2 = createZovaComponentAsync("home-base", "page");
const ControllerPageRouteQueryBSchemaParams = object({});
const ControllerPageRouteQueryBSchemaQuery = object({
  tabName: string().optional().default("boolean"),
  private: boolean().optional(),
  user: object({
    name: string(),
    age: number()
  }).optional(),
  todos: array(object({
    title: string(),
    done: boolean()
  })).optional()
});
let ControllerPageRouteQueryB = (_dec$b = Controller(), _dec2$b = BeanInfo({
  module: "demo-basic"
}), _dec$b(_class$b = _dec2$b(_class$b = class ControllerPageRouteQueryB2 extends BeanControllerPageBase {
  togglePrivate() {
    const _private = !this.$query.private;
    const query = {
      ...this.$query,
      private: _private
    };
    const url = this.$router.getPagePath("/demo/basic/routeQueryB", {
      query
    });
    this.$router.push(url);
  }
  toggleUser() {
    const user = this.$query.user?.name === "tom" ? {
      name: "kevin",
      age: 18
    } : {
      name: "tom",
      age: 6
    };
    const query = {
      ...this.$query,
      user
    };
    const url = this.$router.getPagePath("/demo/basic/routeQueryB", {
      query
    });
    this.$router.push(url);
  }
  toggleTodos() {
    const todo = (this.$query.todos?.length ?? 0) % 2 === 0 ? {
      title: "Running",
      done: false
    } : {
      title: "Eating",
      done: true
    };
    const todos = this.$query.todos ? [todo].concat(this.$query.todos) : [todo];
    const query = {
      ...this.$query,
      todos
    };
    const url = this.$router.getPagePath("/demo/basic/routeQueryB", {
      query
    });
    this.$router.push(url);
  }
  toggleTab(event, tabName) {
    const checked = event.target.checked;
    if (!checked) return;
    const query = {
      ...this.$query,
      tabName
    };
    const url = this.$router.getPagePath("/demo/basic/routeQueryB", {
      query
    });
    this.$router.push(url);
  }
  render() {
    return createVNode(ZPage$2, null, {
      default: () => [createVNode("div", {
        "role": "tablist",
        "class": "tabs tabs-lifted"
      }, [createVNode("input", {
        "type": "radio",
        "name": "my_tabs_2",
        "role": "tab",
        "class": "tab",
        "aria-label": "boolean",
        "checked": this.$query.tabName === "boolean",
        "onChange": (event) => {
          this.toggleTab(event, "boolean");
        }
      }, null), createVNode("div", {
        "role": "tabpanel",
        "class": "tab-content bg-base-100 border-base-300 rounded-box p-6"
      }, [createVNode("div", {
        "class": "card bg-base-100 w-96 shadow-xl"
      }, [createVNode("div", {
        "class": "card-body"
      }, [createVNode("h2", {
        "class": "card-title"
      }, [createTextVNode("$query.private")]), createVNode("table", {
        "class": "table"
      }, [createVNode("thead", null, [createVNode("tr", null, [createVNode("th", null, [createTextVNode("Name")]), createVNode("th", null, [createTextVNode("Value")]), createVNode("th", null, [createTextVNode("Type")])])]), createVNode("tbody", null, [createVNode("tr", null, [createVNode("td", null, [createTextVNode("$query.private")]), createVNode("td", null, [this.$query.private?.toString()]), createVNode("td", null, [typeof this.$query.private])])])]), createVNode("div", {
        "class": "card-actions justify-end"
      }, [createVNode("button", {
        "class": "btn btn-primary",
        "onClick": () => {
          this.togglePrivate();
        }
      }, [createTextVNode("Go to current page with different private value")])])])])]), createVNode("input", {
        "type": "radio",
        "name": "my_tabs_2",
        "role": "tab",
        "class": "tab",
        "aria-label": "json",
        "checked": this.$query.tabName === "json",
        "onChange": (event) => {
          this.toggleTab(event, "json");
        }
      }, null), createVNode("div", {
        "role": "tabpanel",
        "class": "tab-content bg-base-100 border-base-300 rounded-box p-6"
      }, [createVNode("div", {
        "class": "card bg-base-100 w-96 shadow-xl"
      }, [createVNode("div", {
        "class": "card-body"
      }, [createVNode("h2", {
        "class": "card-title"
      }, [createTextVNode("$query.user")]), createVNode("table", {
        "class": "table"
      }, [createVNode("thead", null, [createVNode("tr", null, [createVNode("th", null, [createTextVNode("Name")]), createVNode("th", null, [createTextVNode("Value")]), createVNode("th", null, [createTextVNode("Type")])])]), createVNode("tbody", null, [createVNode("tr", null, [createVNode("td", null, [createTextVNode("$query.user?.name")]), createVNode("td", null, [this.$query.user?.name]), createVNode("td", null, [typeof this.$query.user?.name])]), createVNode("tr", null, [createVNode("td", null, [createTextVNode("$query.user?.age")]), createVNode("td", null, [this.$query.user?.age]), createVNode("td", null, [typeof this.$query.user?.age])])])]), createVNode("div", {
        "class": "card-actions justify-end"
      }, [createVNode("button", {
        "class": "btn btn-primary",
        "onClick": () => {
          this.toggleUser();
        }
      }, [createTextVNode("Go to current page with different user value")])])])])]), createVNode("input", {
        "type": "radio",
        "name": "my_tabs_2",
        "role": "tab",
        "class": "tab",
        "aria-label": "array",
        "checked": this.$query.tabName === "array",
        "onChange": (event) => {
          this.toggleTab(event, "array");
        }
      }, null), createVNode("div", {
        "role": "tabpanel",
        "class": "tab-content bg-base-100 border-base-300 rounded-box p-6"
      }, [createVNode("div", {
        "class": "card bg-base-100 w-96 shadow-xl"
      }, [createVNode("div", {
        "class": "card-body"
      }, [createVNode("h2", {
        "class": "card-title"
      }, [createTextVNode("$query.todos")]), createVNode("table", {
        "class": "table"
      }, [createVNode("thead", null, [createVNode("tr", null, [createVNode("th", null, [createTextVNode("Title")]), createVNode("th", null, [createTextVNode("Done")])])]), createVNode("tbody", null, [this.$query.todos?.map((item) => {
        return createVNode("tr", null, [createVNode("td", null, [item.title]), createVNode("td", null, [createVNode("input", {
          "type": "checkbox",
          "checked": item.done,
          "class": "checkbox checkbox-success"
        }, null)])]);
      })])]), createVNode("div", {
        "class": "card-actions justify-end"
      }, [createVNode("button", {
        "class": "btn btn-primary",
        "onClick": () => {
          this.toggleTodos();
        }
      }, [createTextVNode("Go to current page with different todos value")])])])])])])]
    });
  }
}) || _class$b) || _class$b);
var _dec$a, _dec2$a, _class$a;
const ZPage$1 = createZovaComponentAsync("home-base", "page");
let ControllerPageState = (_dec$a = Controller(), _dec2$a = BeanInfo({
  module: "demo-basic"
}), _dec$a(_class$a = _dec2$a(_class$a = class ControllerPageState2 extends BeanControllerPageBase {
  constructor(...args) {
    super(...args);
    this.count = 0;
    this.count2 = void 0;
  }
  async __init__() {
    this.count2 = useComputed(() => {
      return `=== ${this.count} ===`;
    });
  }
  increment() {
    this.count++;
  }
  decrement() {
    this.count--;
  }
  render() {
    return createVNode(ZPage$1, null, {
      default: () => [createVNode("div", null, [`count(ref): ${this.count}`]), createVNode("div", null, [`count(computed): ${this.count2}`]), createVNode("button", {
        "class": "btn btn-primary",
        "onClick": () => this.increment()
      }, [createTextVNode("Increment")]), createVNode("button", {
        "class": "btn btn-secondary",
        "onClick": () => this.decrement()
      }, [createTextVNode("Decrement")])]
    });
  }
}) || _class$a) || _class$a);
var _dec$9, _dec2$9, _class$9;
const ZPage = createZovaComponentAsync("home-base", "page");
let ControllerPageStyle = (_dec$9 = Controller(), _dec2$9 = BeanInfo({
  module: "demo-basic"
}), _dec$9(_class$9 = _dec2$9(_class$9 = class ControllerPageStyle2 extends BeanControllerPageBase {
  constructor(...args) {
    super(...args);
    this.active = void 0;
    this.cTextColor = void 0;
    this.cBlock = void 0;
    this.renderHello = void 0;
    this.renderHello2 = void 0;
  }
  async __init__() {
    this.cTextColor = useComputed(() => {
      return this.$style({
        color: this.active ? this.$token.color.primary : ""
      });
    });
    this.cBlock = useComputed(() => {
      return this.$style({
        padding: "8px"
      });
    });
    this.renderHello = createVNode("div", {
      "class": this.cTextColor
    }, [createTextVNode("Hello World")]);
    this.renderHello2 = useComputed(() => {
      return createVNode("div", {
        "class": this.cTextColor
      }, [createTextVNode("Hello World")]);
    });
  }
  render() {
    return createVNode(ZPage, null, {
      default: () => [createVNode("hr", null, null), createVNode("div", {
        "class": this.cTextColor
      }, [createTextVNode("Hello World")]), this.renderHello, this.renderHello2, createVNode("button", {
        "class": "btn btn-primary",
        "onClick": () => {
          this.active = !this.active;
        }
      }, [createTextVNode("Switch Active")]), createVNode("hr", null, null), createVNode("div", {
        "class": this.$css.textCenter
      }, [createVNode("div", null, [createTextVNode("$css.textCenter")]), createVNode("button", {
        "class": this.$css.buttonPrimary
      }, [`$token.color.primary: ${this.$token.color.primary}`]), createVNode("hr", null, null), createVNode("div", {
        "class": this.cBlock
      }, [createVNode("div", null, [`dark: ${String(this.$theme.dark)}`]), createVNode("div", null, [`dark mode: ${String(this.$theme.darkMode)}`]), createVNode("div", null, [createVNode("select", {
        "class": "select select-bordered w-full max-w-xs",
        "onChange": async (e) => {
          const target = e.target;
          const value = target.value;
          const darkMode = value === "auto" ? value : value === "true";
          this.$theme.darkMode = darkMode;
        }
      }, [createVNode("option", {
        "value": false,
        "selected": this.$theme.darkMode === false
      }, [createTextVNode("Light")]), createVNode("option", {
        "value": true,
        "selected": this.$theme.darkMode === true
      }, [createTextVNode("Dark")]), createVNode("option", {
        "value": "auto",
        "selected": this.$theme.darkMode === "auto"
      }, [createTextVNode("Auto")])])]), createVNode("hr", null, null), createVNode("div", {
        "style": {
          color: this.$token.color.primary
        }
      }, [createTextVNode("theme:"), this.$theme.name]), createVNode("div", null, [createVNode("select", {
        "class": "select select-bordered w-full max-w-xs",
        "onChange": async (e) => {
          const target = e.target;
          this.$theme.name = target.value;
        }
      }, [createVNode("option", {
        "value": $getThemeName("home-base:default"),
        "selected": this.$theme.name === $getThemeName("home-base:default")
      }, [createTextVNode("Default")]), createVNode("option", {
        "value": $getThemeName("demo-basic:orange"),
        "selected": this.$theme.name === $getThemeName("demo-basic:orange")
      }, [createTextVNode("Orange")])])])])])]
    });
  }
}) || _class$9) || _class$9);
var _dec$8, _dec2$8, _dec3$2, _dec4$2, _class$8, _class2$2, _descriptor$2;
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
const ControllerPageToolOneSchemaParams = object({
  id: number().optional()
});
const ControllerPageToolOneSchemaQuery = object({
  name: string().optional()
});
let ControllerPageToolOne = (_dec$8 = Controller(), _dec2$8 = BeanInfo({
  module: "demo-basic"
}), _dec3$2 = Use(), _dec4$2 = Reflect.metadata("design:type", typeof ModelTest === "undefined" ? Object : ModelTest), _dec$8(_class$8 = _dec2$8(_class$8 = (_class2$2 = class ControllerPageToolOne2 extends BeanControllerPageFormBase {
  constructor(...args) {
    super(...args);
    this.schemaUpdate = void 0;
    _initializerDefineProperty$2(this, "$$modelTest", _descriptor$2, this);
    this.controllerForm = void 0;
    this.fieldName = "name";
    this.formData = void 0;
    this.formMeta = void 0;
  }
  async __init__() {
    const apiSchemas = this.$apiSchema.testSsrToolOne.test();
    const querySdk = await $QueryAutoLoad(() => apiSchemas.sdk);
    this.schemaUpdate = this.$useComputed(() => {
      const schema = apiSchemas.requestBody;
      console.log("schema: ", schema);
      return schema;
    });
    console.log("sdk: ", querySdk?.data);
    this.formData = {
      name: "tom"
    };
    this.formMeta = {
      formMode: "edit",
      editMode: "update"
    };
  }
  async onSubmit(data) {
    console.log("submit auto: ", JSON.stringify(data.value));
    this.formData = data.value;
  }
}, _descriptor$2 = _applyDecoratedDescriptor$2(_class2$2.prototype, "$$modelTest", [_dec3$2, _dec4$2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2$2)) || _class$8) || _class$8);
var _dec$7, _dec2$7, _dec3$1, _dec4$1, _class$7, _class2$1, _descriptor$1;
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
const ControllerPageToolTwoSchemaParams = object({
  id: number().optional()
});
const ControllerPageToolTwoSchemaQuery = object({
  name: string().optional()
});
let ControllerPageToolTwo = (_dec$7 = Controller(), _dec2$7 = BeanInfo({
  module: "demo-basic"
}), _dec3$1 = Use("a-router.model.pageData"), _dec4$1 = Reflect.metadata("design:type", typeof ModelPageData === "undefined" ? Object : ModelPageData), _dec$7(_class$7 = _dec2$7(_class$7 = (_class2$1 = class ControllerPageToolTwo2 extends BeanControllerPageBase {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty$1(this, "$$modelPageData", _descriptor$1, this);
  }
  async __init__() {
  }
  render() {
    const pageData = this.$$modelPageData.current;
    return createVNode("div", null, [createVNode("div", null, [`id: ${pageData?.id}`]), createVNode("div", null, [`name: ${pageData?.name}`]), createVNode("div", null, [`married: ${pageData?.married}`]), createVNode(RouterLink, {
      "to": this.sys.env.ROUTER_PAGE_HOME
    }, {
      default: () => [createTextVNode("Go Home")]
    })]);
  }
}, _descriptor$1 = _applyDecoratedDescriptor$1(_class2$1.prototype, "$$modelPageData", [_dec3$1, _dec4$1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2$1)) || _class$7) || _class$7);
const ZPageComponent = createZovaComponentPage(ControllerPageComponent, void 0, void 0);
const ZPageLegacy = createZovaComponentPage(ControllerPageLegacy, void 0, void 0);
const ZPageLocale = createZovaComponentPage(ControllerPageLocale, void 0, void 0);
const ZPagePinia = createZovaComponentPage(ControllerPagePinia, void 0, void 0);
let NSControllerPageRouteParams;
(function(_NSControllerPageRouteParams) {
  _NSControllerPageRouteParams.paramsSchema = ControllerPageRouteParamsSchemaParams;
  _NSControllerPageRouteParams.querySchema = ControllerPageRouteParamsSchemaQuery;
})(NSControllerPageRouteParams || (NSControllerPageRouteParams = {}));
const ZPageRouteParams = createZovaComponentPage(ControllerPageRouteParams, void 0, void 0);
let NSControllerPageRouteQuery;
(function(_NSControllerPageRouteQuery) {
  _NSControllerPageRouteQuery.paramsSchema = ControllerPageRouteQuerySchemaParams;
  _NSControllerPageRouteQuery.querySchema = ControllerPageRouteQuerySchemaQuery;
})(NSControllerPageRouteQuery || (NSControllerPageRouteQuery = {}));
const ZPageRouteQuery = createZovaComponentPage(ControllerPageRouteQuery, void 0, void 0);
let NSControllerPageRouteQueryB;
(function(_NSControllerPageRouteQueryB) {
  _NSControllerPageRouteQueryB.paramsSchema = ControllerPageRouteQueryBSchemaParams;
  _NSControllerPageRouteQueryB.querySchema = ControllerPageRouteQueryBSchemaQuery;
})(NSControllerPageRouteQueryB || (NSControllerPageRouteQueryB = {}));
const ZPageRouteQueryB = createZovaComponentPage(ControllerPageRouteQueryB, void 0, void 0);
const ZPageState = createZovaComponentPage(ControllerPageState, void 0, void 0);
const ZPageStyle = createZovaComponentPage(ControllerPageStyle, void 0, void 0);
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock(Fragment, null, [
    renderSlot(_ctx.$slots, "header"),
    renderSlot(_ctx.$slots, "default"),
    renderSlot(_ctx.$slots, "footer")
  ], 64);
}
const FormFieldTest = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
var _dec$6, _dec2$6, _class$6;
const ZFormSubscribe = createZovaComponentAsync("a-form", "formSubscribe");
const ZFormField = createZovaComponentAsync("a-form", "formField");
const ZForm = createZovaComponentAsync("a-form", "form");
let RenderPageToolOne = (_dec$6 = Render(), _dec2$6 = BeanInfo({
  module: "demo-basic"
}), _dec$6(_class$6 = _dec2$6(_class$6 = class RenderPageToolOne2 extends BeanRenderBase {
  _renderAuto() {
    return createVNode("div", null, [createVNode(ZForm, {
      "controllerRef": (ref2) => {
        this.controllerForm = ref2;
      },
      "data": this.formData,
      "schema": this.schemaUpdate,
      "formMeta": this.formMeta,
      "onSubmitData": (data) => this.onSubmit(data),
      "onShowError": ({
        error
      }) => {
        window.alert(error.message);
      },
      "slotFooter": ($$form) => {
        return createVNode("div", null, [$$form.formState.isSubmitting && createVNode("span", {
          "class": "loading loading-spinner text-primary"
        }, null), this.formMeta.formMode === "edit" && createVNode("button", {
          "class": classes("btn btn-primary", $$form.formState.isSubmitting && "btn-disabled"),
          "onClick": async () => {
            await $$form.submit();
          }
        }, [this.scope.locale.Submit()])]);
      }
    }, null)]);
  }
  _renderManual() {
    return createVNode(ZForm, {
      "data": this.formData,
      "onSubmitData": (data) => this.onSubmit(data)
    }, {
      default: () => [createVNode(ZFormField, {
        "name": "name",
        "label": `${this.scope.locale.YourName()}:`,
        "validateOnDynamic": string().min(3)
      }, null), createVNode(ZFormField, {
        "name": "name",
        "slotDefault": ({
          props
        }) => {
          return createVNode("input", {
            "name": props.name,
            "value": props.value,
            "onInput": props.onInput,
            "onBlur": props.onBlur
          }, null);
        }
      }, null), createVNode(ZFormField, {
        "name": "name"
      }, {
        default: () => [createVNode("span", null, [createTextVNode("span: name")])]
      }), createVNode(FormFieldTest, null, {
        header: () => createVNode("div", null, [createTextVNode("--- Header Slot ---")]),
        default: () => createVNode("div", null, [createTextVNode("--- Default Slot ---")]),
        footer: () => createVNode("div", null, [createTextVNode("--- Footer Slot ---")])
      }), createVNode(ZFormSubscribe, {
        "slotDefault": ($$form) => {
          return createVNode("button", {
            "disabled": $$form.formState.isSubmitting,
            "type": "submit",
            "class": "btn btn-primary"
          }, [createTextVNode("Submit")]);
        }
      }, null)]
    });
  }
  render() {
    return createVNode("div", null, [createVNode("div", null, [this._renderAuto()]), createVNode("div", null, [createTextVNode("------------------------------------")]), createVNode("div", null, [this._renderManual()])]);
  }
}) || _class$6) || _class$6);
let NSControllerPageToolOne;
(function(_NSControllerPageToolOne) {
  _NSControllerPageToolOne.paramsSchema = ControllerPageToolOneSchemaParams;
  _NSControllerPageToolOne.querySchema = ControllerPageToolOneSchemaQuery;
})(NSControllerPageToolOne || (NSControllerPageToolOne = {}));
const ZPageToolOne = createZovaComponentPage(ControllerPageToolOne, RenderPageToolOne, void 0);
let NSControllerPageToolTwo;
(function(_NSControllerPageToolTwo) {
  _NSControllerPageToolTwo.paramsSchema = ControllerPageToolTwoSchemaParams;
  _NSControllerPageToolTwo.querySchema = ControllerPageToolTwoSchemaQuery;
})(NSControllerPageToolTwo || (NSControllerPageToolTwo = {}));
const ZPageToolTwo = createZovaComponentPage(ControllerPageToolTwo, void 0, void 0);
const routes = [{
  path: "state",
  component: ZPageState
}, {
  path: "component",
  component: ZPageComponent
}, {
  path: "locale",
  component: ZPageLocale
}, {
  path: "style",
  component: ZPageStyle
}, {
  path: "pinia",
  component: ZPagePinia
}, {
  path: "routeQuery",
  component: ZPageRouteQuery
}, {
  name: "routeParams",
  path: "routeParams/:id?",
  component: ZPageRouteParams,
  meta: {
    componentKeyMode: "nameOnly"
  }
}, {
  path: "routeQueryB",
  component: ZPageRouteQueryB
}, {
  path: "legacy",
  component: ZPageLegacy
}, {
  name: "toolOne",
  path: "toolOne/:id?",
  component: ZPageToolOne
}, {
  name: "toolTwo",
  path: "toolTwo/:id?",
  component: ZPageToolTwo,
  meta: {
    layout: "empty",
    requiresAuth: false
  }
}];
const ZActionView = defineComponent((_props) => {
  useController(ControllerActionView, void 0, void 0);
  return () => {
  };
}, prepareComponentOptions());
const ZCard = defineComponent((_props) => {
  useController(ControllerCard, void 0, void 0);
  return () => {
  };
}, prepareComponentOptions());
const ZFormFieldTest = defineComponent((_props) => {
  useController(ControllerFormFieldTest, void 0, void 0);
  return () => {
  };
}, prepareComponentOptions(ControllerFormFieldTest.$componentOptions));
const ZTableCellTest = defineComponent((_props) => {
  useController(ControllerTableCellTest, void 0, void 0);
  return () => {
  };
}, prepareComponentOptions());
var _dec$5, _dec2$5, _class$5;
let AopHome = (_dec$5 = Aop({
  match: "home-index.controller.pageHome"
}), _dec2$5 = BeanInfo({
  module: "demo-basic"
}), _dec$5(_class$5 = _dec2$5(_class$5 = class AopHome2 extends BeanAopBase {
  constructor(...args) {
    super(...args);
    this.__init__ = async (_args, next, receiver) => {
      await next();
      receiver.message += "!";
      polyfillDispose(receiver);
    };
    this.__dispose__ = (_args, next, receiver) => {
      receiver.message = receiver.message.substring(0, receiver.message.length - 1);
      next();
    };
    this.render = (_args, next, _receiver) => {
      const result = next();
      return createVNode("div", {
        "class": "aop-home"
      }, [result]);
    };
  }
}) || _class$5) || _class$5);
var _dec$4, _dec2$4, _class$4;
let AopHome3 = (_dec$4 = Aop({
  match: /home-index\.controller\.pageHome/,
  dependencies: "demo-basic:home"
}), _dec2$4 = BeanInfo({
  module: "demo-basic"
}), _dec$4(_class$4 = _dec2$4(_class$4 = class AopHome32 extends BeanAopBase {
  constructor(...args) {
    super(...args);
    this.render = (_args, next, _receiver) => {
      const result = next();
      return createVNode("div", {
        "class": "aop-home-3"
      }, [result]);
    };
  }
}) || _class$4) || _class$4);
var _dec$3, _dec2$3, _dec3, _dec4, _class$3, _class2, _descriptor;
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
let BehaviorFormFieldLayout = (_dec$3 = Behavior(), _dec2$3 = BeanInfo({
  module: "demo-basic"
}), _dec3 = Use({
  injectionScope: "host"
}), _dec4 = Reflect.metadata("design:type", typeof ControllerFormField === "undefined" ? Object : ControllerFormField), _dec$3(_class$3 = _dec2$3(_class$3 = (_class2 = class BehaviorFormFieldLayout2 extends BeanBehaviorBase {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "$$formField", _descriptor, this);
  }
  render(_props, next) {
    const field = this.$$formField.field;
    const vnode = next();
    return createVNode(Fragment, null, [createVNode("label", {
      "htmlFor": field.api.name
    }, [this.$options.label]), vnode]);
  }
}, _descriptor = _applyDecoratedDescriptor(_class2.prototype, "$$formField", [_dec3, _dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2)) || _class$3) || _class$3);
var _dec$2, _dec2$2, _class$2;
let ThemeOrange = (_dec$2 = Theme(), _dec2$2 = BeanInfo({
  module: "demo-basic"
}), _dec$2(_class$2 = _dec2$2(_class$2 = class ThemeOrange2 extends BeanThemeBase {
  async apply({
    name,
    dark
  }) {
    const token = {
      color: {
        primary: "#f28238"
      },
      var: {
        borderColor: "#f28d49"
      },
      component: {
        page: {
          background: dark ? "oklch(25.33% 0.016 252.42)" : "#fff",
          color: dark ? "#fff" : "#000"
        }
      }
    };
    return {
      token: this.mergeOptionsToken({
        name,
        dark
      }, token)
    };
  }
}) || _class$2) || _class$2);
var _dec$1, _dec2$1, _class$1;
const ZIcon = createZovaComponentAsync("a-icon", "icon");
let TableCellTest = (_dec$1 = TableCell({
  iconPrefix: "::home"
}), _dec2$1 = BeanInfo({
  module: "demo-basic"
}), _dec$1(_class$1 = _dec2$1(_class$1 = class TableCellTest2 extends BeanBase {
  render(options, _renderContext, next) {
    const value = next();
    const iconPrefix = options.iconPrefix;
    if (!iconPrefix) return value;
    return createVNode("div", null, [createVNode(ZIcon, {
      "name": iconPrefix
    }, null), createVNode("span", null, [value])]);
  }
}) || _class$1) || _class$1);
var _dec, _dec2, _class;
const pagePathSchemas = {
  "/demo/basic/routeQuery": {
    query: NSControllerPageRouteQuery.querySchema
  },
  "/demo/basic/routeQueryB": {
    query: NSControllerPageRouteQueryB.querySchema
  }
};
const pageNameSchemas = {
  "demo-basic:routeParams": {
    params: NSControllerPageRouteParams.paramsSchema,
    query: NSControllerPageRouteParams.querySchema
  },
  "demo-basic:toolOne": {
    params: NSControllerPageToolOne.paramsSchema,
    query: NSControllerPageToolOne.querySchema
  },
  "demo-basic:toolTwo": {
    params: NSControllerPageToolTwo.paramsSchema,
    query: NSControllerPageToolTwo.querySchema
  }
};
const components = {
  "actionView": ZActionView,
  "card": ZCard,
  "formFieldTest": ZFormFieldTest,
  "tableCellTest": ZTableCellTest
};
let ScopeModuleDemoBasic = (_dec = Scope(), _dec2 = BeanInfo({
  module: "demo-basic"
}), _dec(_class = _dec2(_class = class ScopeModuleDemoBasic2 extends BeanScopeBase {
}) || _class) || _class);
function locale(key) {
  return `demo-basic::${key}`;
}
const locale_en_us = {
  HelloWorld: "Hello World",
  ChangeLanguage: "Change Language",
  YourName: "Your Name",
  Submit: "Submit"
};
const locale_zh_cn = {
  HelloWorld: "您好世界",
  ChangeLanguage: "切换语言",
  YourName: "您的名称",
  Submit: "提交"
};
const locales = {
  "en-us": locale_en_us,
  "zh-cn": locale_zh_cn
};
function $useLocale(key, ...args) {
  const app = useApp();
  const str = `demo-basic::${key}`;
  return useComputed(() => {
    return app.meta.text(str, ...args);
  });
}
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  $useLocale,
  AopHome,
  AopHome3,
  BehaviorFormFieldLayout,
  ControllerActionView,
  ControllerCard,
  ControllerFormFieldTest,
  ControllerPageComponent,
  ControllerPageLegacy,
  ControllerPageLocale,
  ControllerPagePinia,
  ControllerPageRouteParams,
  ControllerPageRouteParamsSchemaParams,
  ControllerPageRouteParamsSchemaQuery,
  ControllerPageRouteQuery,
  ControllerPageRouteQueryB,
  ControllerPageRouteQueryBSchemaParams,
  ControllerPageRouteQueryBSchemaQuery,
  ControllerPageRouteQuerySchemaParams,
  ControllerPageRouteQuerySchemaQuery,
  ControllerPageState,
  ControllerPageStyle,
  ControllerPageToolOne,
  ControllerPageToolOneSchemaParams,
  ControllerPageToolOneSchemaQuery,
  ControllerPageToolTwo,
  ControllerPageToolTwoSchemaParams,
  ControllerPageToolTwoSchemaQuery,
  ControllerTableCellTest,
  ModelTest,
  get NSControllerPageRouteParams() {
    return NSControllerPageRouteParams;
  },
  get NSControllerPageRouteQuery() {
    return NSControllerPageRouteQuery;
  },
  get NSControllerPageRouteQueryB() {
    return NSControllerPageRouteQueryB;
  },
  get NSControllerPageToolOne() {
    return NSControllerPageToolOne;
  },
  get NSControllerPageToolTwo() {
    return NSControllerPageToolTwo;
  },
  RenderPageToolOne,
  ScopeModuleDemoBasic,
  StoreCounter,
  TableCellTest,
  ThemeOrange,
  ZActionView,
  ZCard,
  ZFormFieldTest,
  ZPageComponent,
  ZPageLegacy,
  ZPageLocale,
  ZPagePinia,
  ZPageRouteParams,
  ZPageRouteQuery,
  ZPageRouteQueryB,
  ZPageState,
  ZPageStyle,
  ZPageToolOne,
  ZPageToolTwo,
  ZTableCellTest,
  components,
  locale,
  locales,
  pageNameSchemas,
  pagePathSchemas,
  routes
}, Symbol.toStringTag, { value: "Module" }));
export {
  _sfc_main$1 as _,
  index as i
};
