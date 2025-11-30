import type { IDecoratorPipeOptions, IDecoratorPipeOptionsArgument, IPipeTransform } from 'vona-module-a-aspect';
import type { ISchemaObjectExtensionField, RouteHandlerArgumentMeta } from 'vona-module-a-openapi';
import type { ValidatorOptions } from 'vona-module-a-validation';

import type { TypeQueryParamsPatch } from '../types/filterTransform.ts';
import { isNil } from '@cabloy/utils';
import { ZodMetadata } from '@cabloy/zod-openapi';
import { BeanBase, cast } from 'vona';
import { createArgumentPipe, Pipe } from 'vona-module-a-aspect';

export type TypePipeFilterData = unknown;

export type TypePipeFilterResult = TypePipeFilterData;

export interface IPipeOptionsFilter extends IDecoratorPipeOptions, IDecoratorPipeOptionsArgument, ValidatorOptions {}

const __FieldsSystem = ['columns', 'where', 'orders', 'pageNo', 'pageSize'];

@Pipe<IPipeOptionsFilter>({
  // ValidatorOptions
  disableErrorMessages: false,
  errorHttpStatusCode: 400,
  loose: false,
  strict: false,
})
export class PipeFilter extends BeanBase implements IPipeTransform<TypePipeFilterData, TypePipeFilterResult> {
  async transform(value: TypePipeFilterData, metadata: RouteHandlerArgumentMeta, options: IPipeOptionsFilter): Promise<TypePipeFilterResult> {
    if (!options.schema) throw new Error(`should specify the schema of pipeFilter: ${metadata.controller.name}.${metadata.method}#${metadata.index}`);
    // validateSchema
    value = await this.bean.validator.validateSchema(options.schema, value, options, metadata.field);
    // transform
    value = this._transform(value, options);
    // ok
    return value;
  }

  private _transform(value: any, options: IPipeOptionsFilter) {
    // 1. system: columns/where/orders/pageNo/pageSize
    const params = this._transformSystem(value);
    // 2. fields
    this._transformFields(params, value, options);
    // 3. system: orders
    this._transformOrders(params, options);
    // ok
    return params;
  }

  // system: columns/where/orders/pageNo/pageSize
  private _transformSystem(value: any) {
    const params = {} as TypeQueryParamsPatch;
    // columns
    if (!isNil(value.columns)) params.columns = value.columns;
    // where
    params.where = value.where ?? {};
    // orders
    if (!isNil(value.orders)) {
      if (typeof value.orders === 'string') {
        if (value.orders.startsWith('[') && value.orders.endsWith(']')) {
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

  private _transformOrders(params: TypeQueryParamsPatch, options: IPipeOptionsFilter) {
    if (!params.orders) return;
    // openapi
    const openapi: ISchemaObjectExtensionField | undefined = ZodMetadata.getOpenapiMetadata(options.schema!);
    const table = openapi?.query?.table;
    // loop
    for (const order of params.orders) {
      const field = order[0] as string;
      if (field.includes('.')) continue;
      let tableCurrent = table;
      let fieldCurrent = field;
      const fieldSchema = ZodMetadata.unwrapChained(ZodMetadata.getFieldSchema(options.schema, field));
      if (fieldSchema) {
        const openapi: ISchemaObjectExtensionField | undefined = ZodMetadata.getOpenapiMetadata(fieldSchema);
        if (openapi?.query?.table) {
          tableCurrent = openapi?.query?.table;
        }
        if (openapi?.query?.originalName) {
          fieldCurrent = openapi?.query?.originalName;
        }
      }
      cast(order)[0] = tableCurrent ? `${tableCurrent}.${fieldCurrent}` : fieldCurrent;
    }
  }

  private _transformField(key: string, fieldValue: any, params: TypeQueryParamsPatch, value: any, options: IPipeOptionsFilter) {
    if (__FieldsSystem.includes(key)) return;
    const fieldSchema = ZodMetadata.unwrapChained(ZodMetadata.getFieldSchema(options.schema, key));
    if (!fieldSchema) return;
    // openapi
    const openapi: ISchemaObjectExtensionField | undefined = ZodMetadata.getOpenapiMetadata(fieldSchema);
    if (!openapi?.filter?.capabilities?.where) return;
    // name
    const originalName = openapi?.filter?.originalName ?? key;
    let fullName: string;
    // joins
    let joinInfo;
    if (openapi?.filter?.joinOn) {
      const joinType = openapi.filter.joinType ?? 'innerJoin';
      const joinTable = openapi.filter.table;
      const joinOn = openapi.filter.joinOn;
      joinInfo = [joinType, joinTable, joinOn];
      fullName = `${joinTable}.${originalName}`;
    } else {
      fullName = originalName;
    }
    // check where
    if (Object.prototype.hasOwnProperty.call(params.where, fullName)) return;
    // custom transform
    const resTransform = this._performTransformFn(options, {
      params,
      query: value,
      options,
      originalName,
      fullName,
      key,
      value: fieldValue,
      schema: fieldSchema,
      openapi,
    });
    // res: ignore
    if (resTransform === false) return;
    // join
    if (joinInfo) {
      if (!params.joins) params.joins = [];
      if (params.joins.findIndex(item => item[1] === joinInfo.joinTable) === -1) {
        params.joins.push(joinInfo);
      }
    }
    // res: done
    if (resTransform === true) return;
    // default transform
    let op = openapi?.query?.op;
    if (!op) {
      const typeName = fieldSchema.type;
      if (typeName === 'string') {
        op = '_includesI_';
      } else {
        op = '_eq_';
      }
    }
    if (op === '_eq_') {
      params.where![fullName] = fieldValue;
    } else {
      params.where![fullName] = { [op]: fieldValue };
    }
  }

  private _transformFields(params: TypeQueryParamsPatch, value: any, options: IPipeOptionsFilter) {
    // loop
    for (const key in value) {
      this._transformField(key, value[key], params, value, options);
    }
  }
}

export const ArgFilterPro = createArgumentPipe('a-web:filter');
