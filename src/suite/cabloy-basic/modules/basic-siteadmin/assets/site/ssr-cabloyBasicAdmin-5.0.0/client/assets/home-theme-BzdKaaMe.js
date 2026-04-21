import { n as __esmMin } from "./rolldown-runtime-CSj9S6Td.js";
import { m as init_asyncToGenerator, p as _asyncToGenerator } from "./fecha-DgbeIgox.js";
import { K as useComputed, h as BeanScopeBase, j as BeanBase, k as BeanInfo } from "./zova-DlmeBQBK.js";
import { t as init_src$1 } from "./zova-B7GgTsx0.js";
import { o as Scope, t as init_src$2 } from "./a-bean-BnjLZzu4.js";
import { a as Theme, i as Css, n as BeanThemeBase, t as init_src$3 } from "./a-style-CSJfCPMi.js";
//#region src/suite/a-home/modules/home-theme/src/types/style.ts
var init_style = __esmMin((() => {
	init_src$1();
}));
//#endregion
//#region src/suite/a-home/modules/home-theme/src/types/themeToken.ts
var init_themeToken = __esmMin((() => {
	init_src$3();
}));
//#endregion
//#region src/suite/a-home/modules/home-theme/src/types/index.ts
var init_types = __esmMin((() => {
	init_style();
	init_themeToken();
}));
//#endregion
//#region src/suite/a-home/modules/home-theme/src/bean/css.default.ts
var _dec$3, _dec2$3, _class$3, CssDefault;
var init_css_default = __esmMin((() => {
	init_asyncToGenerator();
	init_src$1();
	init_src$3();
	CssDefault = (_dec$3 = Css(), _dec2$3 = BeanInfo({ module: "home-theme" }), _dec$3(_class$3 = _dec2$3(_class$3 = class CssDefault extends BeanBase {
		constructor(...args) {
			super(...args);
			this.textCenter = void 0;
			this.buttonPrimary = void 0;
		}
		__init__() {
			var _this = this;
			return _asyncToGenerator(function* () {
				_this.textCenter = _this.$style({ textAlign: "center" });
				_this.buttonPrimary = useComputed(() => {
					return _this.$style({
						color: _this.$token.color.primary,
						borderColor: _this.$token.var.borderColor
					});
				});
			})();
		}
	}) || _class$3) || _class$3);
}));
//#endregion
//#region src/suite/a-home/modules/home-theme/src/bean/theme.default.ts
var _dec$2, _dec2$2, _class$2, ThemeDefault;
var init_theme_default = __esmMin((() => {
	init_asyncToGenerator();
	init_src$1();
	init_src$3();
	ThemeDefault = (_dec$2 = Theme(), _dec2$2 = BeanInfo({ module: "home-theme" }), _dec$2(_class$2 = _dec2$2(_class$2 = class ThemeDefault extends BeanThemeBase {
		apply({ name, dark }) {
			var _this = this;
			return _asyncToGenerator(function* () {
				const token = {
					color: { primary: "oklch(45% 0.24 277.023)" },
					var: { borderColor: "#297acc" },
					component: { page: {
						background: dark ? "#121212" : "#fff",
						color: dark ? "#fff" : "#000"
					} }
				};
				return { token: _this.mergeOptionsToken({
					name,
					dark
				}, token) };
			})();
		}
	}) || _class$2) || _class$2);
}));
//#endregion
//#region src/suite/a-home/modules/home-theme/src/bean/theme.orange.ts
var _dec$1, _dec2$1, _class$1, ThemeOrange;
var init_theme_orange = __esmMin((() => {
	init_asyncToGenerator();
	init_src$1();
	init_src$3();
	ThemeOrange = (_dec$1 = Theme(), _dec2$1 = BeanInfo({ module: "home-theme" }), _dec$1(_class$1 = _dec2$1(_class$1 = class ThemeOrange extends BeanThemeBase {
		apply({ name, dark }) {
			var _this = this;
			return _asyncToGenerator(function* () {
				const token = {
					color: { primary: "#f28238" },
					var: { borderColor: "#f28d49" },
					component: { page: {
						background: dark ? "oklch(25.33% 0.016 252.42)" : "#fff",
						color: dark ? "#fff" : "#000"
					} }
				};
				return { token: _this.mergeOptionsToken({
					name,
					dark
				}, token) };
			})();
		}
	}) || _class$1) || _class$1);
}));
//#endregion
//#region src/suite/a-home/modules/home-theme/src/.metadata/index.ts
/** theme: end */
/** scope: begin */
var _dec, _dec2, _class, ScopeModuleHomeTheme;
var init__metadata = __esmMin((() => {
	init_src$1();
	init_css_default();
	init_src$3();
	init_theme_default();
	init_theme_orange();
	init_src$2();
	ScopeModuleHomeTheme = (_dec = Scope(), _dec2 = BeanInfo({ module: "home-theme" }), _dec(_class = _dec2(_class = class ScopeModuleHomeTheme extends BeanScopeBase {}) || _class) || _class);
}));
/** scope: end */
//#endregion
//#region src/suite/a-home/modules/home-theme/src/index.ts
var init_src = __esmMin((() => {
	init_types();
	init__metadata();
}));
//#endregion
export { CssDefault as a, ThemeDefault as i, ScopeModuleHomeTheme as n, ThemeOrange as r, init_src as t };
