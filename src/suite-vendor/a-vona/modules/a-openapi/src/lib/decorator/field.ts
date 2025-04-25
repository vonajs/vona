import type { MetadataKey } from 'vona';
import type { SchemaLike } from '../../types/decorator.ts';
import { appMetadata } from 'vona';
import { makeSchemaLikes } from '../schema/makeSchemaLikes.ts';
import { getTargetDecoratorRuleColumns, getTargetDecoratorRules } from '../utils.ts';

export function Field(...schemaLikes: SchemaLike[]): PropertyDecorator {
  return function (target: object, prop: MetadataKey) {
    // rules
    const rules = getTargetDecoratorRules(target);
    // rule
    const metaType = appMetadata.getDesignType(target, prop);
    rules[prop] = makeSchemaLikes(schemaLikes, metaType);
    //
    const columns = getTargetDecoratorRuleColumns(target);
    columns[prop] = prop;
  };
}
