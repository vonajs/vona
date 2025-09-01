import type { MetadataKey } from 'vona';
import type { IDecoratorPipeOptions, IPipeTransform } from 'vona-module-a-aspect';
import type { RouteHandlerArgumentMeta } from 'vona-module-a-openapi';
import type { SchemaLike } from 'vona-module-a-openapiutils';
import { appMetadata, BeanBase } from 'vona';
import { Pipe, setArgumentPipe } from 'vona-module-a-aspect';
import { makeSchemaLikes } from 'vona-module-a-openapi';

export interface IPipeOptionsQuery extends IDecoratorPipeOptions {}

@Pipe<IPipeOptionsQuery>()
export class PipeQuery extends BeanBase implements IPipeTransform<any> {
  async transform(value: any, _metadata: RouteHandlerArgumentMeta, _options: IPipeOptionsQuery) {
    return value + 1;
  }
}

export const ArgQuery = function (...schemaLikes: SchemaLike[]): any {
  return function (target: object, prop: MetadataKey | undefined, index: number) {
    const paramtypes = appMetadata.getMetadata<any[]>('design:paramtypes', target, prop)!;
    const metaType = paramtypes[index];
    const schema = makeSchemaLikes(schemaLikes, metaType);
    setArgumentPipe('a-orm:query', { type: 'query', schema }, target, prop, index);
  };
};
