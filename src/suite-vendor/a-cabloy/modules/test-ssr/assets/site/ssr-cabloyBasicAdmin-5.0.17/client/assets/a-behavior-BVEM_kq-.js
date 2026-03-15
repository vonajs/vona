import { n as BeanBase, O as disposeInstance, Q as deepEqual, m as cast, l as BeanInfo, U as Use, V as Virtual, L as BeanControllerBase, R as SymbolControllerRefDisable, M as prepareComponentOptions, N as useController, d as createBeanDecorator, v as BeanScopeBase } from "./zova-QgocPMzS.js";
import { Service, Bean, Controller, Scope } from "./a-bean-Bxu0OKjI.js";
import { P as createVNode, L as toRaw, o as defineComponent } from "./vue-CRNsYCTs.js";
import { Log } from "./a-logger-CYjH9aBA.js";
import "./commonjsHelper-CCIqAdii.js";
import "./zod-DcU_E_GK.js";
var _dec$6, _dec2$6, _dec3$3, _dec4$3, _class$6, _class2$3, _descriptor$3;
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
const SymbolSliceOptionsOriginal = /* @__PURE__ */ Symbol("SymbolSliceOptionsOriginal");
let ServiceComposer = (_dec$6 = Service(), _dec2$6 = BeanInfo({
  module: "a-behavior"
}), _dec3$3 = Use("a-bean.sys.onion"), _dec4$3 = Reflect.metadata("design:type", typeof SysOnion === "undefined" ? Object : SysOnion), _dec$6(_class$6 = _dec2$6(_class$6 = (_class2$3 = class ServiceComposer2 extends BeanBase {
  constructor(...args) {
    super(...args);
    this._composer = void 0;
    this._onionSlicesOriginal = void 0;
    _initializerDefineProperty$3(this, "$$sysOnion", _descriptor$3, this);
  }
  async __init__(behaviors) {
    await this.load(behaviors);
  }
  __dispose__() {
    if (this._onionSlicesOriginal) {
      for (const onionSlice of this._onionSlicesOriginal) {
        disposeInstance(onionSlice.beanInstance);
      }
    }
  }
  async load(behaviors) {
    await this.$renderFreezeScope(async () => {
      await this._loadInner(behaviors);
    });
  }
  async _loadInner(behaviors) {
    const onionItems = this._prepareOnionItems(behaviors);
    const onionSlices = await this.$$sysOnion.behavior.loadOnions(onionItems);
    for (const onionSlice of onionSlices) {
      const onionSliceOriginal = this._onionSlicesOriginal?.find((item) => item.beanFullName === onionSlice.beanFullName);
      if (onionSliceOriginal) {
        onionSlice.beanInstance = onionSliceOriginal.beanInstance;
        if (!deepEqual(onionSliceOriginal[SymbolSliceOptionsOriginal], onionSlice.options)) {
          await cast(onionSlice.beanInstance).onOptionsChange(onionSlice.options);
        }
      } else {
        onionSlice.beanInstance = await this.bean._newBean(onionSlice.beanFullName, true, onionSlice.options);
      }
      onionSlice[SymbolSliceOptionsOriginal] = onionSlice.options;
    }
    if (this._onionSlicesOriginal) {
      for (const onionSlice of this._onionSlicesOriginal) {
        const exists = onionSlices.find((item) => item.beanFullName === onionSlice.beanFullName);
        if (!exists) {
          disposeInstance(onionSlice.beanInstance);
        }
      }
    }
    this._onionSlicesOriginal = onionSlices;
    this._composer = this.$$sysOnion.behavior.compose(onionSlices, (onionSlice, props, next) => {
      const beanInstance = cast(onionSlice.beanInstance);
      return cast(beanInstance).render(props, next);
    });
  }
  render(props, next) {
    return this._composer(props, next);
  }
  _prepareOnionItems(behaviors) {
    const onionItems = [];
    return this._prepareOnionItemsInner(onionItems, behaviors);
  }
  _prepareOnionItemsInner(onionItems, behaviors) {
    const behaviors2 = Array.isArray(behaviors) ? behaviors : [behaviors];
    for (const behaviorItem of behaviors2) {
      if (typeof behaviorItem === "string") {
        onionItems.push({
          name: behaviorItem,
          options: void 0
        });
      } else if (Array.isArray(behaviorItem)) {
        this._prepareOnionItemsInner(onionItems, behaviorItem);
      } else if (typeof behaviorItem === "object") {
        for (const key in behaviorItem) {
          let options = behaviorItem[key];
          if (options === false) continue;
          if (options === true) options = void 0;
          onionItems.push({
            name: key,
            options
          });
        }
      }
    }
    return onionItems;
  }
}, _descriptor$3 = _applyDecoratedDescriptor$3(_class2$3.prototype, "$$sysOnion", [_dec3$3, _dec4$3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2$3)) || _class$6) || _class$6);
var _dec$5, _dec2$5, _class$5;
let BeanBehavior$1 = (_dec$5 = Bean(), _dec2$5 = BeanInfo({
  module: "a-behavior"
}), _dec$5(_class$5 = _dec2$5(_class$5 = class BeanBehavior2 extends BeanBase {
  async createComposer(behaviors) {
    return await this.bean._newBean(ServiceComposer, true, behaviors);
  }
}) || _class$5) || _class$5);
var _dec$4, _dec2$4, _dec3$2, _dec4$2, _dec5$1, _dec6$1, _dec7$1, _dec8, _dec9, _class$4, _class2$2, _descriptor$2, _descriptor2;
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
let BeanBehaviorBase = (_dec$4 = Bean(), _dec2$4 = Virtual(), _dec3$2 = BeanInfo({
  module: "a-behavior"
}), _dec4$2 = Reflect.metadata("design:type", Function), _dec5$1 = Reflect.metadata("design:paramtypes", [typeof OPTIONS === "undefined" ? Object : OPTIONS]), _dec6$1 = Use({
  injectionScope: "host"
}), _dec7$1 = Reflect.metadata("design:type", typeof BeanBehavior === "undefined" ? Object : BeanBehavior), _dec8 = Use({
  injectionScope: "host"
}), _dec9 = Reflect.metadata("design:type", typeof IBehaviorTag === "undefined" ? Object : IBehaviorTag), _dec$4(_class$4 = _dec2$4(_class$4 = _dec3$2(_class$4 = _dec4$2(_class$4 = _dec5$1(_class$4 = (_class2$2 = class BeanBehaviorBase2 extends BeanBase {
  constructor(options) {
    super();
    this.$options = void 0;
    _initializerDefineProperty$2(this, "$$beanBehavior", _descriptor$2, this);
    _initializerDefineProperty$2(this, "$$behaviorTag", _descriptor2, this);
    this.$options = options;
  }
  async onOptionsChange(options) {
    this.$options = options;
  }
  async createComposer(behaviors) {
    return await this.$$beanBehavior.createComposer(behaviors);
  }
  render(_props, next) {
    return next();
  }
}, _descriptor$2 = _applyDecoratedDescriptor$2(_class2$2.prototype, "$$beanBehavior", [_dec6$1, _dec7$1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor$2(_class2$2.prototype, "$$behaviorTag", [_dec8, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2$2)) || _class$4) || _class$4) || _class$4) || _class$4) || _class$4);
function $UseBehavior(behaviorName, options) {
  return {
    [behaviorName]: options
  };
}
function $UseBehaviorTag(component) {
  return {
    component,
    name: typeof component === "string" ? component : void 0
  };
}
var _dec$3, _dec2$3, _dec3$1, _dec4$1, _dec5, _dec6, _dec7, _class$3, _class2$1, _descriptor$1;
function _initializerDefineProperty$1(e, i, r, l) {
  r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 });
}
function _applyDecoratedDescriptor$1(i, e, r, n, l) {
  var a = {};
  return Object.keys(n).forEach(function(i2) {
    a[i2] = n[i2];
  }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = true), a = r.slice().reverse().reduce(function(r2, n2) {
    return n2(i, e, r2) || r2;
  }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a;
}
let BeanBehaviorsHolder = (_dec$3 = Bean(), _dec2$3 = BeanInfo({
  module: "a-behavior"
}), _dec3$1 = Use(), _dec4$1 = Reflect.metadata("design:type", typeof BeanBehavior$1 === "undefined" ? Object : BeanBehavior$1), _dec5 = Log({
  args: false,
  childName: "behavior",
  level: "debug"
}), _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [typeof IBehaviors === "undefined" ? Object : IBehaviors]), _dec$3(_class$3 = _dec2$3(_class$3 = (_class2$1 = class BeanBehaviorsHolder2 extends BeanBase {
  constructor(...args) {
    super(...args);
    this.options = void 0;
    this.composer = void 0;
    _initializerDefineProperty$1(this, "$$beanBehavior", _descriptor$1, this);
  }
  async initialize(options) {
    this.options = options;
    this.bean._setBean("$$behaviorTag", this.options.behaviorTag);
    this.composer = await this.$$beanBehavior.createComposer(this._getBehaviorRoot());
    const behaviors = this.options.behaviors;
    if (typeof behaviors === "function") {
      this.$watch(behaviors, async (newValue, oldValue) => {
        if (deepEqual(newValue, oldValue)) return;
        await this.composer.load(this._getBehaviorRoot(newValue));
      });
    }
  }
  __dispose__() {
    disposeInstance(this.composer);
  }
  _getBehaviors() {
    let behaviors = this.options.behaviors;
    if (typeof behaviors === "function") {
      behaviors = behaviors();
    }
    return behaviors;
  }
  _getBehaviorRoot(behaviors) {
    if (!behaviors) {
      behaviors = this._getBehaviors();
    }
    return $UseBehavior("a-behavior:root", {
      behaviors
    });
  }
  render(vNodeDefault, propsCustom) {
    const parent = this.ctx.instance;
    const {
      props,
      children
    } = parent.vnode;
    const propsNew = Object.assign({}, propsCustom ?? props);
    delete propsNew.behaviorTag;
    delete propsNew.behaviors;
    return this.composer.render(propsNew, (propsNew2) => {
      if (vNodeDefault) return vNodeDefault(propsNew2);
      return createVNode(toRaw(this.options.behaviorTag.component), propsNew2, children);
    });
  }
}, _descriptor$1 = _applyDecoratedDescriptor$1(_class2$1.prototype, "$$beanBehavior", [_dec3$1, _dec4$1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor$1(_class2$1.prototype, "_getBehaviorRoot", [_dec5, _dec6, _dec7], Object.getOwnPropertyDescriptor(_class2$1.prototype, "_getBehaviorRoot"), _class2$1.prototype), _class2$1)) || _class$3) || _class$3);
var _dec$2, _dec2$2, _dec3, _dec4, _class$2, _class2, _descriptor, _ControllerBehavior;
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
let ControllerBehavior = (_dec$2 = Controller(), _dec2$2 = BeanInfo({
  module: "a-behavior"
}), _dec3 = Use(), _dec4 = Reflect.metadata("design:type", typeof BeanBehaviorsHolder === "undefined" ? Object : BeanBehaviorsHolder), _dec$2(_class$2 = _dec2$2(_class$2 = (_class2 = (_ControllerBehavior = class ControllerBehavior2 extends BeanControllerBase {
  constructor(...args) {
    super(...args);
    this[SymbolControllerRefDisable] = true;
    _initializerDefineProperty(this, "$$beanBehaviorsHolder", _descriptor, this);
  }
  async __init__() {
    await this.$$beanBehaviorsHolder.initialize({
      behaviorTag: this.$props.behaviorTag,
      behaviors: () => {
        return this.$props.behaviors;
      }
    });
  }
  render() {
    return this.$$beanBehaviorsHolder.render();
  }
}, _ControllerBehavior.$propsDefault = {}, _ControllerBehavior.$componentOptions = {
  inheritAttrs: false
}, _ControllerBehavior), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "$$beanBehaviorsHolder", [_dec3, _dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2)) || _class$2) || _class$2);
const ZBehavior = defineComponent((_props) => {
  useController(ControllerBehavior, void 0, void 0);
  return () => {
  };
}, prepareComponentOptions(ControllerBehavior.$componentOptions));
function Behavior(options) {
  return createBeanDecorator("behavior", "new", true, options);
}
var _dec$1, _dec2$1, _class$1;
let BehaviorRoot = (_dec$1 = Behavior(), _dec2$1 = BeanInfo({
  module: "a-behavior"
}), _dec$1(_class$1 = _dec2$1(_class$1 = class BehaviorRoot2 extends BeanBehaviorBase {
  constructor(...args) {
    super(...args);
    this.composer = void 0;
  }
  async __init__(options) {
    this.composer = await this.createComposer(options.behaviors);
  }
  __dispose__() {
    disposeInstance(this.composer);
  }
  async onOptionsChange(options) {
    await super.onOptionsChange(options);
    await this.composer.load(options.behaviors);
  }
  render(props, next) {
    return this.composer.render(props, next);
  }
}) || _class$1) || _class$1);
var _dec, _dec2, _class;
const components = {
  "behavior": ZBehavior
};
let ScopeModuleABehavior = (_dec = Scope(), _dec2 = BeanInfo({
  module: "a-behavior"
}), _dec(_class = _dec2(_class = class ScopeModuleABehavior2 extends BeanScopeBase {
}) || _class) || _class);
export {
  $UseBehavior,
  $UseBehaviorTag,
  BeanBehavior$1 as BeanBehavior,
  BeanBehaviorBase,
  BeanBehaviorsHolder,
  Behavior,
  BehaviorRoot,
  ControllerBehavior,
  ScopeModuleABehavior,
  ServiceComposer,
  ZBehavior,
  components
};
