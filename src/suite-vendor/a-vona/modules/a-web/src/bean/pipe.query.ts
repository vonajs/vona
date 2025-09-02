import type { VonaContext } from 'vona';
import type { IDecoratorPipeOptions, IDecoratorPipeOptionsArgument, IPipeTransform } from 'vona-module-a-aspect';
import type { ISchemaObjectExtensionField, RouteHandlerArgumentMeta } from 'vona-module-a-openapi';
import type { IQueryParams } from 'vona-module-a-orm';
import type { ValidatorOptions } from 'vona-module-a-validation';
import type z from 'zod';
import { isNil } from '@cabloy/utils';
import { ZodMetadata } from '@cabloy/zod-query';
import { BeanBase, cast, HttpStatus } from 'vona';
import { createArgumentPipe, Pipe } from 'vona-module-a-aspect';

export interface IPipeOptionsQuery extends IDecoratorPipeOptions, IDecoratorPipeOptionsArgument, ValidatorOptions {
  transform?: TypePipeOptionsQueryTransform;
}

export interface IPipeOptionsQueryTransformInfo {
  params: IQueryParams;
  query: any;
  options: IPipeOptionsQuery;
  originalName: string;
  fullName: string;
  key: string;
  value: any;
  schema: z.ZodSchema;
  openapi: ISchemaObjectExtensionField;
}
export type TypePipeOptionsQueryTransform =
  (ctx: VonaContext, info: IPipeOptionsQueryTransformInfo) => boolean | undefined;

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
    value = this._transform(value, options);
    // ok
    return value;
  }

  private _transform(value: any, options: IPipeOptionsQuery) {
    // 1. system: columns/where/orders/pageNo/pageSize
    const params = this._transformSystem(value);
    // 2. fields
    return this._transformFields(params, value, options);
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

  private _transformFields(params: IQueryParams, value: any, options: IPipeOptionsQuery) {
    for (const key in value) {
      if (__FieldsSystem.includes(key)) continue;
      const fieldSchema = ZodMetadata.unwrapChained(cast(options.schema).shape[key]);
      if (!fieldSchema) continue;
      // openapi
      const openapi: ISchemaObjectExtensionField = ZodMetadata.getInternalMetadata(cast(options.schema).shape[key]);
      // name
      const originalName = openapi.query?.originalName ?? key;
      let fullName: string;
      // joins
      if (openapi.query?.join) {
        if (!params.joins)params.joins = [];
        const joinType = openapi.query.join.type ?? 'innerJoin';
        const joinTable = openapi.query.join.table;
        const joinOn = openapi.query.join.on;
        if (params.joins.findIndex(item => item[1] === joinTable) === -1) {
          params.joins.push([joinType, joinTable, joinOn] as any);
        }
        fullName = `${joinTable}.${originalName}`;
      } else {
        fullName = originalName;
      }
      // check where
      if (params.where![fullName]) continue;
      // custom transform
      if (options.transform) {
        const res = options.transform(this.ctx, {
          params,
          query: value,
          options,
          originalName,
          fullName,
          key,
          value: value[key],
          schema: fieldSchema,
          openapi,
        });
        if (res === true || res === false) continue;
      }
      // default transform
      const typeName = fieldSchema._def.typeName;
      if (typeName === 'ZodString') {
        params.where![fullName] = { _includesI_: value[key] };
      } else {
        params.where![fullName] = value[key];
      }
    }
    return params;
  }
}

export const ArgQuery = createArgumentPipe('a-web:query');
