import { a0 as StateLock, n as BeanBase, l as BeanInfo, U as Use, a1 as sys, L as BeanControllerBase, M as prepareComponentOptions, N as useController, B as BeanSimple, v as BeanScopeBase } from "./zova-QgocPMzS.js";
import { r as reactive, l as ref, w as watchEffect, P as createVNode, o as defineComponent } from "./vue-CRNsYCTs.js";
import { Sys, Tool, Controller, Scope } from "./a-bean-Bxu0OKjI.js";
import "./commonjsHelper-CCIqAdii.js";
import "./zod-DcU_E_GK.js";
class IconGroup {
  constructor() {
    this.svg = void 0;
    this.loaded = void 0;
    this.loaded = StateLock.create();
  }
}
var _dec$3, _dec2$3, _class$3;
const XMLNS = "http://www.w3.org/2000/svg";
const XMLNS_LINK = "http://www.w3.org/1999/xlink";
let SysIcon = (_dec$3 = Sys(), _dec2$3 = BeanInfo({
  module: "a-icon"
}), _dec$3(_class$3 = _dec2$3(_class$3 = class SysIcon2 extends BeanBase {
  constructor(...args) {
    super(...args);
    this._iconSymbols = reactive({});
    this._iconMoudles = {};
  }
  // undefined: ignore
  // '': empty icon
  parseIconInfoSync(iconName) {
    const meta = this.parseIconMeta(iconName);
    if (!meta) return void 0;
    const iconEmpty = {
      meta,
      symbolId: ""
    };
    const iconOk = {
      meta,
      symbolId: meta.symbolId
    };
    if (this._iconSymbols[meta.fullName]) return iconOk;
    {
      const domIcon = document.getElementById(meta.symbolId);
      if (domIcon) return iconOk;
    }
    if (this._iconSymbols[meta.fullName] === void 0) {
      this.parseIconInfo(iconName);
      return iconEmpty;
    } else if (this._iconSymbols[meta.fullName] === "") {
      return iconEmpty;
    }
  }
  async parseIconInfo(iconName) {
    const meta = this.parseIconMeta(iconName);
    if (!meta) return void 0;
    if (this._iconSymbols[meta.fullName]) {
      return {
        meta,
        symbolId: this._iconSymbols[meta.fullName]
      };
    }
    this._iconSymbols[meta.fullName] = "";
    const iconGroup = await this.parseIconGroup(meta.module, meta.group);
    if (!iconGroup) return void 0;
    this._injectIconClient(meta);
    const symbolId = this._iconSymbols[meta.fullName] = meta.symbolId;
    return {
      meta,
      symbolId
    };
  }
  async parseIconGroup(moduleName, groupName) {
    const iconModule = this.getIconModule(moduleName);
    if (iconModule[groupName]) {
      await iconModule[groupName].loaded.wait();
      return iconModule[groupName].svg;
    }
    iconModule[groupName] = new IconGroup();
    const svg = await this._parseIconGroupInner(moduleName, groupName);
    iconModule[groupName].svg = svg;
    iconModule[groupName].loaded.touch();
    return iconModule[groupName].svg;
  }
  async _parseIconGroupInner(moduleName, groupName) {
    const module = await this.sys.meta.module.use(moduleName);
    if (!module) return;
    const icons = module.resource.icons;
    let groupUrl = icons[groupName];
    if (!groupUrl) return;
    if (groupUrl.startsWith("data:image/svg+xml")) throw new Error("inline svg not supported");
    let svg;
    {
      const res = await fetch(groupUrl);
      if (!res.ok) return;
      svg = await res.text();
    }
    return svg;
  }
  _injectIconClient(meta) {
    const iconModule = this.getIconModule(meta.module);
    const iconGroup = iconModule[meta.group];
    let domContainer = document.getElementById("zova-svg-container");
    if (!domContainer) {
      domContainer = document.createElement("div");
      domContainer.style.position = "absolute";
      domContainer.style.width = "0";
      domContainer.style.height = "0";
      domContainer.style.display = "none";
      domContainer.id = "zova-svg-container";
      document.body.appendChild(domContainer);
    }
    let domModule = document.getElementById(`zova-svg-module-${meta.module}`);
    if (!domModule) {
      domModule = document.createElement("div");
      domModule.id = `zova-svg-module-${meta.module}`;
      domContainer.appendChild(domModule);
    }
    let domGroup = document.getElementById(`zova-svg-group-${meta.module}-${meta.group}`);
    if (!domGroup) {
      domGroup = document.createElementNS(XMLNS, "svg");
      domGroup.id = `zova-svg-group-${meta.module}-${meta.group}`;
      domGroup.setAttribute("xmlns", XMLNS);
      domGroup.setAttribute("xmlns:link", XMLNS_LINK);
      domModule.appendChild(domGroup);
    }
    const domIcon = document.getElementById(meta.symbolId);
    if (!domIcon) {
      const iconContent = this.extractIconContent(iconGroup.svg, meta.symbolId);
      if (iconContent) {
        domGroup.insertAdjacentHTML("beforeend", iconContent);
      }
    }
  }
  extractIconContent(svg, symbolId) {
    if (!svg) return void 0;
    let pos = svg.indexOf(`'${symbolId}'`);
    if (pos === -1) pos = svg.indexOf(`"${symbolId}"`);
    if (pos === -1) return void 0;
    const posB = svg.indexOf("</symbol>", pos);
    const posA = svg.lastIndexOf("<symbol", pos);
    return svg.substring(posA, posB + "</symbol>".length);
  }
  getIconModule(moduleName) {
    if (!this._iconMoudles[moduleName]) {
      this._iconMoudles[moduleName] = {};
    }
    return this._iconMoudles[moduleName];
  }
  parseIconMeta(iconName) {
    if (!iconName) return;
    const parts = iconName.split(":");
    if (parts.length !== 3) {
      return;
    }
    const module = parts[0] || this.scope.config.defaultModule;
    const group = parts[1] || "default";
    const name = parts[2] || "";
    if (!module.includes("-") || !name) {
      return;
    }
    return {
      module,
      group,
      name,
      fullName: this._getFullName(module, group, name),
      symbolId: this._getSymbolId(module, group, name)
    };
  }
  _getSymbolId(module, group, name) {
    return `zova-svg-icon-${module}-${group}-${name}`;
  }
  _getFullName(module, group, name) {
    return `${module}:${group}:${name}`;
  }
}) || _class$3) || _class$3);
var _dec$2, _dec2$2, _dec3$1, _dec4$1, _class$2, _class2$1, _descriptor$1;
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
let ToolIcon = (_dec$2 = Tool(), _dec2$2 = BeanInfo({
  module: "a-icon"
}), _dec3$1 = Use(), _dec4$1 = Reflect.metadata("design:type", typeof SysIcon === "undefined" ? Object : SysIcon), _dec$2(_class$2 = _dec2$2(_class$2 = (_class2$1 = class ToolIcon2 extends BeanBase {
  constructor(...args) {
    super(...args);
    this._iconSSR = {};
    _initializerDefineProperty$1(this, "$$sysIcon", _descriptor$1, this);
  }
  async __init__() {
  }
  async parseIconInfo(iconName) {
    const iconInfo = await this.$$sysIcon.parseIconInfo(iconName);
    if (!iconInfo) return iconInfo;
    this._injectIconSSR(iconInfo.meta);
    return iconInfo;
  }
  _onRendered() {
    this.ctx.meta.$ssr.context._meta.bodyTags += this._renderSSRContainer();
  }
  _renderSSRContainer() {
    const contentModules = this._renderSSRModules();
    return `<div id="zova-svg-container" style="position: absolute; width: 0px; height: 0px; display: none;">${contentModules}</div>`;
  }
  _renderSSRModules() {
    return Object.keys(this._iconSSR).map((moduleName) => {
      const moduleId = `zova-svg-module-${moduleName}`;
      const contentGroups = this._renderSSRGroups(this._iconSSR[moduleName], moduleName);
      return `<div id="${moduleId}">${contentGroups}</div>`;
    }).join("");
  }
  _renderSSRGroups(iconSSRGroups, moduleName) {
    return Object.keys(iconSSRGroups).map((groupName) => {
      const groupId = `zova-svg-group-${moduleName}-${groupName}`;
      const contentIcons = this._renderSSRIcons(iconSSRGroups[groupName]);
      return `<svg id="${groupId}" xmlns="http://www.w3.org/2000/svg" xmlns:link="http://www.w3.org/1999/xlink">${contentIcons}</svg>`;
    }).join("");
  }
  _renderSSRIcons(iconSSRIcons) {
    return Object.keys(iconSSRIcons).map((symbolId) => {
      return iconSSRIcons[symbolId];
    }).join("");
  }
  _injectIconSSR(meta) {
    return;
  }
}, _descriptor$1 = _applyDecoratedDescriptor$1(_class2$1.prototype, "$$sysIcon", [_dec3$1, _dec4$1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2$1)) || _class$2) || _class$2);
function $getZovaIcon(iconName) {
  return sys.meta.$icon.parseIconInfoSync(iconName);
}
function $useZovaIcon(iconGetter) {
  const iconInfo = ref();
  watchEffect(() => {
    iconInfo.value = $getZovaIcon(iconGetter());
  });
  return {
    iconInfo
  };
}
var _dec$1, _dec2$1, _dec3, _dec4, _class$1, _class2, _descriptor, _ControllerIcon;
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
let ControllerIcon = (_dec$1 = Controller(), _dec2$1 = BeanInfo({
  module: "a-icon"
}), _dec3 = Use(), _dec4 = Reflect.metadata("design:type", typeof ToolIcon === "undefined" ? Object : ToolIcon), _dec$1(_class$1 = _dec2$1(_class$1 = (_class2 = (_ControllerIcon = class ControllerIcon2 extends BeanControllerBase {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "$$toolIcon", _descriptor, this);
  }
  async __init__() {
    await this._load();
  }
  async _load() {
    const icon = this.$props.name;
    if (icon === "none" || !icon) {
      return;
    }
    const promise = this.$$toolIcon.parseIconInfo(icon);
    {
      await promise;
    }
  }
  render() {
    const iconInfo = $getZovaIcon(this.$props.name);
    let href = this.$props.href;
    if (!href) {
      href = `#${iconInfo?.symbolId || ""}`;
    }
    const defaultSize = this.scope.config.icon.size;
    const width = this.$props.width ?? this.$props.height ?? defaultSize;
    const height = this.$props.height ?? this.$props.width ?? defaultSize;
    return createVNode("svg", {
      "class": "zova-icon__svg",
      "xmlns": "http://www.w3.org/2000/svg",
      "viewBox": "0 0 24 24",
      "fill": "currentColor",
      "role": "img",
      "aria-hidden": "true",
      "width": width,
      "height": height,
      "style": {
        color: this.$props.color
      }
    }, [createVNode("use", {
      "xlink:href": href
    }, null)]);
  }
}, _ControllerIcon.$propsDefault = {}, _ControllerIcon), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "$$toolIcon", [_dec3, _dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2)) || _class$1) || _class$1);
const ZIcon = defineComponent((_props) => {
  useController(ControllerIcon, void 0, void 0);
  return () => {
  };
}, prepareComponentOptions());
const config = (_sys) => {
  return {
    defaultModule: "home-icon",
    icon: {
      size: 24
    }
  };
};
class MonkeySys extends BeanSimple {
  async sysInitialize() {
    this.sys.meta.$icon = await this.bean._getBean(SysIcon, false);
  }
}
var _dec, _dec2, _class;
const components = {
  "icon": ZIcon
};
let ScopeModuleAIcon = (_dec = Scope(), _dec2 = BeanInfo({
  module: "a-icon"
}), _dec(_class = _dec2(_class = class ScopeModuleAIcon2 extends BeanScopeBase {
}) || _class) || _class);
function $icon(name, size, color) {
  return createVNode(ZIcon, {
    name,
    color,
    width: size,
    height: size
  });
}
function $iconName(name) {
  return name;
}
export {
  $getZovaIcon,
  $icon,
  $iconName,
  $useZovaIcon,
  ControllerIcon,
  IconGroup,
  MonkeySys,
  ScopeModuleAIcon,
  SysIcon,
  ToolIcon,
  ZIcon,
  components,
  config
};
