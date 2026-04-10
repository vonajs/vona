import { n as __esmMin } from "./rolldown-runtime-CSj9S6Td.js";
import { m as init_asyncToGenerator, p as _asyncToGenerator } from "./fecha-5qJk_cbF.js";
import { M as BeanBase, X as cast, h as BeanScopeBase, k as BeanInfo } from "./zova-BXlOOlVL.js";
import { t as init_src$1 } from "./zova-BJ0Q7wHc.js";
import { o as Scope, t as init_src$2 } from "./a-bean-BQjv0q8B.js";
import { r as Action, t as init_src$3 } from "./a-action-DB97KZki.js";
//#region src/suite-vendor/a-cabloy/modules/rest-actions/src/bean/action.alert.tsx
var _dec$8, _dec2$8, _class$8, ActionAlert;
var init_action_alert = __esmMin((() => {
	init_src$1();
	init_src$3();
	ActionAlert = (_dec$8 = Action({ wait: true }), _dec2$8 = BeanInfo({ module: "rest-actions" }), _dec$8(_class$8 = _dec2$8(_class$8 = class ActionAlert extends BeanBase {
		execute(options, _renderContext, next) {
			if (options.wait) window.alert(options.message);
			else setTimeout(() => {
				window.alert(options.message);
			}, 0);
			return next();
		}
	}) || _class$8) || _class$8);
}));
//#endregion
//#region src/suite-vendor/a-cabloy/modules/rest-actions/src/bean/action.confirm.tsx
var _dec$7, _dec2$7, _class$7, ActionConfirm;
var init_action_confirm = __esmMin((() => {
	init_src$1();
	init_src$3();
	ActionConfirm = (_dec$7 = Action(), _dec2$7 = BeanInfo({ module: "rest-actions" }), _dec$7(_class$7 = _dec2$7(_class$7 = class ActionConfirm extends BeanBase {
		execute(options, _renderContext, next) {
			return next(window.confirm(options.message));
		}
	}) || _class$7) || _class$7);
}));
//#endregion
//#region src/suite-vendor/a-cabloy/modules/rest-actions/src/bean/action.copy.tsx
var _dec$6, _dec2$6, _class$6, ActionCopy;
var init_action_copy = __esmMin((() => {
	init_src$1();
	init_src$3();
	ActionCopy = (_dec$6 = Action(), _dec2$6 = BeanInfo({ module: "rest-actions" }), _dec$6(_class$6 = _dec2$6(_class$6 = class ActionCopy extends BeanBase {
		execute(options, _renderContext, next) {
			return next(navigator.clipboard.writeText(options.text));
		}
	}) || _class$6) || _class$6);
}));
//#endregion
//#region src/suite-vendor/a-cabloy/modules/rest-actions/src/bean/action.create.tsx
var _dec$5, _dec2$5, _class$5, ActionCreate;
var init_action_create = __esmMin((() => {
	init_src$1();
	init_src$3();
	ActionCreate = (_dec$5 = Action(), _dec2$5 = BeanInfo({ module: "rest-actions" }), _dec$5(_class$5 = _dec2$5(_class$5 = class ActionCreate extends BeanBase {
		execute(options, renderContext, next) {
			const { $host } = renderContext;
			let resource;
			if (renderContext.$scene === "page") {
				var _options$resource;
				const { $celScope } = renderContext;
				resource = (_options$resource = options.resource) !== null && _options$resource !== void 0 ? _options$resource : $celScope.resource;
			}
			if (!resource) throw new Error(`should specify resource in scene: ${renderContext.$scene}`);
			const url = $host.$router.getPagePath("/rest/resource/:resource/create", { params: { resource } });
			$host.$router.push(url);
			return next();
		}
	}) || _class$5) || _class$5);
}));
//#endregion
//#region src/suite-vendor/a-cabloy/modules/rest-actions/src/bean/action.delete.tsx
var _dec$4, _dec2$4, _class$4, ActionDelete;
var init_action_delete = __esmMin((() => {
	init_asyncToGenerator();
	init_src$1();
	init_src$3();
	ActionDelete = (_dec$4 = Action(), _dec2$4 = BeanInfo({ module: "rest-actions" }), _dec$4(_class$4 = _dec2$4(_class$4 = class ActionDelete extends BeanBase {
		execute(options, renderContext, next) {
			return _asyncToGenerator(function* () {
				if (renderContext.$scene === "tableCell") {
					var _options$id, _$celScope$onActionRo;
					const { $celScope, cellContext } = renderContext;
					const id = (_options$id = options.id) !== null && _options$id !== void 0 ? _options$id : cellContext.row.id;
					yield (_$celScope$onActionRo = $celScope.onActionRow) === null || _$celScope$onActionRo === void 0 ? void 0 : _$celScope$onActionRo.call($celScope, "delete", id);
				}
				return next();
			})();
		}
	}) || _class$4) || _class$4);
}));
//#endregion
//#region src/suite-vendor/a-cabloy/modules/rest-actions/src/bean/action.edit.tsx
var _dec$3, _dec2$3, _class$3, ActionEdit;
var init_action_edit = __esmMin((() => {
	init_src$1();
	init_src$3();
	ActionEdit = (_dec$3 = Action(), _dec2$3 = BeanInfo({ module: "rest-actions" }), _dec$3(_class$3 = _dec2$3(_class$3 = class ActionEdit extends BeanBase {
		execute(options, renderContext, next) {
			const { $host } = renderContext;
			let resource;
			let id;
			if (renderContext.$scene === "tableCell") {
				var _options$resource, _options$id;
				const { $celScope, cellContext } = renderContext;
				resource = (_options$resource = options.resource) !== null && _options$resource !== void 0 ? _options$resource : $celScope.resource;
				id = (_options$id = options.id) !== null && _options$id !== void 0 ? _options$id : cellContext.row.id;
			}
			if (!resource || !id) throw new Error(`should specify resource or id in scene: ${renderContext.$scene}`);
			const url = $host.$router.getPagePath("/rest/resource/:resource/:id/:formScene?", { params: {
				resource,
				id,
				formScene: "edit"
			} });
			$host.$router.push(url);
			return next();
		}
	}) || _class$3) || _class$3);
}));
//#endregion
//#region src/suite-vendor/a-cabloy/modules/rest-actions/src/bean/action.setValue.tsx
var _dec$2, _dec2$2, _class$2, ActionSetValue;
var init_action_setValue = __esmMin((() => {
	init_src$1();
	init_src$3();
	ActionSetValue = (_dec$2 = Action(), _dec2$2 = BeanInfo({ module: "rest-actions" }), _dec$2(_class$2 = _dec2$2(_class$2 = class ActionSetValue extends BeanBase {
		execute(options, renderContext, next) {
			if (renderContext.$scene === "formField") {
				var _options$name, _cast, _$jsx$event;
				const { $celScope, $jsx, $$form } = renderContext;
				const name = (_options$name = options.name) !== null && _options$name !== void 0 ? _options$name : $celScope.name;
				const value = options.value !== void 0 ? options.value : (_cast = cast((_$jsx$event = $jsx.event) === null || _$jsx$event === void 0 ? void 0 : _$jsx$event.target)) === null || _cast === void 0 ? void 0 : _cast.value;
				$$form.setFieldValue(name, value, options.disableNotifyChanged);
			}
			return next();
		}
	}) || _class$2) || _class$2);
}));
//#endregion
//#region src/suite-vendor/a-cabloy/modules/rest-actions/src/bean/action.view.tsx
var _dec$1, _dec2$1, _class$1, ActionView;
var init_action_view = __esmMin((() => {
	init_src$1();
	init_src$3();
	ActionView = (_dec$1 = Action(), _dec2$1 = BeanInfo({ module: "rest-actions" }), _dec$1(_class$1 = _dec2$1(_class$1 = class ActionView extends BeanBase {
		execute(options, renderContext, next) {
			const { $host } = renderContext;
			let resource;
			let id;
			if (renderContext.$scene === "tableCell") {
				var _options$resource, _options$id;
				const { $celScope, cellContext } = renderContext;
				resource = (_options$resource = options.resource) !== null && _options$resource !== void 0 ? _options$resource : $celScope.resource;
				id = (_options$id = options.id) !== null && _options$id !== void 0 ? _options$id : cellContext.row.id;
			}
			if (!resource || !id) throw new Error(`should specify resource or id in scene: ${renderContext.$scene}`);
			const url = $host.$router.getPagePath("/rest/resource/:resource/:id/:formScene?", { params: {
				resource,
				id
			} });
			$host.$router.push(url);
			return next();
		}
	}) || _class$1) || _class$1);
}));
//#endregion
//#region src/suite-vendor/a-cabloy/modules/rest-actions/src/.metadata/index.ts
/** action: end */
/** scope: begin */
var _dec, _dec2, _class, ScopeModuleRestActions;
var init__metadata = __esmMin((() => {
	init_src$1();
	init_action_alert();
	init_action_confirm();
	init_action_copy();
	init_action_create();
	init_action_delete();
	init_action_edit();
	init_action_setValue();
	init_action_view();
	init_src$3();
	init_src$2();
	ScopeModuleRestActions = (_dec = Scope(), _dec2 = BeanInfo({ module: "rest-actions" }), _dec(_class = _dec2(_class = class ScopeModuleRestActions extends BeanScopeBase {}) || _class) || _class);
}));
/** scope: end */
//#endregion
//#region src/suite-vendor/a-cabloy/modules/rest-actions/src/types/actions.ts
var init_actions = __esmMin((() => {
	init_src$3();
}));
//#endregion
//#region src/suite-vendor/a-cabloy/modules/rest-actions/src/types/index.ts
var init_types = __esmMin((() => {
	init_actions();
}));
//#endregion
//#region src/suite-vendor/a-cabloy/modules/rest-actions/src/index.ts
var init_src = __esmMin((() => {
	init__metadata();
	init_types();
}));
//#endregion
export { ActionEdit as a, ActionCopy as c, ActionSetValue as i, ActionConfirm as l, ScopeModuleRestActions as n, ActionDelete as o, ActionView as r, ActionCreate as s, init_src as t, ActionAlert as u };
