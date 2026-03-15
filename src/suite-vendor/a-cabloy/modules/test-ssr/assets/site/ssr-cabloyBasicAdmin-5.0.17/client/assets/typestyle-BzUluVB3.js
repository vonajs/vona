let uniqueId = 0;
const CSS_NUMBER = /* @__PURE__ */ Object.create(null);
const CSS_NUMBER_KEYS = [
  "animation-iteration-count",
  "border-image-outset",
  "border-image-slice",
  "border-image-width",
  "box-flex",
  "box-flex-group",
  "box-ordinal-group",
  "column-count",
  "columns",
  "counter-increment",
  "counter-reset",
  "flex",
  "flex-grow",
  "flex-positive",
  "flex-shrink",
  "flex-negative",
  "flex-order",
  "font-weight",
  "grid-area",
  "grid-column",
  "grid-column-end",
  "grid-column-span",
  "grid-column-start",
  "grid-row",
  "grid-row-end",
  "grid-row-span",
  "grid-row-start",
  "line-clamp",
  "line-height",
  "opacity",
  "order",
  "orphans",
  "tab-size",
  "widows",
  "z-index",
  "zoom",
  // SVG properties.
  "fill-opacity",
  "flood-opacity",
  "stop-opacity",
  "stroke-dasharray",
  "stroke-dashoffset",
  "stroke-miterlimit",
  "stroke-opacity",
  "stroke-width"
];
for (const property of CSS_NUMBER_KEYS) {
  for (const prefix of ["-webkit-", "-ms-", "-moz-", "-o-", ""]) {
    CSS_NUMBER[prefix + property] = true;
  }
}
function hyphenate(propertyName) {
  return propertyName.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`).replace(/^ms-/, "-ms-");
}
function stringHash(str) {
  let value = 5381;
  let len = str.length;
  while (len--)
    value = value * 33 ^ str.charCodeAt(len);
  return (value >>> 0).toString(36);
}
function styleToString(key2, value) {
  if (value && typeof value === "number" && !CSS_NUMBER[key2]) {
    return `${key2}:${value}px`;
  }
  return `${key2}:${value}`;
}
function sortTuples(value) {
  return value.sort((a, b) => a[0] > b[0] ? 1 : -1);
}
function parseStyles(styles, hasNestedStyles) {
  const properties = [];
  const nestedStyles = [];
  for (const key2 of Object.keys(styles)) {
    const name = key2.trim();
    const value = styles[key2];
    if (name.charCodeAt(0) !== 36 && value != null) {
      if (typeof value === "object" && !Array.isArray(value)) {
        nestedStyles.push([name, value]);
      } else {
        properties.push([hyphenate(name), value]);
      }
    }
  }
  return {
    style: stringifyProperties(sortTuples(properties)),
    nested: hasNestedStyles ? nestedStyles : sortTuples(nestedStyles),
    isUnique: !!styles.$unique
  };
}
function stringifyProperties(properties) {
  return properties.map(([name, value]) => {
    if (!Array.isArray(value))
      return styleToString(name, value);
    return value.map((x) => styleToString(name, x)).join(";");
  }).join(";");
}
function interpolate(selector, parent) {
  if (selector.indexOf("&") === -1)
    return `${parent} ${selector}`;
  return selector.replace(/&/g, parent);
}
function stylize(selector, styles, rulesList, stylesList, parent) {
  const { style: style2, nested, isUnique } = parseStyles(styles, selector !== "");
  let pid = style2;
  if (selector.charCodeAt(0) === 64) {
    const child = {
      selector,
      styles: [],
      rules: [],
      style: parent ? "" : style2
    };
    rulesList.push(child);
    if (style2 && parent) {
      child.styles.push({ selector: parent, style: style2, isUnique });
    }
    for (const [name, value] of nested) {
      pid += name + stylize(name, value, child.rules, child.styles, parent);
    }
  } else {
    const key2 = parent ? interpolate(selector, parent) : selector;
    if (style2)
      stylesList.push({ selector: key2, style: style2, isUnique });
    for (const [name, value] of nested) {
      pid += name + stylize(name, value, rulesList, stylesList, key2);
    }
  }
  return pid;
}
function composeStylize(cache, pid, rulesList, stylesList, className, isStyle) {
  for (const { selector, style: style2, isUnique } of stylesList) {
    const key2 = isStyle ? interpolate(selector, className) : selector;
    const id = isUnique ? `u\0${(++uniqueId).toString(36)}` : `s\0${pid}\0${style2}`;
    const item = new Style(style2, id);
    item.add(new Selector(key2, `k\0${pid}\0${key2}`));
    cache.add(item);
  }
  for (const { selector, style: style2, rules, styles } of rulesList) {
    const item = new Rule(selector, style2, `r\0${pid}\0${selector}\0${style2}`);
    composeStylize(item, pid, rules, styles, className, isStyle);
    cache.add(item);
  }
}
function join(arr) {
  let res = "";
  for (let i = 0; i < arr.length; i++)
    res += arr[i];
  return res;
}
const noopChanges = {
  add: () => void 0,
  change: () => void 0,
  remove: () => void 0
};
class Cache {
  constructor(changes = noopChanges) {
    this.changes = changes;
    this.sheet = [];
    this.changeId = 0;
    this._keys = [];
    this._children = /* @__PURE__ */ Object.create(null);
    this._counters = /* @__PURE__ */ Object.create(null);
  }
  add(style2) {
    const count = this._counters[style2.id] || 0;
    const item = this._children[style2.id] || style2.clone();
    this._counters[style2.id] = count + 1;
    if (count === 0) {
      this._children[item.id] = item;
      this._keys.push(item.id);
      this.sheet.push(item.getStyles());
      this.changeId++;
      this.changes.add(item, this._keys.length - 1);
    } else if (item instanceof Cache && style2 instanceof Cache) {
      const curIndex = this._keys.indexOf(style2.id);
      const prevItemChangeId = item.changeId;
      item.merge(style2);
      if (item.changeId !== prevItemChangeId) {
        this.sheet.splice(curIndex, 1, item.getStyles());
        this.changeId++;
        this.changes.change(item, curIndex, curIndex);
      }
    }
  }
  remove(style2) {
    const count = this._counters[style2.id];
    if (count) {
      this._counters[style2.id] = count - 1;
      const item = this._children[style2.id];
      const index = this._keys.indexOf(item.id);
      if (count === 1) {
        delete this._counters[style2.id];
        delete this._children[style2.id];
        this._keys.splice(index, 1);
        this.sheet.splice(index, 1);
        this.changeId++;
        this.changes.remove(item, index);
      } else if (item instanceof Cache && style2 instanceof Cache) {
        const prevChangeId = item.changeId;
        item.unmerge(style2);
        if (item.changeId !== prevChangeId) {
          this.sheet.splice(index, 1, item.getStyles());
          this.changeId++;
          this.changes.change(item, index, index);
        }
      }
    }
  }
  values() {
    return this._keys.map((key2) => this._children[key2]);
  }
  merge(cache) {
    for (const item of cache.values())
      this.add(item);
    return this;
  }
  unmerge(cache) {
    for (const item of cache.values())
      this.remove(item);
    return this;
  }
  clone() {
    return new Cache().merge(this);
  }
}
class Selector {
  constructor(selector, id) {
    this.selector = selector;
    this.id = id;
  }
  getStyles() {
    return this.selector;
  }
  clone() {
    return this;
  }
}
class Style extends Cache {
  constructor(style2, id) {
    super();
    this.style = style2;
    this.id = id;
  }
  getStyles() {
    return `${this.sheet.join(",")}{${this.style}}`;
  }
  clone() {
    return new Style(this.style, this.id).merge(this);
  }
}
class Rule extends Cache {
  constructor(rule, style2, id) {
    super();
    this.rule = rule;
    this.style = style2;
    this.id = id;
  }
  getStyles() {
    return `${this.rule}{${this.style}${join(this.sheet)}}`;
  }
  clone() {
    return new Rule(this.rule, this.style, this.id).merge(this);
  }
}
function key(pid, styles) {
  const key2 = `f${stringHash(pid)}`;
  return key2;
}
class FreeStyle extends Cache {
  constructor(id, changes) {
    super(changes);
    this.id = id;
  }
  registerStyle(styles) {
    const rulesList = [];
    const stylesList = [];
    const pid = stylize("&", styles, rulesList, stylesList);
    const id = key(pid);
    const selector = `.${id}`;
    composeStylize(this, pid, rulesList, stylesList, selector, true);
    return id;
  }
  registerKeyframes(keyframes) {
    return this.registerHashRule("@keyframes", keyframes);
  }
  registerHashRule(prefix, styles) {
    const rulesList = [];
    const stylesList = [];
    const pid = stylize("", styles, rulesList, stylesList);
    const id = key(pid);
    const selector = `${prefix} ${id}`;
    const rule = new Rule(selector, "", `h\0${pid}\0${prefix}`);
    composeStylize(rule, pid, rulesList, stylesList, "", false);
    this.add(rule);
    return id;
  }
  registerRule(rule, styles) {
    const rulesList = [];
    const stylesList = [];
    const pid = stylize(rule, styles, rulesList, stylesList);
    composeStylize(this, pid, rulesList, stylesList, "", false);
  }
  registerCss(styles) {
    return this.registerRule("", styles);
  }
  getStyles() {
    return join(this.sheet);
  }
  clone() {
    return new FreeStyle(this.id, this.changes).merge(this);
  }
}
function create(changes) {
  return new FreeStyle(`f${(++uniqueId).toString(36)}`, changes);
}
function convertToStyles(object) {
  var styles = {};
  for (var key2 in object) {
    var val = object[key2];
    if (key2 === "$nest") {
      var nested = val;
      for (var selector in nested) {
        var subproperties = nested[selector];
        styles[selector] = convertToStyles(subproperties);
      }
    } else if (key2 === "$debugName") {
      styles.$displayName = val;
    } else {
      styles[key2] = val;
    }
  }
  return styles;
}
function convertToKeyframes(frames) {
  var result = {};
  for (var offset in frames) {
    if (offset !== "$debugName") {
      result[offset] = frames[offset];
    }
  }
  if (frames.$debugName) {
    result.$displayName = frames.$debugName;
  }
  return result;
}
var raf = typeof requestAnimationFrame === "undefined" ? function(cb) {
  return setTimeout(cb);
} : typeof window === "undefined" ? requestAnimationFrame : requestAnimationFrame.bind(window);
function classes() {
  var classes2 = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    classes2[_i] = arguments[_i];
  }
  return classes2.map(function(c) {
    return c && typeof c === "object" ? Object.keys(c).map(function(key2) {
      return !!c[key2] && key2;
    }) : [c];
  }).reduce(function(flattened, c) {
    return flattened.concat(c);
  }, []).filter(function(c) {
    return !!c;
  }).join(" ");
}
function extend() {
  var objects = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    objects[_i] = arguments[_i];
  }
  var result = {};
  for (var _a = 0, objects_1 = objects; _a < objects_1.length; _a++) {
    var object = objects_1[_a];
    if (object == null || object === false) {
      continue;
    }
    for (var key2 in object) {
      var val = object[key2];
      if (!val && val !== 0) {
        continue;
      }
      if (key2 === "$nest" && val) {
        result[key2] = result["$nest"] ? extend(result["$nest"], val) : val;
      } else if (key2.indexOf("&") !== -1 || key2.indexOf("@media") === 0) {
        result[key2] = result[key2] ? extend(result[key2], val) : val;
      } else {
        result[key2] = val;
      }
    }
  }
  return result;
}
var createFreeStyle = function() {
  return create();
};
var TypeStyle = (
  /** @class */
  (function() {
    function TypeStyle2(_a) {
      var _this = this;
      var autoGenerateTag = _a.autoGenerateTag;
      this.cssRaw = function(mustBeValidCSS) {
        if (!mustBeValidCSS) {
          return;
        }
        _this._raw += mustBeValidCSS || "";
        _this._pendingRawChange = true;
        _this._styleUpdated();
      };
      this.cssRule = function(selector) {
        var objects = [];
        for (var _i = 1; _i < arguments.length; _i++) {
          objects[_i - 1] = arguments[_i];
        }
        var styles = convertToStyles(extend.apply(void 0, objects));
        _this._freeStyle.registerRule(selector, styles);
        _this._styleUpdated();
        return;
      };
      this.forceRenderStyles = function() {
        var target = _this._getTag();
        if (!target) {
          return;
        }
        target.textContent = _this.getStyles();
      };
      this.fontFace = function() {
        var fontFace = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          fontFace[_i] = arguments[_i];
        }
        var freeStyle2 = _this._freeStyle;
        for (var _a2 = 0, _b = fontFace; _a2 < _b.length; _a2++) {
          var face = _b[_a2];
          freeStyle2.registerRule("@font-face", face);
        }
        _this._styleUpdated();
        return;
      };
      this.getStyles = function() {
        return (_this._raw || "") + _this._freeStyle.getStyles();
      };
      this.keyframes = function(frames) {
        var keyframes = convertToKeyframes(frames);
        var animationName = _this._freeStyle.registerKeyframes(keyframes);
        _this._styleUpdated();
        return animationName;
      };
      this.reinit = function() {
        var freeStyle2 = createFreeStyle();
        _this._freeStyle = freeStyle2;
        _this._lastFreeStyleChangeId = freeStyle2.changeId;
        _this._raw = "";
        _this._pendingRawChange = false;
        var target = _this._getTag();
        if (target) {
          target.textContent = "";
        }
      };
      this.setStylesTarget = function(tag) {
        if (_this._tag) {
          _this._tag.textContent = "";
        }
        _this._tag = tag;
        _this.forceRenderStyles();
      };
      this.stylesheet = function(classes2) {
        var classNames = Object.getOwnPropertyNames(classes2);
        var result = {};
        for (var _i = 0, classNames_1 = classNames; _i < classNames_1.length; _i++) {
          var className = classNames_1[_i];
          var classDef = classes2[className];
          if (classDef) {
            classDef.$debugName = className;
            result[className] = _this.style(classDef);
          }
        }
        return result;
      };
      var freeStyle = createFreeStyle();
      this._autoGenerateTag = autoGenerateTag;
      this._freeStyle = freeStyle;
      this._lastFreeStyleChangeId = freeStyle.changeId;
      this._pending = 0;
      this._pendingRawChange = false;
      this._raw = "";
      this._tag = void 0;
      this.style = this.style.bind(this);
    }
    TypeStyle2.prototype._afterAllSync = function(cb) {
      var _this = this;
      this._pending++;
      var pending = this._pending;
      raf(function() {
        if (pending !== _this._pending) {
          return;
        }
        cb();
      });
    };
    TypeStyle2.prototype._getTag = function() {
      if (this._tag) {
        return this._tag;
      }
      if (this._autoGenerateTag) {
        var tag = typeof window === "undefined" ? { textContent: "" } : document.createElement("style");
        if (typeof document !== "undefined") {
          document.head.appendChild(tag);
        }
        this._tag = tag;
        return tag;
      }
      return void 0;
    };
    TypeStyle2.prototype._styleUpdated = function() {
      var _this = this;
      var changeId = this._freeStyle.changeId;
      var lastChangeId = this._lastFreeStyleChangeId;
      if (!this._pendingRawChange && changeId === lastChangeId) {
        return;
      }
      this._lastFreeStyleChangeId = changeId;
      this._pendingRawChange = false;
      this._afterAllSync(function() {
        return _this.forceRenderStyles();
      });
    };
    TypeStyle2.prototype.style = function() {
      var className = this._freeStyle.registerStyle(convertToStyles(extend.apply(void 0, arguments)));
      this._styleUpdated();
      return className;
    };
    return TypeStyle2;
  })()
);
var ts = new TypeStyle({ autoGenerateTag: true });
ts.setStylesTarget;
var cssRaw = ts.cssRaw;
var cssRule = ts.cssRule;
ts.forceRenderStyles;
ts.fontFace;
ts.getStyles;
ts.keyframes;
ts.reinit;
var style = ts.style;
ts.stylesheet;
function createTypeStyle(target) {
  var instance = new TypeStyle({ autoGenerateTag: false });
  return instance;
}
export {
  createTypeStyle as a,
  cssRule as b,
  classes as c,
  cssRaw as d,
  style as s
};
