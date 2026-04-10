import { n as __esmMin } from "./rolldown-runtime-CSj9S6Td.js";
import { C as onMounted, d as defineComponent, k as watch, p as h, w as onUnmounted } from "./vue-DeT-l8pH.js";
import { n as init_vue_runtime_esm_bundler } from "./vue-C_EuNVEw.js";
import { d as _objectSpread2, f as init_objectSpread2 } from "./fecha-5qJk_cbF.js";
import { a as FormApi, i as FieldApi, n as useStore, r as init_esm$1, t as init_esm$2 } from "./esm-B9JOh45W.js";
//#region node_modules/.pnpm/@tanstack+vue-form@1.28.5_vue@3.5.30_typescript@5.9.3_/node_modules/@tanstack/vue-form/dist/esm/useField.js
function useField(opts) {
	const fieldApi = (() => {
		const extendedApi = new FieldApi(_objectSpread2(_objectSpread2({}, opts), {}, {
			form: opts.form,
			name: opts.name
		}));
		extendedApi.Field = Field;
		return extendedApi;
	})();
	const fieldState = useStore(fieldApi.store, (state) => state);
	let cleanup;
	onMounted(() => {
		cleanup = fieldApi.mount();
	});
	onUnmounted(() => {
		cleanup();
	});
	watch(() => opts, () => {
		fieldApi.update(_objectSpread2(_objectSpread2({}, opts), {}, { form: opts.form }));
	});
	return {
		api: fieldApi,
		state: fieldState
	};
}
var Field;
var init_useField = __esmMin((() => {
	init_esm$1();
	init_esm$2();
	init_vue_runtime_esm_bundler();
	init_objectSpread2();
	Field = defineComponent((fieldOptions, context) => {
		const fieldApi = useField(_objectSpread2(_objectSpread2({}, fieldOptions), context.attrs));
		return () => context.slots.default({
			field: fieldApi.api,
			state: fieldApi.state.value
		});
	}, {
		name: "Field",
		inheritAttrs: false
	});
}));
//#endregion
//#region node_modules/.pnpm/@tanstack+vue-form@1.28.5_vue@3.5.30_typescript@5.9.3_/node_modules/@tanstack/vue-form/dist/esm/useForm.js
function useForm(opts) {
	const formApi = (() => {
		const api = new FormApi(opts);
		const extendedApi = api;
		extendedApi.Field = defineComponent((props, context) => {
			return () => h(Field, _objectSpread2(_objectSpread2(_objectSpread2({}, props), context.attrs), {}, { form: api }), context.slots);
		}, {
			name: "APIField",
			inheritAttrs: false
		});
		extendedApi.useField = (props) => {
			return useField(_objectSpread2(_objectSpread2({}, props), {}, { form: api }));
		};
		extendedApi.useStore = (selector) => {
			return useStore(api.store, selector);
		};
		extendedApi.Subscribe = defineComponent((props, context) => {
			var _allProps$selector;
			const selector = (_allProps$selector = _objectSpread2(_objectSpread2({}, props), context.attrs).selector) !== null && _allProps$selector !== void 0 ? _allProps$selector : ((state) => state);
			const data = useStore(api.store, selector);
			return () => context.slots.default(data.value);
		}, {
			name: "Subscribe",
			inheritAttrs: false
		});
		return extendedApi;
	})();
	onMounted(formApi.mount);
	formApi.update(opts);
	return formApi;
}
var init_useForm = __esmMin((() => {
	init_esm$1();
	init_esm$2();
	init_vue_runtime_esm_bundler();
	init_useField();
	init_objectSpread2();
}));
//#endregion
//#region node_modules/.pnpm/@tanstack+vue-form@1.28.5_vue@3.5.30_typescript@5.9.3_/node_modules/@tanstack/vue-form/dist/esm/index.js
var init_esm = __esmMin((() => {
	init_esm$1();
	init_esm$2();
	init_useField();
	init_useForm();
}));
//#endregion
export { useForm as n, useField as r, init_esm as t };
