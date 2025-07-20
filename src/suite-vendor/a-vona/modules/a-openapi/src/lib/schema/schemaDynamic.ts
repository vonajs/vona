import type { Constructable } from 'vona';

const __schemasDynamic: Record<string, Constructable> = {};

export function addSchemaDynamic(dynamicName: string, classType: Constructable) {
  __schemasDynamic[dynamicName] = classType;
}

export function getSchemaDynamic(dynamicName: string) {
  return __schemasDynamic[dynamicName];
}

export function getSchemasDynamic() {
  return __schemasDynamic;
}
