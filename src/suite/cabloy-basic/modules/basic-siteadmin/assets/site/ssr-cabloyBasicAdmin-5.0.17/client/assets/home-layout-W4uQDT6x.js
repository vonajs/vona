import { a7 as useComputed, l as BeanInfo, n as BeanBase, X as UseScope, L as BeanControllerBase, W as createZovaComponentAsync, U as Use, M as prepareComponentOptions, N as useController, Y as BeanRenderBase, ai as ClientOnly, ad as BeanStyleBase, v as BeanScopeBase, aa as useApp } from "./zova-QgocPMzS.js";
import { BeanModelBase, Model, $QueryAutoLoad } from "./a-model-DdQjWvuo.js";
import { Service, Controller, Render, Style, Scope } from "./a-bean-Bxu0OKjI.js";
import { P as createVNode, ab as isVNode, o as defineComponent, aa as withModifiers } from "./vue-CRNsYCTs.js";
import { d as RouterLink } from "./vue-router-DwxCgNw3.js";
import { $icon } from "./a-icon-BvN4DnAK.js";
import "./commonjsHelper-CCIqAdii.js";
import "./zod-DcU_E_GK.js";
import "./tanstack-query-D5lEwADt.js";
import "./localforage-DLcenR3h.js";
var _dec$f, _dec2$f, _class$f;
let ModelMenu = (_dec$f = Model(), _dec2$f = BeanInfo({
  module: "home-layout"
}), _dec$f(_class$f = _dec2$f(_class$f = class ModelMenu2 extends BeanModelBase {
  constructor(...args) {
    super(...args);
    this.menuTree = void 0;
    this._eventSsrHmrReload = void 0;
  }
  async __init__() {
    this.menuTree = useComputed(() => {
      const queryMenus = this.retrieveMenus();
      if (!queryMenus.data) return;
      return this._prepareMenuTree(queryMenus.data);
    });
    if (this.sys.env.SSR_HMR === "true") {
      this._eventSsrHmrReload = this.sys.meta.event.on("a-ssrhmr:reload", async (_data, next) => {
        await this.$refetchQueries({
          queryKey: ["retrieveMenus"]
        });
        return next();
      });
    }
  }
  __dispose__() {
    if (this._eventSsrHmrReload) {
      this._eventSsrHmrReload();
    }
  }
  retrieveMenus() {
    return this.$useStateData({
      queryKey: ["retrieveMenus"],
      queryFn: async () => {
        const data = await this.$api.homeBaseMenu.retrieveMenus({
          params: {
            publicPath: this.sys.env.APP_PUBLIC_PATH
          }
        });
        const menus = data.menus?.map((item) => {
          if (item.link && !this.$router.isRouterName(item.link) && item.meta?.params) {
            const link = this.sys.util.apiActionPathTranslate(item.link, item.meta?.params);
            return {
              ...item,
              link
            };
          }
          return item;
        })?.filter((item) => {
          return !item.external || this.$router.checkPathValid(item.link);
        });
        return {
          ...data,
          menus
        };
      }
    });
  }
  findMenuItem(search) {
    const menus = this.retrieveMenus().data;
    if (!menus || !menus.menus) return;
    return menus.menus.find((item) => item.name && search.name && item.name === search.name || item.link === search.link);
  }
  _prepareMenuTree(menus, groupName) {
    let children = [];
    if (menus.menus) {
      children = children.concat(menus.menus?.filter((item) => item.group === groupName || Array.isArray(item.group) && item.group.includes(groupName)).map((item) => {
        return {
          ...item,
          folder: false
        };
      }));
    }
    if (menus.groups) {
      const groups = menus.groups.filter((item) => item.group === groupName || Array.isArray(item.group) && item.group.includes(groupName)).map((menuGroup) => {
        return Object.assign({}, menuGroup, {
          folder: true,
          children: this._prepareMenuTree(menus, menuGroup.name)
        });
      });
      children = children.concat(groups);
    }
    return children.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }
}) || _class$f) || _class$f);
var _dec$e, _dec2$e, _dec3$6, _dec4$6, _class$e, _class2$6, _descriptor$6;
function _initializerDefineProperty$6(e, i, r, l) {
  r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 });
}
function _applyDecoratedDescriptor$6(i, e, r, n, l) {
  var a = {};
  return Object.keys(n).forEach(function(i2) {
    a[i2] = n[i2];
  }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = true), a = r.slice().reverse().reduce(function(r2, n2) {
    return n2(i, e, r2) || r2;
  }, a), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a;
}
let ServiceSsr = (_dec$e = Service(), _dec2$e = BeanInfo({
  module: "home-layout"
}), _dec3$6 = UseScope("a-ssr"), _dec4$6 = Reflect.metadata("design:type", typeof ScopeModuleASsr === "undefined" ? Object : ScopeModuleASsr), _dec$e(_class$e = _dec2$e(_class$e = (_class2$6 = class ServiceSsr2 extends BeanBase {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty$6(this, "$$scopeSsr", _descriptor$6, this);
  }
  async __init__() {
  }
}, _descriptor$6 = _applyDecoratedDescriptor$6(_class2$6.prototype, "$$scopeSsr", [_dec3$6, _dec4$6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2$6)) || _class$e) || _class$e);
var _dec$d, _dec2$d, _class$d, _ControllerEssentialLink;
const ZIcon$1 = createZovaComponentAsync("a-icon", "icon");
function _isSlot$1(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
let ControllerEssentialLink = (_dec$d = Controller(), _dec2$d = BeanInfo({
  module: "home-layout"
}), _dec$d(_class$d = _dec2$d(_class$d = (_ControllerEssentialLink = class ControllerEssentialLink2 extends BeanControllerBase {
  _renderLink() {
    const domContent = [createVNode(ZIcon$1, {
      "name": this.$props.icon
    }, null), createVNode("div", null, [createVNode("div", null, [this.$props.title]), this.$props.description && createVNode("div", {
      "class": "text-gray-400"
    }, [this.$props.description])])];
    if (this.$props.href) {
      return createVNode("a", {
        "href": this.$props.href,
        "target": "_blank"
      }, [domContent]);
    }
    if (!this.$props.to) {
      return createVNode("a", {
        "href": "#"
      }, [domContent]);
    }
    return createVNode(RouterLink, {
      "to": this.$props.to
    }, _isSlot$1(domContent) ? domContent : {
      default: () => [domContent]
    });
  }
  render() {
    return this._renderLink();
  }
}, _ControllerEssentialLink.$propsDefault = {
  description: "",
  icon: ""
}, _ControllerEssentialLink)) || _class$d) || _class$d);
var _dec$c, _dec2$c, _dec3$5, _dec4$5, _class$c, _class2$5, _descriptor$5, _ControllerLayoutEmpty;
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
const ZRouterViewEmpty = createZovaComponentAsync("a-router", "routerViewEmpty");
let ControllerLayoutEmpty = (_dec$c = Controller(), _dec2$c = BeanInfo({
  module: "home-layout"
}), _dec3$5 = Use(), _dec4$5 = Reflect.metadata("design:type", typeof ServiceSsr === "undefined" ? Object : ServiceSsr), _dec$c(_class$c = _dec2$c(_class$c = (_class2$5 = (_ControllerLayoutEmpty = class ControllerLayoutEmpty2 extends BeanControllerBase {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty$5(this, "$$ssr", _descriptor$5, this);
  }
  render() {
    return createVNode(ZRouterViewEmpty, null, null);
  }
}, _ControllerLayoutEmpty.$propsDefault = {}, _ControllerLayoutEmpty), _descriptor$5 = _applyDecoratedDescriptor$5(_class2$5.prototype, "$$ssr", [_dec3$5, _dec4$5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2$5)) || _class$c) || _class$c);
var _dec$b, _dec2$b, _dec3$4, _dec4$4, _dec5$1, _dec6$1, _class$b, _class2$4, _descriptor$4, _descriptor2$1, _ControllerLayoutTabs;
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
let ControllerLayoutTabs = (_dec$b = Controller(), _dec2$b = BeanInfo({
  module: "home-layout"
}), _dec3$4 = Use(), _dec4$4 = Reflect.metadata("design:type", typeof ModelMenu === "undefined" ? Object : ModelMenu), _dec5$1 = Use(), _dec6$1 = Reflect.metadata("design:type", typeof ServiceSsr === "undefined" ? Object : ServiceSsr), _dec$b(_class$b = _dec2$b(_class$b = (_class2$4 = (_ControllerLayoutTabs = class ControllerLayoutTabs2 extends BeanControllerBase {
  constructor(...args) {
    super(...args);
    this.$$modelTabs = void 0;
    _initializerDefineProperty$4(this, "$$modelMenu", _descriptor$4, this);
    _initializerDefineProperty$4(this, "$$ssr", _descriptor2$1, this);
    this.leftDrawerOpen = false;
  }
  async __init__() {
    await $QueryAutoLoad(() => this.$$modelMenu.retrieveMenus());
    await this._initTabs();
  }
  async _initTabs() {
    const configTabs = this.scope.config.tabs;
    const tabsOptions = {
      max: configTabs.max,
      maxItems: configTabs.maxItems,
      cache: configTabs.cache,
      getInitialTabs: () => {
        if (!this.$$modelMenu.retrieveMenus().data) return;
        return [{
          tabKey: "/",
          affix: true
        }];
      },
      getTabInfo: (tabKey) => {
        const queryMenu = this.$$modelMenu.retrieveMenus();
        if (!queryMenu.data || queryMenu.isError) return void 0;
        const menuItem = this.$$modelMenu.findMenuItem({
          link: tabKey
        });
        if (!menuItem) return void 0;
        return {
          title: menuItem.title,
          icon: menuItem.icon
        };
      }
    };
    this.$$modelTabs = await this.bean._getBeanSelector("a-routertabs.model.tabs", true, configTabs.scene, tabsOptions);
  }
  toggleLeftDrawer() {
    this.leftDrawerOpen = !this.leftDrawerOpen;
  }
}, _ControllerLayoutTabs.$propsDefault = {}, _ControllerLayoutTabs), _descriptor$4 = _applyDecoratedDescriptor$4(_class2$4.prototype, "$$modelMenu", [_dec3$4, _dec4$4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2$1 = _applyDecoratedDescriptor$4(_class2$4.prototype, "$$ssr", [_dec5$1, _dec6$1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2$4)) || _class$b) || _class$b);
const ZEssentialLink = defineComponent((_props) => {
  useController(ControllerEssentialLink, void 0, void 0);
  return () => {
  };
}, prepareComponentOptions());
const ZLayoutEmpty = defineComponent((_props) => {
  useController(ControllerLayoutEmpty, void 0, void 0);
  return () => {
  };
}, prepareComponentOptions());
var _dec$a, _dec2$a, _dec3$3, _dec4$3, _class$a, _class2$3, _descriptor$3;
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
let RenderContent = (_dec$a = Render(), _dec2$a = BeanInfo({
  module: "home-layout"
}), _dec3$3 = Use(), _dec4$3 = Reflect.metadata("design:type", typeof RenderLayoutTabs === "undefined" ? Object : RenderLayoutTabs), _dec$a(_class$a = _dec2$a(_class$a = (_class2$3 = class RenderContent2 extends BeanRenderBase {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty$3(this, "$$r", _descriptor$3, this);
  }
  render() {
    return this.$$r.$$renderTabs._renderRouterViewTabs();
  }
}, _descriptor$3 = _applyDecoratedDescriptor$3(_class2$3.prototype, "$$r", [_dec3$3, _dec4$3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2$3)) || _class$a) || _class$a);
var _dec$9, _dec2$9, _dec3$2, _dec4$2, _class$9, _class2$2, _descriptor$2;
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
let RenderHeader = (_dec$9 = Render(), _dec2$9 = BeanInfo({
  module: "home-layout"
}), _dec3$2 = Use(), _dec4$2 = Reflect.metadata("design:type", typeof RenderLayoutTabs === "undefined" ? Object : RenderLayoutTabs), _dec$9(_class$9 = _dec2$9(_class$9 = (_class2$2 = class RenderHeader2 extends BeanRenderBase {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty$2(this, "$$r", _descriptor$2, this);
  }
  render() {
    return createVNode("div", {
      "class": "navbar bg-base-300 w-full"
    }, [createVNode("div", {
      "class": "flex-none lg:hidden"
    }, [createVNode("label", {
      "htmlFor": "my-drawer-2",
      "aria-label": "open sidebar",
      "class": "btn btn-square btn-ghost"
    }, [createVNode("svg", {
      "xmlns": "http://www.w3.org/2000/svg",
      "fill": "none",
      "viewBox": "0 0 24 24",
      "class": "inline-block h-6 w-6 stroke-current"
    }, [createVNode("path", {
      "strokeLinecap": "round",
      "strokeLinejoin": "round",
      "strokeWidth": "2",
      "d": "M4 6h16M4 12h16M4 18h16"
    }, null)])])]), createVNode("div", {
      "class": "mx-2 flex-1 px-2"
    }, [this.$$r.$$renderTabs.render()]), createVNode("div", {
      "class": "hidden flex-none lg:block"
    }, [createVNode("ul", {
      "class": "menu menu-horizontal"
    }, [this.$$r.$$renderLocale.render(), this.$$r.$$renderTheme.renderThemeDark(), this.$$r.$$renderTheme.renderThemeName(), this.$$r.$$renderUser.render()])])]);
  }
}, _descriptor$2 = _applyDecoratedDescriptor$2(_class2$2.prototype, "$$r", [_dec3$2, _dec4$2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2$2)) || _class$9) || _class$9);
var _dec$8, _dec2$8, _class$8;
let RenderLocale = (_dec$8 = Render(), _dec2$8 = BeanInfo({
  module: "home-layout"
}), _dec$8(_class$8 = _dec2$8(_class$8 = class RenderLocale2 extends BeanRenderBase {
  render() {
    const locales2 = [{
      name: "en-us",
      title: this.scope.locale.LanguageEnglish()
    }, {
      name: "zh-cn",
      title: this.scope.locale.LanguageChinese()
    }];
    return createVNode("li", null, [createVNode("details", null, [createVNode("summary", null, [$icon("::language")]), createVNode(ClientOnly, null, {
      default: () => [createVNode("ul", {
        "class": "bg-base-100 rounded-t-none p-2 w-48"
      }, [locales2.map((item) => {
        return createVNode("li", {
          "key": item.name,
          "class": this.app.meta.locale.current === item.name ? "disabled" : ""
        }, [createVNode("a", {
          "onClick": () => {
            this.app.meta.locale.current = item.name;
          }
        }, [$icon(this.app.meta.locale.current === item.name ? "::done" : "::none"), item.title])]);
      })])]
    })])]);
  }
}) || _class$8) || _class$8);
var _dec$7, _dec2$7, _class$7;
let RenderMenu = (_dec$7 = Render(), _dec2$7 = BeanInfo({
  module: "home-layout"
}), _dec$7(_class$7 = _dec2$7(_class$7 = class RenderMenu2 extends BeanRenderBase {
  _renderMenuItem(item) {
    const titleLocale = this.$text(item.title ?? "");
    if (item.folder) {
      return createVNode("li", null, [createVNode("h2", {
        "class": "menu-title"
      }, [titleLocale]), createVNode("ul", null, [this._renderMenuItems(item.children)])]);
    }
    if (item.separator) {
      return createVNode("li", null, null);
    }
    let to;
    if (!item.external) {
      to = {};
      if (this.$router.isRouterName(item.link)) {
        to.name = item.link;
      } else {
        to.path = item.link;
      }
      if (item.meta?.params && to.name) {
        to.params = item.meta?.params;
      }
      if (item.meta?.query) to.query = item.meta?.query;
    }
    return createVNode("li", {
      "key": item.title
    }, [createVNode(ZEssentialLink, {
      "title": titleLocale,
      "description": item.description,
      "icon": item.icon,
      "href": item.external ? item.link : void 0,
      "to": to
    }, null)]);
  }
  _renderMenuItems(items) {
    if (!items) return;
    const domItems = [];
    for (const item of items) {
      domItems.push(this._renderMenuItem(item));
    }
    return domItems;
  }
  render() {
    const menuTree = this.$$modelMenu.menuTree;
    if (!menuTree) return;
    const domItems = this._renderMenuItems(menuTree);
    return createVNode("ul", {
      "class": "menu bg-base-200 text-base-content min-h-full w-80 p-4"
    }, [domItems]);
  }
}) || _class$7) || _class$7);
var _dec$6, _dec2$6, _dec3$1, _dec4$1, _class$6, _class2$1, _descriptor$1;
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
let RenderSidebar = (_dec$6 = Render(), _dec2$6 = BeanInfo({
  module: "home-layout"
}), _dec3$1 = Use(), _dec4$1 = Reflect.metadata("design:type", typeof RenderLayoutTabs === "undefined" ? Object : RenderLayoutTabs), _dec$6(_class$6 = _dec2$6(_class$6 = (_class2$1 = class RenderSidebar2 extends BeanRenderBase {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty$1(this, "$$r", _descriptor$1, this);
  }
  render() {
    return createVNode("div", {
      "class": "drawer-side"
    }, [createVNode("label", {
      "for": "my-drawer-2",
      "aria-label": "close sidebar",
      "class": "drawer-overlay"
    }, null), this.$$r.$$renderMenu.render()]);
  }
}, _descriptor$1 = _applyDecoratedDescriptor$1(_class2$1.prototype, "$$r", [_dec3$1, _dec4$1], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2$1)) || _class$6) || _class$6);
var _dec$5, _dec2$5, _class$5;
const ZRouterViewTabs = createZovaComponentAsync("a-routertabs", "routerViewTabs");
const ZIcon = createZovaComponentAsync("a-icon", "icon");
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
let RenderTabs = (_dec$5 = Render(), _dec2$5 = BeanInfo({
  module: "home-layout"
}), _dec$5(_class$5 = _dec2$5(_class$5 = class RenderTabs2 extends BeanRenderBase {
  render() {
    const $$modelTabs = this.$$modelTabs;
    if (!$$modelTabs) return;
    const domTabs = [];
    for (const tab of $$modelTabs.tabs) {
      const {
        tabKey,
        info
      } = tab;
      const className = tabKey === $$modelTabs.tabKeyCurrent ? "tab tab-active text-primary" : "tab";
      const titleLocale = this.$text(info?.title || "");
      const domTab = createVNode("a", {
        "key": tabKey,
        "role": "tab",
        "class": `${className} ${this.cTab}`,
        "onClick": () => {
          $$modelTabs.activeTab(tabKey);
        }
      }, [!!info?.icon && createVNode(ZIcon, {
        "name": info?.icon,
        "width": "24",
        "height": "24"
      }, null), titleLocale, !tab.affix && createVNode(ZIcon, {
        "class": "tab-close hidden hover:bg-slate-400 rounded-sm",
        "name": "::close",
        "width": "16",
        "height": "16",
        "nativeOnClick": withModifiers(() => {
          $$modelTabs.deleteTab(tabKey);
        }, ["stop"])
      }, null)]);
      domTabs.push(domTab);
    }
    const domWrapper = createVNode("div", {
      "role": "tablist",
      "class": "tabs tabs-lifted"
    }, [domTabs]);
    if (!this.$$modelTabs.cache) return domWrapper;
    return createVNode(ClientOnly, null, _isSlot(domWrapper) ? domWrapper : {
      default: () => [domWrapper]
    });
  }
  _renderRouterViewTabs() {
    return createVNode(ZRouterViewTabs, null, null);
  }
}) || _class$5) || _class$5);
var _dec$4, _dec2$4, _class$4;
let RenderTheme = (_dec$4 = Render(), _dec2$4 = BeanInfo({
  module: "home-layout"
}), _dec$4(_class$4 = _dec2$4(_class$4 = class RenderTheme2 extends BeanRenderBase {
  renderThemeDark() {
    const themes = [{
      mode: false,
      title: this.scope.locale.ThemeLight()
    }, {
      mode: true,
      title: this.scope.locale.ThemeDark()
    }, {
      mode: "auto",
      title: this.scope.locale.ThemeAuto()
    }];
    return createVNode("li", null, [createVNode("details", null, [createVNode("summary", null, [$icon("::dark-theme")]), createVNode(ClientOnly, null, {
      default: () => [createVNode("ul", {
        "class": "bg-base-100 rounded-t-none p-2 w-48"
      }, [themes.map((item) => {
        return createVNode("li", {
          "key": item.mode.toString(),
          "class": this.$theme.darkMode === item.mode ? "disabled" : ""
        }, [createVNode("a", {
          "onClick": () => {
            this.$theme.darkMode = item.mode;
          }
        }, [$icon(this.$theme.darkMode === item.mode ? "::done" : "::none"), item.title])]);
      })])]
    })])]);
  }
  renderThemeName() {
    const themes = [{
      name: "home-base:default",
      title: this.scope.locale.ThemeDefault()
    }, {
      name: "demo-basic:orange",
      title: this.scope.locale.ThemeOrange()
    }];
    return createVNode("li", null, [createVNode("details", null, [createVNode("summary", null, [$icon(":outline:theme-outline")]), createVNode(ClientOnly, null, {
      default: () => [createVNode("ul", {
        "class": "bg-base-100 rounded-t-none p-2 w-48"
      }, [themes.map((item) => {
        return createVNode("li", {
          "key": item.name,
          "class": this.$theme.name === item.name ? "disabled" : ""
        }, [createVNode("a", {
          "onClick": () => {
            this.$theme.name = item.name;
          }
        }, [$icon(this.$theme.name === item.name ? "::done" : "::none"), item.title])]);
      })])]
    })])]);
  }
}) || _class$4) || _class$4);
var _dec$3, _dec2$3, _class$3;
let RenderUser = (_dec$3 = Render(), _dec2$3 = BeanInfo({
  module: "home-layout"
}), _dec$3(_class$3 = _dec2$3(_class$3 = class RenderUser2 extends BeanRenderBase {
  render() {
    return createVNode("li", null, [createVNode("details", null, [createVNode("summary", null, [this.$passport.user?.name, $icon(this.$passport.user?.avatar)]), createVNode("ul", {
      "class": "bg-base-100 rounded-t-none p-2 w-32"
    }, [createVNode("li", null, [createVNode("a", {
      "onClick": () => {
        this.$passport.logout().mutate();
      }
    }, [this.scope.locale.Logout()])])])])]);
  }
}) || _class$3) || _class$3);
var _dec$2, _dec2$2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _class$2, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;
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
let RenderLayoutTabs$1 = (_dec$2 = Render(), _dec2$2 = BeanInfo({
  module: "home-layout"
}), _dec3 = Use(), _dec4 = Reflect.metadata("design:type", typeof RenderHeader === "undefined" ? Object : RenderHeader), _dec5 = Use(), _dec6 = Reflect.metadata("design:type", typeof RenderContent === "undefined" ? Object : RenderContent), _dec7 = Use(), _dec8 = Reflect.metadata("design:type", typeof RenderSidebar === "undefined" ? Object : RenderSidebar), _dec9 = Use(), _dec0 = Reflect.metadata("design:type", typeof RenderMenu === "undefined" ? Object : RenderMenu), _dec1 = Use(), _dec10 = Reflect.metadata("design:type", typeof RenderTabs === "undefined" ? Object : RenderTabs), _dec11 = Use(), _dec12 = Reflect.metadata("design:type", typeof RenderTheme === "undefined" ? Object : RenderTheme), _dec13 = Use(), _dec14 = Reflect.metadata("design:type", typeof RenderLocale === "undefined" ? Object : RenderLocale), _dec15 = Use(), _dec16 = Reflect.metadata("design:type", typeof RenderUser === "undefined" ? Object : RenderUser), _dec$2(_class$2 = _dec2$2(_class$2 = (_class2 = class RenderLayoutTabs2 extends BeanRenderBase {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "$$renderHeader", _descriptor, this);
    _initializerDefineProperty(this, "$$renderContent", _descriptor2, this);
    _initializerDefineProperty(this, "$$renderSidebar", _descriptor3, this);
    _initializerDefineProperty(this, "$$renderMenu", _descriptor4, this);
    _initializerDefineProperty(this, "$$renderTabs", _descriptor5, this);
    _initializerDefineProperty(this, "$$renderTheme", _descriptor6, this);
    _initializerDefineProperty(this, "$$renderLocale", _descriptor7, this);
    _initializerDefineProperty(this, "$$renderUser", _descriptor8, this);
  }
  render() {
    return createVNode("div", {
      "class": "drawer lg:drawer-open"
    }, [createVNode("input", {
      "id": "my-drawer-2",
      "type": "checkbox",
      "class": "drawer-toggle"
    }, null), createVNode("div", {
      "class": "drawer-content"
    }, [this.$$renderHeader.render(), this.$$renderContent.render()]), this.$$renderSidebar.render()]);
  }
}, _descriptor = _applyDecoratedDescriptor(_class2.prototype, "$$renderHeader", [_dec3, _dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "$$renderContent", [_dec5, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "$$renderSidebar", [_dec7, _dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "$$renderMenu", [_dec9, _dec0], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "$$renderTabs", [_dec1, _dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "$$renderTheme", [_dec11, _dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "$$renderLocale", [_dec13, _dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "$$renderUser", [_dec15, _dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2)) || _class$2) || _class$2);
var _dec$1, _dec2$1, _class$1;
let StyleLayoutTabs = (_dec$1 = Style(), _dec2$1 = BeanInfo({
  module: "home-layout"
}), _dec$1(_class$1 = _dec2$1(_class$1 = class StyleLayoutTabs2 extends BeanStyleBase {
  constructor(...args) {
    super(...args);
    this.cTab = void 0;
  }
  async __init__() {
    this.cTab = this.$style({
      $nest: {
        "&:hover .tab-close": {
          display: "block"
        },
        ".tab-close": {
          position: "absolute",
          top: "-6px",
          right: "-6px"
        }
      }
    });
  }
}) || _class$1) || _class$1);
const ZLayoutTabs = defineComponent((_props) => {
  useController(ControllerLayoutTabs, RenderLayoutTabs$1, StyleLayoutTabs);
  return () => {
  };
}, prepareComponentOptions());
const config = (_sys) => {
  return {
    tabs: {
      scene: "",
      max: 6,
      maxItems: 6,
      cache: true
    }
  };
};
var _dec, _dec2, _class;
const components = {
  "essentialLink": ZEssentialLink,
  "layoutEmpty": ZLayoutEmpty,
  "layoutTabs": ZLayoutTabs
};
let ScopeModuleHomeLayout = (_dec = Scope(), _dec2 = BeanInfo({
  module: "home-layout"
}), _dec(_class = _dec2(_class = class ScopeModuleHomeLayout2 extends BeanScopeBase {
}) || _class) || _class);
function locale(key) {
  return `home-layout::${key}`;
}
const locale_en_us = {
  "Home": "Home",
  "Logout": "Logout",
  "LanguageEnglish": "English",
  "LanguageChinese": "Chinese",
  "ThemeLight": "Light",
  "ThemeDark": "Dark",
  "ThemeAuto": "Auto",
  "ThemeDefault": "Default",
  "ThemeOrange": "Orange",
  "Basic": "Basic",
  "Business": "Business",
  "State": "State",
  "Component": "Component",
  "Route Query": "Route Query",
  "Route Query(2)": "Route Query(2)",
  "Route Params": "Route Params",
  "Locale": "Locale",
  "Todo: CRUD": "Todo: CRUD",
  "Docs": "Docs",
  "Legacy Vue3": "Legacy Vue3",
  "Legacy Vue3(2)": "Legacy Vue3(2)"
};
const locale_zh_cn = {
  "Home": "首页",
  "Logout": "退出登录",
  "LanguageEnglish": "英语",
  "LanguageChinese": "简体中文",
  "ThemeLight": "亮色",
  "ThemeDark": "暗色",
  "ThemeAuto": "自动",
  "ThemeDefault": "默认",
  "ThemeOrange": "橘色",
  "Basic": "基础",
  "Business": "业务",
  "State": "状态",
  "Component": "组件",
  "Route Query": "路由Query",
  "Route Query(2)": "路由Query(2)",
  "Route Params": "路由Params",
  "Locale": "本地化",
  "Todo: CRUD": "Todo: 增删改查",
  "Docs": "文档",
  "Legacy Vue3": "传统Vue3",
  "Legacy Vue3(2)": "传统Vue3(2)"
};
const locales = {
  "en-us": locale_en_us,
  "zh-cn": locale_zh_cn
};
function $useLocale(key, ...args) {
  const app = useApp();
  const str = `home-layout::${key}`;
  return useComputed(() => {
    return app.meta.text(str, ...args);
  });
}
export {
  $useLocale,
  ControllerEssentialLink,
  ControllerLayoutEmpty,
  ControllerLayoutTabs,
  ModelMenu,
  RenderContent,
  RenderHeader,
  RenderLayoutTabs$1 as RenderLayoutTabs,
  RenderLocale,
  RenderMenu,
  RenderSidebar,
  RenderTabs,
  RenderTheme,
  RenderUser,
  ScopeModuleHomeLayout,
  ServiceSsr,
  StyleLayoutTabs,
  ZEssentialLink,
  ZLayoutEmpty,
  ZLayoutTabs,
  components,
  config,
  locale,
  locales
};
