let __schemaRefCustomFn;
export function setSchemaRefCustom(schemaRefCustomFn: Function) {
  __schemaRefCustomFn = schemaRefCustomFn;
}

export function performSchemaRefCustom(params: any[]) {
  return __schemaRefCustomFn(params);
}
