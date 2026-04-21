import { n as __esmMin } from "./rolldown-runtime-CSj9S6Td.js";
import { h as BeanScopeBase, j as BeanBase, k as BeanInfo } from "./zova-DlmeBQBK.js";
import { t as init_src$1 } from "./zova-B7GgTsx0.js";
import { o as Scope, t as init_src$2 } from "./a-bean-BnjLZzu4.js";
import { n as TableCell, t as init_src$3 } from "./a-table-Dz7ksKZd.js";
import { n as init_luxon, t as DateTime } from "./src-W2i8G81j.js";
//#region src/suite-vendor/a-zova/modules/a-date/src/bean/tableCell.date.tsx
var _dec$1, _dec2$1, _class$1, TableCellDate;
var init_tableCell_date = __esmMin((() => {
	init_src$1();
	init_luxon();
	init_src$3();
	TableCellDate = (_dec$1 = TableCell({ dateFormat: { preset: "DATETIME_SHORT" } }), _dec2$1 = BeanInfo({ module: "a-date" }), _dec$1(_class$1 = _dec2$1(_class$1 = class TableCellDate extends BeanBase {
		render(options, _renderContext, next) {
			const value = next();
			if (!value) return;
			const dateFormat = options.dateFormat;
			if (!dateFormat) return value;
			const datetime = DateTime.fromJSDate(value);
			if (typeof dateFormat === "string") return datetime.toFormat(dateFormat);
			else if (typeof dateFormat === "object" && dateFormat.preset) return datetime.toLocaleString(DateTime[dateFormat.preset]);
			return value;
		}
	}) || _class$1) || _class$1);
}));
//#endregion
//#region src/suite-vendor/a-zova/modules/a-date/src/.metadata/index.ts
/** tableCell: end */
/** scope: begin */
var _dec, _dec2, _class, ScopeModuleADate;
var init__metadata = __esmMin((() => {
	init_src$1();
	init_tableCell_date();
	init_src$3();
	init_src$2();
	ScopeModuleADate = (_dec = Scope(), _dec2 = BeanInfo({ module: "a-date" }), _dec(_class = _dec2(_class = class ScopeModuleADate extends BeanScopeBase {}) || _class) || _class);
}));
/** scope: end */
//#endregion
//#region src/suite-vendor/a-zova/modules/a-date/src/index.ts
var init_src = __esmMin((() => {
	init__metadata();
}));
//#endregion
export { ScopeModuleADate as n, TableCellDate as r, init_src as t };
