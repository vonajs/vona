

















































//#endregion
//#region .zova-rest/utils.ts
function $iconName(name) {
	return name;
}
function Action(options) {
	if (!options.name) throw new Error("should specify the action name");
	return options.name.replace(":", ".action.");
}
function Component(options) {
	if (!options.name) throw new Error("should specify the component name");
	return options.name;
}
const OrderLevelBaseMap = {
	core: 100,
	business: 1e3,
	max: 1e5
};
function _generalSchemaRest(schema, options, scene) {
	return schema.openapi(scene ? { rest: { [scene]: options } } : { rest: options });
}
function _order(order, level) {
	return OrderLevelBaseMap[level ?? "business"] + order;
}
//#endregion
//#region .zova-rest/component.ts
function schemaRenderField(name, options, scene) {
	return function(schema) {
		return _generalSchemaRest(schema, options !== void 0 ? {
			render: name,
			options
		} : { render: name }, scene ?? "form");
	};
}
function schemaRenderFieldJsx(renderComponentJsx, scene) {
	return function(schema) {
		return _generalSchemaRest(schema, { render: renderComponentJsx }, scene ?? "form");
	};
}
function schemaRenderCell(name, options) {
	return function(schema) {
		return _generalSchemaRest(schema, options !== void 0 ? {
			render: name,
			columnProps: options
		} : { render: name }, "table");
	};
}
function schemaRenderCellJsx(renderComponentJsx) {
	return function(schema) {
		return _generalSchemaRest(schema, { render: renderComponentJsx }, "table");
	};
}
function schemaRenderActionRow(name, options) {
	return {
		$$typeof: "zova-jsx:actionRow",
		name,
		render: "Action" + toUpperCaseFirstChar(name),
		options
	};
}
function schemaRenderActionRowJsx(name, renderComponentJsx) {
	return {
		name,
		render: renderComponentJsx
	};
}
function schemaRenderActionBulk(name, options) {
	return {
		$$typeof: "zova-jsx:actionBulk",
		name,
		render: "Action" + toUpperCaseFirstChar(name),
		options
	};
}
function schemaRenderActionBulkJsx(name, renderComponentJsx) {
	return {
		name,
		render: renderComponentJsx
	};
}
function schemaRenderBlock(name, options) {
	return {
		$$typeof: "zova-jsx:block",
		render: name,
		options
	};
}
function schemaRenderBlockJsx(renderComponentJsx) {
	return { render: renderComponentJsx };
}
//#endregion
//#region .zova-rest/rest.ts
function schemaRenderLayout(layoutOptions, scene) {
	return function(schema) {
		return _generalSchemaRest(schema, { layout: layoutOptions }, scene);
	};
}
function schemaRenderVisible(visible, scene) {
	return function(schema) {
		return _generalSchemaRest(schema, { visible }, scene);
	};
}
function schemaRenderReadonly(readonly, scene) {
	return function(schema) {
		return _generalSchemaRest(schema, { readonly }, scene);
	};
}
function schemaRenderDisableNotifyChanged(disableNotifyChanged, scene) {
	return function(schema) {
		return _generalSchemaRest(schema, { disableNotifyChanged }, scene);
	};
}
function schemaRenderFieldSource(fieldSource, scene) {
	return function(schema) {
		return _generalSchemaRest(schema, { fieldSource }, scene);
	};
}
function schemaRenderOrder(order, level, scene) {
	const orderReal = _order(order, level);
	return function(schema) {
		return _generalSchemaRest(schema, { order: orderReal }, scene);
	};
}
//#endregion
//#region .zova-rest/render.ts
const render = {
	layout: schemaRenderLayout,
	visible: schemaRenderVisible,
	readonly: schemaRenderReadonly,
	order: schemaRenderOrder,
	disableNotifyChanged: schemaRenderDisableNotifyChanged,
	fieldSource: schemaRenderFieldSource,
	field: schemaRenderField,
	fieldJsx: schemaRenderFieldJsx,
	cell: schemaRenderCell,
	cellJsx: schemaRenderCellJsx,
	actionRow: schemaRenderActionRow,
	actionRowJsx: schemaRenderActionRowJsx,
	actionBulk: schemaRenderActionBulk,
	actionBulkJsx: schemaRenderActionBulkJsx,
	block: schemaRenderBlock,
	blockJsx: schemaRenderBlockJsx
};
//#endregion
export { $iconName, Action, Component, render };
