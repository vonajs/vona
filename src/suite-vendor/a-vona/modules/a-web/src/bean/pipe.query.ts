import type { MetadataKey } from 'vona';
import type { IDecoratorPipeOptions, IDecoratorPipeOptionsArgument, IPipeTransform } from 'vona-module-a-aspect';
import type { RouteHandlerArgumentMeta } from 'vona-module-a-openapi';
import type { SchemaLike } from 'vona-module-a-openapiutils';
import type { IQueryParams } from 'vona-module-a-orm';
import type { ValidatorOptions } from 'vona-module-a-validation';
import type z from 'zod';
import { isNil } from '@cabloy/utils';
import { ZodMetadata } from '@cabloy/zod-query';
import { appMetadata, BeanBase, cast, HttpStatus } from 'vona';
import { Pipe, setArgumentPipe } from 'vona-module-a-aspect';
import { makeSchemaLikes } from 'vona-module-a-openapi';

export interface IPipeOptionsQuery extends IDecoratorPipeOptions, IDecoratorPipeOptionsArgument, ValidatorOptions {}

const __FieldsSystem = ['columns', 'where', 'orders', 'pageNo', 'pageSize'];

@Pipe<IPipeOptionsQuery>({
  // ValidatorOptions
  disableErrorMessages: false,
  errorHttpStatusCode: HttpStatus.BAD_REQUEST,
  passthrough: false,
  strict: false,
})
export class PipeQuery extends BeanBase implements IPipeTransform<any> {
  async transform(value: any, metadata: RouteHandlerArgumentMeta, options: IPipeOptionsQuery) {
    if (!options.schema) throw new Error(`should specify the schema of pipeQuery: ${metadata.controller.name}.${metadata.method}#${metadata.index}`);
    // validateSchema
    value = await this.bean.validator.validateSchema(options.schema, value, options, metadata.field);
    // transform
    value = this._transform(value, options.schema);
    // ok
    return value;
  }

  private _transform(value: any, schema: z.ZodSchema) {
    // 1. system: columns/where/orders/pageNo/pageSize
    const params = this._transformSystem(value);
    // 2. fields
    return this._transformFields(params, value, schema);
  }

  // system: columns/where/orders/pageNo/pageSize
  private _transformSystem(value: any) {
    const params: IQueryParams = {};
    // columns
    if (!isNil(value.columns)) params.columns = value.columns;
    // where
    params.where = value.where ?? {};
    // orders
    if (!isNil(value.orders)) {
      if (typeof value.orders === 'string') {
        if (value.orders[0] === '[') {
          params.orders = JSON.parse(value.orders);
        } else {
          params.orders = [value.orders.split(',')];
        }
      } else {
        params.orders = value.orders;
      }
    }
    // pageNo/pageSize
    if (!isNil(value.pageNo) && !isNil(value.pageSize)) {
      params.offset = (value.pageNo - 1) * value.pageSize;
      params.limit = value.pageSize;
    }
    // ok
    return params;
  }

  private _transformFields(params: IQueryParams, value: any, schema: z.ZodSchema) {
    for (const key in value) {
      if (__FieldsSystem.includes(key)) continue;
      if (params.where![key]) continue;
      const innerSchema = ZodMetadata.unwrapChained(cast(schema).shape[key]);
      if (!innerSchema) continue;
      const typeName = innerSchema._def.typeName;
      if (typeName === 'ZodString') {
        params.where![key] = { _includesI_: value[key] };
      } else {
        params.where![key] = value[key];
      }
    }
    return params;
  }
}

export const ArgQuery = function (...schemaLikes: SchemaLike[]): any {
  return function (target: object, prop: MetadataKey | undefined, index: number) {
    const paramtypes = appMetadata.getMetadata<any[]>('design:paramtypes', target, prop)!;
    const metaType = paramtypes[index];
    const schema = makeSchemaLikes(schemaLikes, metaType);
    setArgumentPipe('a-web:query', { type: 'query', schema }, target, prop, index);
  };
};
