import type { MetadataKey } from 'vona';
import { getTargetDecoratorRules } from 'vona-module-a-openapi';

export function Exclude(): PropertyDecorator {
  return function (target: object, prop: MetadataKey) {
    // rules
    const rules = getTargetDecoratorRules(target);
    // rule
    rules[prop as string] = makeSchemaLikes(schemaLikes, metaType);
  };
}

export const Serializer = {};
