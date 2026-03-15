import { l as BeanInfo, n as BeanBase, L as BeanControllerBase, ab as Emit, ac as ModelValue, W as createZovaComponentAsync, Z as BeanControllerPageBase, U as Use, Y as BeanRenderBase, ad as BeanStyleBase, ae as createZovaComponentPage, M as prepareComponentOptions, N as useController, T as BeanAopMethodBase, B as BeanSimple, v as BeanScopeBase } from "./zova-QgocPMzS.js";
import { BeanApiBase, Api, ApiSchema } from "./a-api-DhA-gIeb.js";
import { Sys, Bean, Service, Controller, Render, Style, AopMethod, Scope } from "./a-bean-Bxu0OKjI.js";
import { P as createVNode, N as createTextVNode, a0 as withDirectives, a1 as vModelText, s as shallowReactive, m as markRaw, o as defineComponent, a2 as openBlock, a3 as createElementBlock } from "./vue-CRNsYCTs.js";
import { u as useForm } from "./tanstack-form-c5sVeo1k.js";
import { c as string } from "./zod-DcU_E_GK.js";
import "./commonjsHelper-CCIqAdii.js";
const OpenApiBaseURL = (sys) => {
  return sys.util.getOpenApiBaseURL("OPENAPI_BASE_URL_A_B");
};
var _dec$o, _dec2$o, _class$o;
const ApiApiTestSsrToolOnetestPath = "/api/test/ssr/toolOne/test/{id?}";
let ApiTestSsrToolOne = (_dec$o = Api(), _dec2$o = BeanInfo({
  module: "a-b"
}), _dec$o(_class$o = _dec2$o(_class$o = class ApiTestSsrToolOne2 extends BeanApiBase {
  test(body, options) {
    return this.$fetch.post(this.$pathTranslate(ApiApiTestSsrToolOnetestPath, options.params), body, this.$configPrepare(OpenApiBaseURL(this.sys), options, true));
  }
}) || _class$o) || _class$o);
var _dec$n, _dec2$n, _class$n;
let ApiSchemaTestSsrToolOne = (_dec$n = ApiSchema(), _dec2$n = BeanInfo({
  module: "a-b"
}), _dec$n(_class$n = _dec2$n(_class$n = class ApiSchemaTestSsrToolOne2 extends BeanBase {
  test(options) {
    return this.$sdk.createApiSchemas(ApiApiTestSsrToolOnetestPath, "post", options);
  }
}) || _class$n) || _class$n);
var _dec$m, _dec2$m, _class$m;
let SysTest = (_dec$m = Sys(), _dec2$m = BeanInfo({
  module: "a-b"
}), _dec$m(_class$m = _dec2$m(_class$m = class SysTest2 extends BeanBase {
  async __init__() {
  }
}) || _class$m) || _class$m);
var _dec$l, _dec2$l, _class$l;
let BeanTest = (_dec$l = Bean(), _dec2$l = BeanInfo({
  module: "a-b"
}), _dec$l(_class$l = _dec2$l(_class$l = class BeanTest2 extends BeanBase {
  async __init__() {
  }
}) || _class$l) || _class$l);
var _dec$k, _dec2$k, _class$k;
let ServiceTest = (_dec$k = Service(), _dec2$k = BeanInfo({
  module: "a-b"
}), _dec$k(_class$k = _dec2$k(_class$k = class ServiceTest2 extends BeanBase {
  async __init__() {
  }
}) || _class$k) || _class$k);
var _dec$j, _dec2$j, _class$j;
let ServiceTest3 = (_dec$j = Service(), _dec2$j = BeanInfo({
  module: "a-b"
}), _dec$j(_class$j = _dec2$j(_class$j = class ServiceTest32 extends BeanBase {
  async __init__() {
  }
}) || _class$j) || _class$j);
var _dec$i, _dec2$i, _class$i;
let ServiceTest4 = (_dec$i = Service(), _dec2$i = BeanInfo({
  module: "a-b"
}), _dec$i(_class$i = _dec2$i(_class$i = class ServiceTest42 extends BeanBase {
  async __init__() {
  }
}) || _class$i) || _class$i);
var _dec$h, _dec2$h, _class$h;
let ServiceTest6 = (_dec$h = Service(), _dec2$h = BeanInfo({
  module: "a-b"
}), _dec$h(_class$h = _dec2$h(_class$h = class ServiceTest62 extends BeanBase {
  async __init__() {
  }
}) || _class$h) || _class$h);
var _dec$g, _dec2$g, _class$g;
let ServiceTest7 = (_dec$g = Service(), _dec2$g = BeanInfo({
  module: "a-b"
}), _dec$g(_class$g = _dec2$g(_class$g = class ServiceTest72 extends BeanBase {
  async __init__(name) {
    console.log("name: ", name);
  }
}) || _class$g) || _class$g);
var _dec$f, _dec2$f, _dec3$3, _dec4$3, _dec5, _dec6, _dec7, _class$f, _class2$3, _descriptor$3, _ControllerCard;
function _initializerDefineProperty$3(e, i, r, l) {
  r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 });
}
function _applyDecoratedDescriptor$3(i, e, r, n, l) {
  var a = {};
  return Object.keys(n).forEach(function(i2) {
    a[i2] = n[i2];
  }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = true), a = r.slice().reverse().reduce(function(r2, n2) {
    return n2(i, e, r2) || r2;
  }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a;
}
let ControllerCard = (_dec$f = Controller(), _dec2$f = BeanInfo({
  module: "a-b"
}), _dec3$3 = Emit(), _dec4$3 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [Number]), _dec6 = ModelValue(), _dec7 = Reflect.metadata("design:type", Number), _dec$f(_class$f = _dec2$f(_class$f = (_class2$3 = (_ControllerCard = class ControllerCard2 extends BeanControllerBase {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty$3(this, "modelValue", _descriptor$3, this);
  }
  emitReset(value) {
    return value + 1;
  }
  // @ModelValue()
  // set modelValue(value: number) {
  //   // @ts-ignore set
  //   return modelSet(() => {
  //     if (this.$props.modelModifiers?.int) {
  //       if (typeof value === 'number') return value;
  //       return Number(value);
  //     }
  //     return value;
  //   });
  // }
  // get modelValue() {
  //   return modelGet(arguments, (value: number) => {
  //     return value;
  //   });
  // }
  async __init__() {
  }
  _render() {
    return createVNode("div", null, [createVNode("div", null, [`inner: ${this.modelValue}`]), createVNode("button", {
      "onClick": () => {
        this.modelValue++;
        this.emitReset(this.modelValue);
      }
    }, [createTextVNode("increment")]), withDirectives(createVNode("input", {
      "onUpdate:modelValue": ($event) => this.modelValue = $event
    }, null), [[vModelText, this.modelValue]])]);
  }
}, _ControllerCard.$propsDefault = {
  modelValue: 0
}, _ControllerCard), _applyDecoratedDescriptor$3(_class2$3.prototype, "emitReset", [_dec3$3, _dec4$3, _dec5], Object.getOwnPropertyDescriptor(_class2$3.prototype, "emitReset"), _class2$3.prototype), _descriptor$3 = _applyDecoratedDescriptor$3(_class2$3.prototype, "modelValue", [_dec6, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2$3)) || _class$f) || _class$f);
var _dec$e, _dec2$e, _class$e;
let ControllerCard3 = (_dec$e = Controller(), _dec2$e = BeanInfo({
  module: "a-b"
}), _dec$e(_class$e = _dec2$e(_class$e = class ControllerCard32 extends BeanControllerBase {
  async __init__() {
  }
  _render() {
    return null;
  }
}) || _class$e) || _class$e);
var _dec$d, _dec2$d, _class$d, _ControllerFormFieldTest$1;
const ZFormField$1 = createZovaComponentAsync("a-form", "formField");
let ControllerFormFieldTest = (_dec$d = Controller(), _dec2$d = BeanInfo({
  module: "a-b"
}), _dec$d(_class$d = _dec2$d(_class$d = (_ControllerFormFieldTest$1 = class ControllerFormFieldTest2 extends BeanControllerBase {
  async __init__() {
  }
  render() {
    return createVNode(ZFormField$1, this.$props, null);
  }
}, _ControllerFormFieldTest$1.$propsDefault = {}, _ControllerFormFieldTest$1.$componentOptions = {
  inheritAttrs: false
}, _ControllerFormFieldTest$1)) || _class$d) || _class$d);
var _dec$c, _dec2$c, _class$c, _ControllerFormFieldTest;
const ZFormField = createZovaComponentAsync("a-form", "formField");
let ControllerFormFieldTest3 = (_dec$c = Controller(), _dec2$c = BeanInfo({
  module: "a-b"
}), _dec$c(_class$c = _dec2$c(_class$c = (_ControllerFormFieldTest = class ControllerFormFieldTest32 extends BeanControllerBase {
  async __init__() {
  }
  render() {
    return createVNode(ZFormField, this.$props, null);
  }
}, _ControllerFormFieldTest.$propsDefault = {}, _ControllerFormFieldTest.$componentOptions = {
  inheritAttrs: false
}, _ControllerFormFieldTest)) || _class$c) || _class$c);
var _dec$b, _dec2$b, _dec3$2, _dec4$2, _class$b, _class2$2, _descriptor$2;
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
let ControllerPageTest = (_dec$b = Controller(), _dec2$b = BeanInfo({
  module: "a-b"
}), _dec3$2 = Use({
  selector: "cel://self.count"
}), _dec4$2 = Reflect.metadata("design:type", typeof ServiceTest7 === "undefined" ? Object : ServiceTest7), _dec$b(_class$b = _dec2$b(_class$b = (_class2$2 = class ControllerPageTest2 extends BeanControllerPageBase {
  constructor(...args) {
    super(...args);
    this.count = 5;
    _initializerDefineProperty$2(this, "$$serviceTest7", _descriptor$2, this);
    this.schemas = void 0;
    this.schemaTest = void 0;
  }
  async __init__() {
    this.schemas = shallowReactive({});
    this.schemaTest = this.$useComputed(() => {
      return this.schemas.test;
    });
    this.$onCreated(() => {
      console.log("onServerPrefetch1");
    });
    this.$onCreated(() => {
      console.log("onServerPrefetch2");
    });
    this.$onMounted(() => {
      console.log("onMounted");
    });
  }
}, _descriptor$2 = _applyDecoratedDescriptor$2(_class2$2.prototype, "$$serviceTest7", [_dec3$2, _dec4$2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2$2)) || _class$b) || _class$b);
var _dec$a, _dec2$a, _class$a;
let ControllerPageTest3 = (_dec$a = Controller(), _dec2$a = BeanInfo({
  module: "a-b"
}), _dec$a(_class$a = _dec2$a(_class$a = class ControllerPageTest32 extends BeanControllerPageBase {
  constructor(...args) {
    super(...args);
    this.form = void 0;
  }
  async __init__() {
    this.form = markRaw(useForm({
      defaultValues: {
        fullName: ""
      },
      onSubmit: async ({
        value
      }) => {
        console.log(value);
      }
    }));
  }
  render() {
    return createVNode("div", null, [createVNode("form", {
      "onSubmit": (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.form.handleSubmit();
      }
    }, [createVNode(this.form.Field, {
      "name": "fullName",
      "validators": {
        // onChange: ({ value }) => {
        //   if (!value || value.length < 3) return 'must > 3';
        // },
        onChange: string().min(3)
      }
    }, {
      default: ({
        field
      }) => {
        console.log(field.state.meta);
        return createVNode("input", {
          "name": field.name,
          "value": field.state.value,
          "onInput": (e) => field.handleChange(e.target.value)
        }, null);
      }
    }), createVNode("button", {
      "type": "submit"
    }, [createTextVNode("Submit")])])]);
  }
}) || _class$a) || _class$a);
var _dec$9, _dec2$9, _class$9;
let ControllerPageTest4 = (_dec$9 = Controller(), _dec2$9 = BeanInfo({
  module: "a-b"
}), _dec$9(_class$9 = _dec2$9(_class$9 = class ControllerPageTest42 extends BeanControllerPageBase {
  async __init__() {
  }
}) || _class$9) || _class$9);
var _dec$8, _dec2$8, _class$8;
let RenderPageTest3 = (_dec$8 = Render(), _dec2$8 = BeanInfo({
  module: "a-b"
}), _dec$8(_class$8 = _dec2$8(_class$8 = class RenderPageTest32 extends BeanRenderBase {
  render() {
  }
}) || _class$8) || _class$8);
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
let RenderPageTest = (_dec$7 = Render(), _dec2$7 = BeanInfo({
  module: "a-b"
}), _dec3$1 = Use(), _dec4$1 = Reflect.metadata("design:type", typeof RenderPageTest3 === "undefined" ? Object : RenderPageTest3), _dec$7(_class$7 = _dec2$7(_class$7 = (_class2$1 = class RenderPageTest2 extends BeanRenderBase {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty$1(this, "$$renderTest3", _descriptor$1, this);
  }
  render() {
    return createVNode("div", null, [createVNode("div", null, [JSON.stringify(this.schemaTest, null, 2)]), createVNode("div", null, [JSON.stringify(this.schemas.test2, null, 2)]), createVNode("button", {
      "onClick": () => {
        const a = this.schemas.test?.a ?? 0;
        this.schemas.test = {
          a
        };
      }
    }, [createTextVNode("scheme test")]), createVNode("button", {
      "onClick": () => {
        const b = this.schemas.test2?.b ?? 0;
        this.schemas.test2 = {
          b: b + 1
        };
      }
    }, [createTextVNode("schema test2")]), createVNode("div", null, [this.sys.env.APP_TITLE]), createVNode("div", null, [this.count]), createVNode("button", {
      "onClick": async () => {
        const url = "http://localhost:9000/demo/basic/routeParams/1?age=19";
        const route = await this.$router.resolveRoute(url);
        console.log("url", route);
      }
    }, [createTextVNode("test route resolve")]), createVNode(ZCard, {
      "modelValue": this.count,
      "onUpdate:modelValue": ($event) => this.count = $event,
      "onReset": (date) => {
        console.log("emit", date, this.count);
      }
    }, null)]);
  }
}, _descriptor$1 = _applyDecoratedDescriptor$1(_class2$1.prototype, "$$renderTest3", [_dec3$1, _dec4$1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2$1)) || _class$7) || _class$7);
var _dec$6, _dec2$6, _class$6;
let StylePageTest3 = (_dec$6 = Style(), _dec2$6 = BeanInfo({
  module: "a-b"
}), _dec$6(_class$6 = _dec2$6(_class$6 = class StylePageTest32 extends BeanStyleBase {
  async __init__() {
  }
}) || _class$6) || _class$6);
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
let StylePageTest = (_dec$5 = Style(), _dec2$5 = BeanInfo({
  module: "a-b"
}), _dec3 = Use(), _dec4 = Reflect.metadata("design:type", typeof StylePageTest3 === "undefined" ? Object : StylePageTest3), _dec$5(_class$5 = _dec2$5(_class$5 = (_class2 = class StylePageTest2 extends BeanStyleBase {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "$$styleTest3", _descriptor, this);
  }
  async __init__() {
  }
}, _descriptor = _applyDecoratedDescriptor(_class2.prototype, "$$styleTest3", [_dec3, _dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2)) || _class$5) || _class$5);
const ZPageTest = createZovaComponentPage(ControllerPageTest, RenderPageTest, StylePageTest);
const ZPageTest3 = createZovaComponentPage(ControllerPageTest3, void 0, void 0);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Button",
  props: {
    onPerform: Function
  },
  emits: ["click"],
  setup(__props, {
    emit: __emit
  }) {
    const props = __props;
    const emits = __emit;
    function onClick() {
      props.onPerform?.("onPerform");
      emits("click", "inner: onClick");
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("button", {
        class: "btn btn-primary",
        onClick
      }, " Click ");
    };
  }
});
var _dec$4, _dec2$4, _class$4;
let RenderPageTest4 = (_dec$4 = Render(), _dec2$4 = BeanInfo({
  module: "a-b"
}), _dec$4(_class$4 = _dec2$4(_class$4 = class RenderPageTest42 extends BeanRenderBase {
  render() {
    return createVNode(_sfc_main, {
      "onPerform": (message) => {
        console.log(message);
      },
      "onClick": (message) => {
        console.log("outer: ", message);
      }
    }, null);
  }
}) || _class$4) || _class$4);
const ZPageTest4 = createZovaComponentPage(ControllerPageTest4, RenderPageTest4, void 0);
const routes = [{
  path: "test",
  component: ZPageTest
}, {
  path: "test3",
  component: ZPageTest3
}, {
  path: "test4",
  component: ZPageTest4
}];
var _dec$3, _dec2$3, _class$3;
let RenderCard = (_dec$3 = Render(), _dec2$3 = BeanInfo({
  module: "a-b"
}), _dec$3(_class$3 = _dec2$3(_class$3 = class RenderCard2 extends BeanRenderBase {
  render() {
    return createVNode("div", null, [createTextVNode("Hello World")]);
  }
}) || _class$3) || _class$3);
const ZCard = defineComponent((_props) => {
  useController(ControllerCard, RenderCard, void 0);
  return () => {
  };
}, prepareComponentOptions());
var _dec$2, _dec2$2, _class$2;
let RenderCard3 = (_dec$2 = Render(), _dec2$2 = BeanInfo({
  module: "a-b"
}), _dec$2(_class$2 = _dec2$2(_class$2 = class RenderCard32 extends BeanRenderBase {
  render() {
  }
}) || _class$2) || _class$2);
const ZCard3 = defineComponent((_props) => {
  useController(ControllerCard3, RenderCard3, void 0);
  return () => {
  };
}, prepareComponentOptions());
const ZFormFieldTest = defineComponent((_props) => {
  useController(ControllerFormFieldTest, void 0, void 0);
  return () => {
  };
}, prepareComponentOptions(ControllerFormFieldTest.$componentOptions));
const ZFormFieldTest3 = defineComponent((_props) => {
  useController(ControllerFormFieldTest3, void 0, void 0);
  return () => {
  };
}, prepareComponentOptions(ControllerFormFieldTest3.$componentOptions));
var _dec$1, _dec2$1, _class$1;
let AopMethodTest = (_dec$1 = AopMethod(), _dec2$1 = BeanInfo({
  module: "a-b"
}), _dec$1(_class$1 = _dec2$1(_class$1 = class AopMethodTest2 extends BeanAopMethodBase {
  execute(_options, _args, next, _receiver, _prop) {
    return next();
  }
}) || _class$1) || _class$1);
class MainSys extends BeanSimple {
  async moduleLoading() {
  }
  async moduleLoaded() {
  }
  async configLoaded(_config) {
  }
}
var _dec, _dec2, _class;
const pagePathSchemas = {};
const pageNameSchemas = {};
const components = {
  "card": ZCard,
  "card3": ZCard3,
  "formFieldTest": ZFormFieldTest,
  "formFieldTest3": ZFormFieldTest3
};
let ScopeModuleAB = (_dec = Scope(), _dec2 = BeanInfo({
  module: "a-b"
}), _dec(_class = _dec2(_class = class ScopeModuleAB2 extends BeanScopeBase {
}) || _class) || _class);
export {
  AopMethodTest,
  ApiApiTestSsrToolOnetestPath,
  ApiSchemaTestSsrToolOne,
  ApiTestSsrToolOne,
  BeanTest,
  ControllerCard,
  ControllerCard3,
  ControllerFormFieldTest,
  ControllerFormFieldTest3,
  ControllerPageTest,
  ControllerPageTest3,
  ControllerPageTest4,
  MainSys,
  OpenApiBaseURL,
  RenderCard,
  RenderCard3,
  RenderPageTest,
  RenderPageTest3,
  RenderPageTest4,
  ScopeModuleAB,
  ServiceTest,
  ServiceTest3,
  ServiceTest4,
  ServiceTest6,
  ServiceTest7,
  StylePageTest,
  StylePageTest3,
  SysTest,
  ZCard,
  ZCard3,
  ZFormFieldTest,
  ZFormFieldTest3,
  ZPageTest,
  ZPageTest3,
  ZPageTest4,
  components,
  pageNameSchemas,
  pagePathSchemas,
  routes
};
